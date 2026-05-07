import { Component, DestroyRef, inject, Injectable, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormsModule, NgForm, NgModel } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FileDropUploadComponent } from '../../components/file-drop-upload/file-drop-upload.component';
import {
  OperatorProfileDemo,
  OperatorProfileStore
} from '../../services/operator-profile-store.service';
import { isImageFile } from '../../utils/file-helpers';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ReusableModalComponent, ModalData } from '../../components/reusable-modal/reusable-modal.component';

export type ProfileViewMode = 'edit' | 'profiles' | 'verify';

/** Red outline + error helpers while typing (`dirty`), after blur (`touched`), or after failed submit (`form.submitted`). */
@Injectable()
class ProfileFormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: AbstractControl | null, form: { submitted?: boolean } | null = null): boolean {
    if (!control) {
      return false;
    }
    return !!(control.invalid && (control.dirty || control.touched || !!form?.submitted));
  }
}

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  providers: [{ provide: ErrorStateMatcher, useClass: ProfileFormErrorStateMatcher }],
  imports: [
    FormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    FileDropUploadComponent
  ],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.scss'
})
export class ProfileEditComponent {
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  readonly store = inject(OperatorProfileStore);
  private readonly dialog = inject(MatDialog);

  /**
   * Person names: letter + letters/spaces/punctuation (Unicode letters). Optional fields use string `^$|…` below.
   */
  readonly personNamePattern = /^[\p{L}][\p{L}\s.'\u2019-]{0,79}$/u;
  /** Optional cell / SMS — digits with common separators or leading +. */
  readonly phoneFlexiblePattern = '^$|^\\+?[0-9 \\-().\\/]{10,}\\d$';

  readonly linkedInOptionalPattern =
    '^$|^https?:\\/\\/([\\w-]+\\.)?linkedin\\.com\\/[-\\w#%?=.&+\\/]+$|^linkedin\\.com\\/[-\\w#%?=.&+\\/]+$';
  /** Links or domain-style paths (portfolio, social URLs). Empty allowed. */
  readonly optionalPresenceUrlPattern =
    '^$|^(?:https?:\\/\\/)?(?:www\\.)?[\\w-]+(?:\\.[\\w-]{2,})+(?:\\/[^\\s]*)?$';
  readonly teamsHandlePattern = '^$|^[-_A-Za-z0-9@.]{1,128}$';
  readonly registrationOptionalPattern = '^$|^[-A-Za-z0-9#\\/\\s.]{2,80}$';

  readonly preferredMaxLen = 60;
  readonly aboutMaxLen = 800;
  readonly tradingMaxLen = 120;

  readonly photoUpload = viewChild<FileDropUploadComponent>('photoUpload');
  readonly cvUpload = viewChild<FileDropUploadComponent>('cvUpload');
  readonly profileNgForm = viewChild<NgForm>('profileEditForm');

  /** Same object as `store.draft` — form edits persist when switching profile URLs. */
  readonly profile: OperatorProfileDemo = this.store.draft;

  readonly viewMode = signal<ProfileViewMode>('edit');

  profilePhoto: File | null = null;
  cvFile: File | null = null;

  /** Verify screen: single demo operator in the picker (submitted profile). */
  verifySelectedOperatorId = 'current';

  constructor() {
    this.refreshViewMode();
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.refreshViewMode());
  }

  /** Show validation under the field while typing (`dirty`) or after blur / submit (`touched`). */
  showFieldError(m: NgModel): boolean {
    return !!(m.invalid && (m.dirty || m.touched));
  }

  get operatorSelectLabel(): string {
    const s = this.store.submitted;
    const last = (s.lastName || '').trim().toUpperCase();
    const first = (s.givenName || '').trim();
    const label = `${last} ${first}`.trim();
    return label || '—';
  }

  private refreshViewMode(): void {
    const path = this.router.url.split('?')[0];
    if (path.includes('/profile/profiles')) {
      this.viewMode.set('profiles');
    } else if (path.includes('/profile/verify')) {
      this.viewMode.set('verify');
    } else {
      this.viewMode.set('edit');
    }
  }

  private readPhotoAsDataUrl(file: File | null): Promise<string | null> {
    if (!file || !isImageFile(file)) {
      return Promise.resolve(null);
    }
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : null);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  }

  async onProfilePhotoChanged(file: File | null): Promise<void> {
    this.profilePhoto = file;
    if (!file || !isImageFile(file)) {
      this.store.draftPhotoDataUrl = null;
      this.store.draftPhotoName = null;
      return;
    }
    this.store.draftPhotoName = file.name;
    const dataUrl = await this.readPhotoAsDataUrl(file);
    this.store.draftPhotoDataUrl = dataUrl;
  }

  onCvFileChanged(file: File | null): void {
    this.cvFile = file;
    this.store.syncDraftCvFromFile(file);
  }

  onCancel(): void {
    this.store.resetDraftToInitial();
    this.profilePhoto = null;
    this.cvFile = null;
    this.photoUpload()?.reset();
    this.cvUpload()?.reset();
    queueMicrotask(() => {
      const ng = this.profileNgForm();
      if (ng) {
        ng.form.markAsUntouched();
        ng.form.markAsPristine();
      }
    });
    this.snackBar.open('Form reset to demo defaults.', 'OK', { duration: 4000 });
  }

  async onSubmit(profileForm: NgForm): Promise<void> {
    this.trimProfileWhitespace();
    profileForm.form.updateValueAndValidity({ emitEvent: false });
    if (profileForm.invalid) {
      profileForm.form.markAllAsTouched();
      this.snackBar.open('Please fix the highlighted fields.', 'OK', { duration: 5200 });
      return;
    }

    const photoDataUrl = await this.readPhotoAsDataUrl(this.profilePhoto);
    this.store.commitSubmit(this.profilePhoto, this.cvFile, photoDataUrl);
    const extras: string[] = [];
    if (this.profilePhoto) {
      extras.push(`Photo: ${this.profilePhoto.name}`);
    }
    if (this.cvFile) {
      extras.push(`CV: ${this.cvFile.name}`);
    }
    const suffix = extras.length ? ` ${extras.join(' · ')}` : '';
    this.snackBar.open(`Profile saved (demo). Showing your profile below.${suffix}`, 'OK', {
      duration: 6500
    });
    void this.router.navigate(['/profile/profiles']);
  }

  onVerifySave(): void {
    this.snackBar.open('Verification progress saved locally (demo).', 'OK', { duration: 4500 });
  }

  onVerifySubmit(): void {
    this.snackBar.open('Verification submitted for review (demo).', 'OK', { duration: 5000 });
  }

  onVerifyApprove(): void {
    this.snackBar.open('Operator marked verified (demo — no backend).', 'OK', { duration: 5500 });
  }

  /** Trim editable text fields before submit so validators and stored data align. */
  private trimProfileWhitespace(): void {
    const p = this.profile;
    const keys: (keyof OperatorProfileDemo)[] = [
      'givenName',
      'lastName',
      'preferred',
      'personalEmail',
      'cell',
      'contactEmail',
      'companyEmail',
      'linkedin',
      'teamsId',
      'about',
      'tradingEntity',
      'registration',
      'digitalPresence1',
      'digitalPresence2',
      'digitalPresence3',
      'digitalPresence4'
    ];
    for (const k of keys) {
      const v = p[k];
      if (typeof v === 'string') {
        (p[k] as string) = v.trim();
      }
    }
  }

  openAboutMeModal(): void {
    const dialogRef = this.dialog.open(ReusableModalComponent, {
      width: '600px',
      data: {
        title: 'A Little About Me ..',
        description: 'Add a short bio or notes (optional).',
        fields: [
          { name: 'about', label: 'A Little About Me ..', type: 'textarea', required: false, value: this.profile.about }
        ]
      } as ModalData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.about !== undefined) {
        this.profile.about = result.about;
        
        // Mark the form as dirty so validation triggers correctly
        const ng = this.profileNgForm();
        if (ng && ng.form.controls['about']) {
          ng.form.controls['about'].markAsDirty();
          ng.form.controls['about'].updateValueAndValidity();
        }
      }
    });
  }
}

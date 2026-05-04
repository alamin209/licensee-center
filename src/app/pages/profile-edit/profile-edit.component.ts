import { Component, DestroyRef, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
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

export type ProfileViewMode = 'edit' | 'profiles' | 'verify';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
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

  readonly photoUpload = viewChild<FileDropUploadComponent>('photoUpload');
  readonly cvUpload = viewChild<FileDropUploadComponent>('cvUpload');

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

  onCancel(): void {
    this.store.resetDraftToInitial();
    this.profilePhoto = null;
    this.cvFile = null;
    this.photoUpload()?.reset();
    this.cvUpload()?.reset();
    this.snackBar.open('Form reset to demo defaults.', 'OK', { duration: 4000 });
  }

  async onSubmit(): Promise<void> {
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
}

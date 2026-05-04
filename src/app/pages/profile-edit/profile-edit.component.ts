import { Component, DestroyRef, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FileDropUploadComponent } from '../../components/file-drop-upload/file-drop-upload.component';
import {
  OperatorProfileDemo,
  OperatorProfileStore
} from '../../services/operator-profile-store.service';

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

  constructor() {
    this.refreshViewMode();
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.refreshViewMode());
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

  onCancel(): void {
    this.store.resetDraftToInitial();
    this.profilePhoto = null;
    this.cvFile = null;
    this.photoUpload()?.reset();
    this.cvUpload()?.reset();
    this.snackBar.open('Form reset to demo defaults.', 'OK', { duration: 4000 });
  }

  onSubmit(): void {
    this.store.commitSubmit(this.profilePhoto, this.cvFile);
    const extras: string[] = [];
    if (this.profilePhoto) {
      extras.push(`Photo: ${this.profilePhoto.name}`);
    }
    if (this.cvFile) {
      extras.push(`CV: ${this.cvFile.name}`);
    }
    const suffix = extras.length ? ` ${extras.join(' · ')}` : '';
    this.snackBar.open(`Profile saved (demo). View all Profiles shows this data until reload.${suffix}`, 'OK', {
      duration: 6000
    });
  }
}

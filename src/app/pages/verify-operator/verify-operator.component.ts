import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { SafeResourceUrlPipe } from '../../pipes/safe-resource-url.pipe';
import {
  OperatorProfileDemo,
  OperatorProfileStore
} from '../../services/operator-profile-store.service';

@Component({
  selector: 'app-verify-operator',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    SafeResourceUrlPipe
  ],
  templateUrl: './verify-operator.component.html',
  styleUrl: './verify-operator.component.scss'
})
export class VerifyOperatorComponent {
  private readonly snackBar = inject(MatSnackBar);
  readonly store = inject(OperatorProfileStore);

  /** Same object as Edit My Profile — fields and uploads stay in sync in-session. */
  readonly profile: OperatorProfileDemo = this.store.draft;

  verifyOperatorPick = 'current';

  get operatorMenuLabel(): string {
    const last = (this.store.draft.lastName || '').trim().toUpperCase();
    const first = (this.store.draft.givenName || '').trim();
    const label = `${last} ${first}`.trim();
    return label || '—';
  }

  get hasProfilePhoto(): boolean {
    return !!this.store.previewPhotoDataUrl;
  }

  get cvDisplayName(): string {
    return this.store.previewCvName || 'No file uploaded';
  }

  get showPdfPreview(): boolean {
    return !!this.store.previewCvPdfBlobUrl;
  }

  get cvIsWordWithoutPreview(): boolean {
    const n = this.store.previewCvName ?? '';
    if (!n || this.showPdfPreview) {
      return false;
    }
    return /\.(docx?)$/i.test(n);
  }

  onSave(): void {
    this.snackBar.open('Verification progress saved locally (demo).', 'OK', { duration: 4500 });
  }

  onSubmit(): void {
    this.snackBar.open('Verification submitted for review (demo).', 'OK', { duration: 5000 });
  }

  onVerifyApprove(): void {
    this.snackBar.open('Operator marked verified (demo — no backend).', 'OK', { duration: 5500 });
  }
}

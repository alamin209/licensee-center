import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface BrowsePickListsModalData {
  locationLabel: string;
  initialCode: string;
}

export type BrowsePickListsModalResult = { action: 'save' | 'run' | 'upload'; code: string };

@Component({
  selector: 'app-browse-pick-lists-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './browse-pick-lists-modal.component.html',
  styleUrl: './browse-pick-lists-modal.component.scss'
})
export class BrowsePickListsModalComponent {
  readonly dialogRef = inject(
    MatDialogRef<BrowsePickListsModalComponent, BrowsePickListsModalResult | undefined>
  );
  readonly data = inject(MAT_DIALOG_DATA) as BrowsePickListsModalData;

  code = '';

  constructor() {
    this.code = this.data.initialCode;
  }

  save(): void {
    this.dialogRef.close({ action: 'save', code: this.code });
  }

  run(): void {
    this.dialogRef.close({ action: 'run', code: this.code });
  }

  upload(): void {
    this.dialogRef.close({ action: 'upload', code: this.code });
  }
}

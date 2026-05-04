import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

export interface AddPropertyDialogData {
  /** Full title line, e.g. "ADD PROPERTY to CHICAGO, ILLINOIS" */
  title: string;
}

export interface AddPropertyDialogResult {
  countryKey: string;
  selfLicensing: 'yes' | 'no';
  licenseKey: string;
}

@Component({
  selector: 'app-add-property-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    FormsModule
  ],
  templateUrl: './add-property-dialog.component.html',
  styleUrl: './add-property-dialog.component.scss'
})
export class AddPropertyDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddPropertyDialogComponent, AddPropertyDialogResult | undefined>);
  readonly data = inject(MAT_DIALOG_DATA) as AddPropertyDialogData;

  work = {
    countryKey: 'allerton',
    selfLicensing: 'no' as 'yes' | 'no',
    licenseKey: 'northwest'
  };

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close({
      countryKey: this.work.countryKey,
      selfLicensing: this.work.selfLicensing,
      licenseKey: this.work.licenseKey
    });
  }
}

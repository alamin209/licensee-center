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

export interface CountryLocaleDialogData {
  country: string;
  state: string;
  locale: string;
}

const defaultLocaleData: CountryLocaleDialogData = {
  country: 'usa',
  state: 'illinois',
  locale: 'chicago'
};

@Component({
  selector: 'app-country-locale-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './country-locale-dialog.component.html',
  styleUrl: './country-locale-dialog.component.scss'
})
export class CountryLocaleDialogComponent {
  readonly dialogRef = inject(MatDialogRef<CountryLocaleDialogComponent, CountryLocaleDialogData | undefined>);
  readonly data = inject(MAT_DIALOG_DATA, { optional: true }) as CountryLocaleDialogData | null;

  work: CountryLocaleDialogData = { ...defaultLocaleData, ...(this.data ?? {}) };

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close({ ...this.work });
  }
}

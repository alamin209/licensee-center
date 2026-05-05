import { Component, inject, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import {
  CountryLocaleDialogComponent,
  CountryLocaleDialogData,
  LOCATION_DATA
} from './country-locale-dialog.component';
import { FileDropUploadComponent } from '../../components/file-drop-upload/file-drop-upload.component';

@Component({
  selector: 'app-define-campaigns',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    FormsModule,
    FileDropUploadComponent
  ],
  templateUrl: './define-campaigns.component.html',
  styleUrl: './define-campaigns.component.scss'
})
export class DefineCampaignsComponent {
  private readonly dialog = inject(MatDialog);

  selfLicensing = '';
  campaignType = '';
  director = '';
  dataCollator = '';
  licenseManager = '';
  campaignLead = '';
  associateRep = '';
  selectLicense = '';
  agentSuccessFee = '';
  productPriceVary = '';
  descriptor = '';
  campaignId = '';
  tagline = '';
  numProperties: number | null = null;
  notesInternal = '';
  notesExternal = '';
  dateInitiated: Date | null = null;

  localeCountry = '';
  localeState = '';
  localeLocale = '';

  campaignName = '';

  uploadUrl = '';

  imageFile: File | null = null;
  pdfFile: File | null = null;
  videoFile: File | null = null;

  @ViewChild('imageUpload') imageUpload?: FileDropUploadComponent;
  @ViewChild('pdfUpload') pdfUpload?: FileDropUploadComponent;
  @ViewChild('videoUpload') videoUpload?: FileDropUploadComponent;

  onReset(): void {
    this.imageFile = null;
    this.pdfFile = null;
    this.videoFile = null;
    this.imageUpload?.reset();
    this.pdfUpload?.reset();
    this.videoUpload?.reset();
    this.localeCountry = '';
    this.localeState = '';
    this.localeLocale = '';
    this.campaignName = '';
  }

  get localeSummary(): string {
    const cData = LOCATION_DATA[this.localeCountry];
    const countryName = cData ? cData.name : this.localeCountry;
    
    const sData = cData?.states?.[this.localeState];
    const stateName = sData ? sData.name : this.localeState;
    
    const localeName = sData?.locales?.[this.localeLocale] ?? this.localeLocale;

    return `${countryName}, ${stateName}, ${localeName}`;
  }

  openCountryLocaleDialog(): void {
    const data: CountryLocaleDialogData = {
      country: this.localeCountry,
      state: this.localeState,
      locale: this.localeLocale
    };
    this.dialog
      .open(CountryLocaleDialogComponent, {
        width: 'min(480px, 96vw)',
        panelClass: 'country-locale-dialog-shell',
        data
      })
      .afterClosed()
      .subscribe((result: CountryLocaleDialogData | undefined) => {
        if (result) {
          this.localeCountry = result.country;
          this.localeState = result.state;
          this.localeLocale = result.locale;
          this.campaignName = this.localeSummary;
        }
      });
  }

  onImageChange(file: File | null): void {
    this.imageFile = file;
  }

  onPdfChange(file: File | null): void {
    this.pdfFile = file;
  }

  onVideoChange(file: File | null): void {
    this.videoFile = file;
  }
}

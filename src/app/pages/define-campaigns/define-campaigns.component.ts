import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import {
  CountryLocaleDialogComponent,
  CountryLocaleDialogData,
  LOCATION_DATA
} from './country-locale-dialog.component';
import { FileDropUploadComponent } from '../../components/file-drop-upload/file-drop-upload.component';
import { CampaignService, Campaign } from '../../services/campaign.service';
import Swal from 'sweetalert2';

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
    FileDropUploadComponent,
    MatSnackBarModule,
    CommonModule
  ],
  templateUrl: './define-campaigns.component.html',
  styleUrl: './define-campaigns.component.scss'
})
export class DefineCampaignsComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  private readonly campaignService = inject(CampaignService);
  private readonly router = inject(Router);

  campaigns$ = this.campaignService.campaigns$;

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
  campaignLocation = '';

  uploadUrl = '';
  readonly campaignNamePattern = "^[A-Za-z0-9][A-Za-z0-9 &'().,\\-/]{2,119}$";
  readonly campaignIdPattern = '^[A-Za-z0-9][A-Za-z0-9_-]{2,49}$';
  readonly optionalHttpsUrlPattern = '^$|^https?:\\/\\/[^\\s/$.?#].[^\\s]*$';

  imageFile: File | null = null;
  imageFileName = '';
  imageFileUrl: string | null = null;
  pdfFile: File | null = null;
  pdfFileName = '';
  pdfFileUrl: string | null = null;
  videoFile: File | null = null;
  videoFileName = '';
  videoFileUrl: string | null = null;

  @ViewChild('imageUpload') imageUpload?: FileDropUploadComponent;
  @ViewChild('pdfUpload') pdfUpload?: FileDropUploadComponent;
  @ViewChild('videoUpload') videoUpload?: FileDropUploadComponent;

  ngOnInit(): void {
    const last = this.campaignService.getLastCreatedCampaign();
    if (last) {
      this.campaignType = last.campaignType;
      this.campaignName = last.campaignName;
      this.campaignLocation = last.location ?? '';
      this.campaignId = last.campaignId;
      this.descriptor = last.descriptor ?? '';
      this.tagline = last.tagline ?? '';
      this.licenseManager = last.licenseManager;
      this.director = last.director;
      this.campaignLead = last.campaignLead;
      this.dataCollator = last.dataCollator;
      this.associateRep = last.associateRep;
      this.selfLicensing = last.selfLicensing;
      this.selectLicense = last.selectLicense;
      this.agentSuccessFee = last.agentSuccessFee;
      this.productPriceVary = last.productPriceVary;
      this.numProperties = last.numProperties;
      this.notesInternal = last.notesInternal ?? '';
      this.notesExternal = last.notesExternal ?? '';
      this.dateInitiated = last.dateInitiated;
      this.uploadUrl = last.uploadUrl ?? '';
      this.imageFileName = last.imageFile ?? '';
      this.imageFileUrl = last.imageFileUrl ?? null;
      this.pdfFileName = last.pdfFile ?? '';
      this.pdfFileUrl = last.pdfFileUrl ?? null;
      this.videoFileName = last.videoFile ?? '';
      this.videoFileUrl = last.videoFileUrl ?? null;
    }
  }

  showFieldError(model: NgModel): boolean {
    return !!(model.invalid && (model.dirty || model.touched));
  }

  onSubmit(form: NgForm): void {
    form.form.updateValueAndValidity({ emitEvent: false });
    if (form.invalid) {
      form.form.markAllAsTouched();
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Please fix the errors in the form.',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }

    const campaignData = {
      ...form.value,
      campaignName: this.campaignName,
      location: this.campaignLocation,
      imageFile: this.imageFileName || null,
      imageFileUrl: this.imageFileUrl,
      pdfFile: this.pdfFileName || null,
      pdfFileUrl: this.pdfFileUrl,
      videoFile: this.videoFileName || null,
      videoFileUrl: this.videoFileUrl
    };

    console.log('Campaign Submitted:', campaignData);
    this.campaignService.addCampaign(campaignData);
    
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Campaign defined! Moving to preview...',
      showConfirmButton: false,
      timer: 10000
    });

    this.router.navigate(['/campaigns/preview']);
  }

  onReset(): void {
    this.imageFile = null;
    this.imageFileName = '';
    this.imageFileUrl = null;
    this.pdfFile = null;
    this.pdfFileName = '';
    this.pdfFileUrl = null;
    this.videoFile = null;
    this.videoFileName = '';
    this.videoFileUrl = null;
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
          this.campaignLocation = this.localeSummary;
        }
      });
  }

  private fileToDataUrl(file: File | null, callback: (url: string | null) => void): void {
    if (!file) {
      callback(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => callback(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  onImageChange(file: File | null): void {
    this.imageFile = file;
    this.imageFileName = file?.name ?? '';
    this.fileToDataUrl(file, (url) => (this.imageFileUrl = url));
  }

  onPdfChange(file: File | null): void {
    this.pdfFile = file;
    this.pdfFileName = file?.name ?? '';
    this.fileToDataUrl(file, (url) => (this.pdfFileUrl = url));
  }

  onVideoChange(file: File | null): void {
    this.videoFile = file;
    this.videoFileName = file?.name ?? '';
    this.fileToDataUrl(file, (url) => (this.videoFileUrl = url));
  }
}

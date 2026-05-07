import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CampaignService, Campaign } from '../../services/campaign.service';
import { CountryLocaleDialogComponent, CountryLocaleDialogData } from '../define-campaigns/country-locale-dialog.component';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';
import { FileDropUploadComponent } from '../../components/file-drop-upload/file-drop-upload.component';

const localeLabels: Record<string, string> = {
  usa: 'USA',
  ca: 'Canada',
  illinois: 'Illinois',
  california: 'California',
  ny: 'New York',
  chicago: 'Chicago',
  la: 'Los Angeles',
  nyc: 'New York City'
};

@Component({
  selector: 'app-define-campaign-geographic',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatIconModule,
    SafeUrlPipe,
    FileDropUploadComponent
  ],
  templateUrl: './define-campaign-geographic.component.html',
  styleUrl: './define-campaign-geographic.component.scss'
})
export class DefineCampaignGeographicComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  private readonly campaignService = inject(CampaignService);
  private readonly router = inject(Router);

  campaignType = 'geographic';
  
  localeCountry = 'usa';
  localeState = 'illinois';
  localeLocale = 'chicago';

  campaignName = '';
  campaignLocation = '';

  imageFileName = '';
  imageFileUrl: string | null = null;
  pdfFileName = '';
  pdfFileUrl: string | null = null;
  videoFileName = '';
  videoFileUrl: string | null = null;
  selfLicensing = 'yes';
  licenseManager = 'director';
  director = 'kim-powley';
  campaignLead = 'paolo-randone';
  dataCollator = 'frank-brown';
  associateRep = '';
  selectLicense = 'self-licensed';
  productPriceVary: string | number = '100-plus';
  agentSuccessFee: string | number = '25';
  descriptor = '';
  campaignId = '';
  tagline = '';
  uploadUrl = '';
  notesInternal = '';
  notesExternal = '';
  numProperties: number | null = null;
  dateInitiated: Date | null = null;

  lastCreatedCampaign: Campaign | null = null;

  ngOnInit(): void {
    const last = this.campaignService.getLastCreatedCampaign();
    this.lastCreatedCampaign = last;
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
      this.imageFileName = last.imageFile ?? '';
      this.imageFileUrl = last.imageFileUrl ?? null;
      this.pdfFileName = last.pdfFile ?? '';
      this.pdfFileUrl = last.pdfFileUrl ?? null;
      this.videoFileName = last.videoFile ?? '';
      this.videoFileUrl = last.videoFileUrl ?? null;
      this.uploadUrl = last.uploadUrl ?? '';
      this.notesInternal = last.notesInternal ?? '';
      this.notesExternal = last.notesExternal ?? '';
      this.numProperties = last.numProperties;
      this.productPriceVary = last.productPriceVary;
      this.agentSuccessFee = last.agentSuccessFee;
      this.dateInitiated = last.dateInitiated;
    }
  }

  onImageChange(file: File | null): void {
    this.imageFileName = file?.name ?? '';
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => (this.imageFileUrl = e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      this.imageFileUrl = null;
    }
  }

  onPdfChange(file: File | null): void {
    this.pdfFileName = file?.name ?? '';
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => (this.pdfFileUrl = e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      this.pdfFileUrl = null;
    }
  }

  onVideoChange(file: File | null): void {
    this.videoFileName = file?.name ?? '';
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => (this.videoFileUrl = e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      this.videoFileUrl = null;
    }
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
          this.campaignLocation = this.getLocaleSummary(result);
        }
      });
  }

  private getLocaleSummary(data: CountryLocaleDialogData): string {
    // Basic summary for now, could be improved to use LOCATION_DATA labels
    return `${data.country}, ${data.state}, ${data.locale}`;
  }

  onBack(): void {
    this.router.navigate(['/campaigns/define']);
  }

  onSave(): void {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Campaign finalized successfully!',
      showConfirmButton: false,
      timer: 10000
    });
    this.router.navigate(['/campaigns/picklists']);
  }
}

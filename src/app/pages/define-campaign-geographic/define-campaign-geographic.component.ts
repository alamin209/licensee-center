import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { CountryLocaleDialogComponent, CountryLocaleDialogData } from '../define-campaigns/country-locale-dialog.component';

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
    MatIconModule
  ],
  templateUrl: './define-campaign-geographic.component.html',
  styleUrl: './define-campaign-geographic.component.scss'
})
export class DefineCampaignGeographicComponent implements OnInit {
  private readonly dialog = inject(MatDialog);

  campaignType = 'geographic';
  
  localeCountry = 'usa';
  localeState = 'illinois';
  localeLocale = 'chicago';

  get campaignName(): string {
    const country = localeLabels[this.localeCountry] ?? this.localeCountry;
    const locale = localeLabels[this.localeLocale] ?? this.localeLocale;
    const state = localeLabels[this.localeState] ?? this.localeState;
    return `${country}, ${locale}, ${state}`;
  }

  imageFileName = '';
  pdfFileName = '';
  videoFileName = '';
  selfLicensing = 'yes';
  licenseManager = 'director';
  director = 'kim-powley';
  campaignLead = 'paolo-randone';
  dataCollator = 'frank-brown';
  associateRep = '';
  selectLicense = 'self-licensed';
  productPriceVary = '100-plus';
  agentSuccessFee = '25';

  ngOnInit(): void {}

  onFileSelected(event: Event, type: 'image' | 'pdf' | 'video'): void {
    const input = event.target as HTMLInputElement;
    const name = input.files?.[0]?.name ?? '';
    if (name) {
      if (type === 'image') this.imageFileName = name;
      if (type === 'pdf') this.pdfFileName = name;
      if (type === 'video') this.videoFileName = name;
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
        }
      });
  }
}

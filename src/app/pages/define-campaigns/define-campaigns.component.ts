import { Component, inject } from '@angular/core';
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
  CountryLocaleDialogData
} from './country-locale-dialog.component';

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
    FormsModule
  ],
  templateUrl: './define-campaigns.component.html',
  styleUrl: './define-campaigns.component.scss'
})
export class DefineCampaignsComponent {
  private readonly dialog = inject(MatDialog);

  selfLicensing = 'yes';
  campaignType = 'agent-specific';
  director = 'kim-powley';
  dataCollator = 'frank-brown';
  licenseManager = 'director';
  campaignLead = 'paolo-randone';
  associateRep = 'frank-brown';
  selectLicense = 'self-licensed';
  agentSuccessFee = '15';
  productPriceVary = '100-plus';

  localeCountry = 'usa';
  localeState = 'illinois';
  localeLocale = 'chicago';

  /** Shown in Name of Campaign; refreshed when country/locale dialog saves. */
  campaignName = 'Selected Southeast Asian resorts';

  uploadUrl = '';

  imageFileName = '';
  pdfFileName = '';
  videoFileName = '';

  get localeSummary(): string {
    const country = localeLabels[this.localeCountry] ?? this.localeCountry;
    const locale = localeLabels[this.localeLocale] ?? this.localeLocale;
    const state = localeLabels[this.localeState] ?? this.localeState;
    return `${country}, ${locale}, ${state}`;
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

  onFileSelected(event: Event, target: 'image' | 'pdf' | 'video'): void {
    const input = event.target as HTMLInputElement;
    const name = input.files?.[0]?.name ?? '';
    switch (target) {
      case 'image':
        this.imageFileName = name;
        break;
      case 'pdf':
        this.pdfFileName = name;
        break;
      case 'video':
        this.videoFileName = name;
        break;
    }
  }
}

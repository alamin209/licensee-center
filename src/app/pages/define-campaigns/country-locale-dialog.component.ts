import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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

export const LOCATION_DATA: Record<string, { name: string, states: Record<string, { name: string, locales: Record<string, string> }> }> = {
  usa: {
    name: 'United States',
    states: {
      california: { name: 'California', locales: { la: 'Los Angeles', sf: 'San Francisco', sd: 'San Diego' } },
      illinois: { name: 'Illinois', locales: { chicago: 'Chicago', springfield: 'Springfield' } },
      ny: { name: 'New York', locales: { nyc: 'New York City', buffalo: 'Buffalo', albany: 'Albany' } },
      texas: { name: 'Texas', locales: { houston: 'Houston', austin: 'Austin', dallas: 'Dallas' } }
    }
  },
  ca: {
    name: 'Canada',
    states: {
      ontario: { name: 'Ontario', locales: { toronto: 'Toronto', ottawa: 'Ottawa' } },
      bc: { name: 'British Columbia', locales: { vancouver: 'Vancouver', victoria: 'Victoria' } },
      quebec: { name: 'Quebec', locales: { montreal: 'Montreal', quebec_city: 'Quebec City' } }
    }
  },
  uk: {
    name: 'United Kingdom',
    states: {
      england: { name: 'England', locales: { london: 'London', manchester: 'Manchester', birmingham: 'Birmingham' } },
      scotland: { name: 'Scotland', locales: { edinburgh: 'Edinburgh', glasgow: 'Glasgow' } }
    }
  },
  au: {
    name: 'Australia',
    states: {
      nsw: { name: 'New South Wales', locales: { sydney: 'Sydney', newcastle: 'Newcastle' } },
      vic: { name: 'Victoria', locales: { melbourne: 'Melbourne', geelong: 'Geelong' } },
      qld: { name: 'Queensland', locales: { brisbane: 'Brisbane', gold_coast: 'Gold Coast' } }
    }
  }
};

const defaultLocaleData: CountryLocaleDialogData = {
  country: 'usa',
  state: 'california',
  locale: 'la'
};

@Component({
  selector: 'app-country-locale-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './country-locale-dialog.component.html',
  styleUrl: './country-locale-dialog.component.scss'
})
export class CountryLocaleDialogComponent {
  readonly dialogRef = inject(MatDialogRef<CountryLocaleDialogComponent, CountryLocaleDialogData | undefined>);
  readonly data = inject(MAT_DIALOG_DATA, { optional: true }) as CountryLocaleDialogData | null;

  work: CountryLocaleDialogData = { ...defaultLocaleData, ...(this.data ?? {}) };

  get countries() {
    return Object.keys(LOCATION_DATA).map(k => ({ id: k, name: LOCATION_DATA[k].name }));
  }

  get states() {
    const cData = LOCATION_DATA[this.work.country];
    if (!cData) return [];
    return Object.keys(cData.states).map(k => ({ id: k, name: cData.states[k].name }));
  }

  get locales() {
    const cData = LOCATION_DATA[this.work.country];
    if (!cData) return [];
    const sData = cData.states[this.work.state];
    if (!sData) return [];
    return Object.keys(sData.locales).map(k => ({ id: k, name: sData.locales[k] }));
  }

  onCountryChange() {
    this.work.state = '';
    this.work.locale = '';
  }

  onStateChange() {
    this.work.locale = '';
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close({ ...this.work });
  }
}

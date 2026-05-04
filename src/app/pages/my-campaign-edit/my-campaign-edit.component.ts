import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

export interface MyCampaignEditVm {
  propertyTitle: string;
  nameOfCampaign: string;
  campaignId: string;
  fullName: string;
  shortName: string;
  streetAddress: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  region: string;
  website: string;
  phone: string;
  brand: string;
  chainGroup: string;
  syndicate: string;
  stars: string;
  room: string;
  suites: string;
  total: string;
  productPriceVary: string;
  tripAdvisorRanking: string;
  dateField: string;
  excellent: string;
  veryGood: string;
  average: string;
  poor: string;
  terrible: string;
  jobRole: string;
  gmSurname: string;
  gmFirst: string;
  gmPhone: string;
  gmEmail: string;
  gmLinkedin: string;
  fcSurname: string;
  fcFirst: string;
  fcPhone: string;
  fcEmail: string;
  fcLinkedin: string;
  l1Image: string;
  r1Image: string;
  l2Image: string;
  r2Image: string;
}

const IMAGE_SLOT_FIELDS = {
  l1: 'l1Image',
  r1: 'r1Image',
  l2: 'l2Image',
  r2: 'r2Image'
} as const satisfies Record<'l1' | 'r1' | 'l2' | 'r2', keyof MyCampaignEditVm>;

const ALLERTON_MOCK: MyCampaignEditVm = {
  propertyTitle: 'Allerton Chicago Wiltshire Hotels',
  nameOfCampaign: 'Bali',
  campaignId: '00001',
  fullName: 'Allerton Chicago Wiltshire Hotels',
  shortName: 'Allerton Chicago',
  streetAddress: '385 Detroit Avenue',
  address2: 'Chicago',
  city: 'Chicago',
  state: 'Illinois',
  zip: '22433',
  country: 'UNITED STATES',
  region: 'North America',
  website: 'www.allerton.com/Chicago',
  phone: '+145639887615',
  brand: 'Allerton Grand',
  chainGroup: 'Wiltshire Hotels & Resorts',
  syndicate: 'Leading Hotels of the World',
  stars: 'Five',
  room: '130',
  suites: '30',
  total: '160',
  productPriceVary: '3',
  tripAdvisorRanking: '26 of 168 hotels in Chicago',
  dateField: '07:04:26',
  excellent: '548',
  veryGood: '546',
  average: '275',
  poor: '156',
  terrible: '119',
  jobRole: 'general-manager',
  gmSurname: 'Eisner',
  gmFirst: 'Daniel',
  gmPhone: '+145639887615',
  gmEmail: 'Daniel.Eisner@allerton.com',
  gmLinkedin: 'linkedin.com/in/danieleisner',
  fcSurname: '',
  fcFirst: '',
  fcPhone: '',
  fcEmail: '',
  fcLinkedin: 'linkedin',
  l1Image: '',
  r1Image: '',
  l2Image: '',
  r2Image: ''
};

const SAN_DIEGO_MOCK: MyCampaignEditVm = {
  ...ALLERTON_MOCK,
  propertyTitle: 'San Diego, CA',
  nameOfCampaign: 'San Diego, CA',
  campaignId: '00002',
  fullName: 'San Diego Coastal Properties',
  shortName: 'San Diego',
  streetAddress: '100 Harbor Drive',
  address2: '',
  city: 'San Diego',
  state: 'California',
  zip: '92101',
  country: 'UNITED STATES',
  region: 'North America',
  website: 'www.example.com',
  phone: '+1 619 555 0100',
  brand: 'Coastal',
  chainGroup: 'Pacific Group',
  syndicate: '',
  stars: 'Four',
  gmSurname: '',
  gmFirst: '',
  gmPhone: '',
  gmEmail: '',
  gmLinkedin: ''
};

@Component({
  selector: 'app-my-campaign-edit',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './my-campaign-edit.component.html',
  styleUrl: './my-campaign-edit.component.scss'
})
export class MyCampaignEditComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  vm: MyCampaignEditVm = { ...ALLERTON_MOCK };
  routeCampaignId = '';

  ngOnInit(): void {
    this.routeCampaignId = this.route.snapshot.paramMap.get('campaignId') ?? '';
    this.vm =
      this.routeCampaignId === '00002' ? { ...SAN_DIEGO_MOCK } : { ...ALLERTON_MOCK };
  }

  travellerTotal(): number {
    const n = (v: string) => Number.parseInt(v, 10) || 0;
    return (
      n(this.vm.excellent) +
      n(this.vm.veryGood) +
      n(this.vm.average) +
      n(this.vm.poor) +
      n(this.vm.terrible)
    );
  }

  travellerBarPct(value: string): number {
    const t = this.travellerTotal();
    if (t <= 0) {
      return 0;
    }
    return Math.min(100, Math.round(((Number.parseInt(value, 10) || 0) / t) * 1000) / 10);
  }

  onFileSelected(event: Event, target: keyof typeof IMAGE_SLOT_FIELDS): void {
    const name = (event.target as HTMLInputElement).files?.[0]?.name ?? '';
    this.vm[IMAGE_SLOT_FIELDS[target]] = name;
  }

  saveMain(): void {
    this.router.navigate(['/campaigns/my']);
  }

  saveGm(): void {
    this.router.navigate(['/campaigns/my']);
  }

  saveFc(): void {
    this.router.navigate(['/campaigns/my']);
  }
}

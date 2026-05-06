import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

/** Form state for the property / campaign edit screen (mock data keyed by list row id). */
export interface PropertyRow {
  property: string;
  gm: string;
  email: string;
  phone: string;
  logOn: string;
  excom: boolean;
}

export interface CampaignPropertyVm {
  propertyTitle: string;
  nameOfCampaign: string;
  campaignId: string;
  // ... existing fields kept for continuity if needed, but the view uses tables now
  properties: PropertyRow[];
}

const BALI_PROPERTIES: PropertyRow[] = [
  { property: 'Royal Pines Resort', gm: 'Indra Sulimani Ibid', email: 'indrasulimni@RoyalPinesBali.id', phone: '+6230981673 ...', logOn: '', excom: true },
  { property: 'Rosewood Suites Nu ...', gm: 'Patrick Geddes', email: 'PatrickG@Rosewood.com', phone: '+6230981673 ...', logOn: '', excom: true }
];

const PROPERTY_VIEW_MOCK: PropertyRow[] = [
  { property: 'Hilton Downtown', gm: '', email: '', phone: '', logOn: '', excom: true },
  { property: 'Sheraton 52nd Street', gm: '', email: '', phone: '', logOn: '', excom: true },
  { property: 'Property Name', gm: '', email: '', phone: '', logOn: '', excom: true },
  { property: 'Property Name', gm: '', email: '', phone: '', logOn: '', excom: true },
  { property: 'Property Name', gm: '', email: '', phone: '', logOn: '', excom: true },
  { property: 'Property Name', gm: '', email: '', phone: '', logOn: '', excom: true }
];

@Component({
  selector: 'app-campaign-property',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './campaign-property.component.html',
  styleUrl: './campaign-property.component.scss'
})
export class CampaignPropertyComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  viewMode: 'property' | 'detail' = 'property';
  
  // Controls for Property View
  campaignNameKey = 'bali';
  campaignNumberKey = '00001';

  vm: CampaignPropertyVm = {
    propertyTitle: 'Property View',
    nameOfCampaign: 'Bali',
    campaignId: '00001',
    properties: PROPERTY_VIEW_MOCK
  };

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('campaignId');
    if (id === 'detail') {
      this.switchToDetail();
    }
  }

  switchToDetail(): void {
    this.viewMode = 'detail';
    this.vm.propertyTitle = 'BALI 00001 detail view';
    this.vm.properties = BALI_PROPERTIES;
  }

  switchToProperty(): void {
    this.viewMode = 'property';
    this.vm.propertyTitle = 'Property View';
    this.vm.properties = PROPERTY_VIEW_MOCK;
  }

  onBack(): void {
    if (this.viewMode === 'detail') {
      this.switchToProperty();
    } else {
      this.router.navigate(['/campaigns/my-campaigns']);
    }
  }

  onAdd(): void {
    this.router.navigate(['/campaigns/define']);
  }

  viewDetail(row: PropertyRow): void {
    this.switchToDetail();
  }
}

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CampaignTableRow } from '../campaign-table-row.model';

@Component({
  selector: 'app-my-campaigns',
  standalone: true,
  imports: [FormsModule, MatRadioModule, MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './my-campaigns.component.html',
  styleUrl: './my-campaigns.component.scss'
})
export class MyCampaignsComponent {
  private readonly router = inject(Router);

  listFilter: 'all' | 'live' | 'draft' = 'all';

  campaigns: CampaignTableRow[] = [
    {
      id: '00001',
      name: 'Allerton Chicago Wiltshire Hotels',
      type: 'Geographic',
      count: '200',
      initiate: '03.03.24',
      live: '03.05.24',
      logOnPct: '8',
      lead: 'Helga Kramar'
    },
    {
      id: '00002',
      name: 'San Diego, CA',
      type: 'Geographic',
      count: '40',
      initiate: '03.03.24',
      live: '16.03.24',
      logOnPct: '25',
      lead: 'Candice Tong'
    }
  ];

  openEdit(row: CampaignTableRow): void {
    void this.router.navigate(['/campaigns/campaign-property', row.id]);
  }
}

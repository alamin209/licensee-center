import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CampaignTableRow } from '../campaign-table-row.model';

@Component({
  selector: 'app-all-campaigns',
  standalone: true,
  imports: [FormsModule, MatRadioModule, MatIconModule, MatButtonModule],
  templateUrl: './all-campaigns.component.html',
  styleUrl: './all-campaigns.component.scss'
})
export class AllCampaignsComponent {
  listFilter: 'live' | 'draft' = 'live';

  campaigns: CampaignTableRow[] = [
    {
      id: '00001',
      name: 'Bali',
      type: 'Agent',
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
}

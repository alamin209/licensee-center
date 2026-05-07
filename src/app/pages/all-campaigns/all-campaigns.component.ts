import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-all-campaigns',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatCardModule, 
    MatSelectModule, 
    MatCheckboxModule, 
    MatRadioModule, 
    MatIconModule, 
    MatButtonModule
  ],
  templateUrl: './all-campaigns.component.html',
  styleUrl: './all-campaigns.component.scss'
})
export class AllCampaignsComponent {
  operatorKey = 'all';
  listFilter = 'all';
  viewNoPickLists = false;

  campaigns = [
    { id: '00001', name: 'Bali', type: 'Agent', pickListDate: '', count: '' },
    { id: '00002', name: 'San Diego, CA', type: 'Geographic', pickListDate: '', count: '' }
  ];
}

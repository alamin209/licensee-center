import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UploadCampaignModalComponent } from '../../components/upload-campaign-modal/upload-campaign-modal.component';

export interface PickListRow {
  id: string;
  name: string;
  type: string;
  pickListDate: string;
  no: string;
}

@Component({
  selector: 'app-add-pick-lists',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  templateUrl: './add-pick-lists.component.html',
  styleUrl: './add-pick-lists.component.scss'
})
export class AddPickListsComponent {
  campaignNameKey = 'chicago-il';
  campaignNumberKey = '00005';
  operatorKey = 'all';
  filterType = 'all';
  viewNoPickLists = true;
  
  private dialog = inject(MatDialog);

  pickLists: PickListRow[] = [
    {
      id: '00001',
      name: 'Bali',
      type: 'Agent',
      pickListDate: '',
      no: ''
    },
    {
      id: '00002',
      name: 'San Diego, CA',
      type: 'Geographic',
      pickListDate: '',
      no: ''
    }
  ];

  onBrowseFile(): void {
    const campaignName = this.campaignNameKey === 'chicago-il' ? 'Chicago, Illinois' : 
                        this.campaignNameKey === 'san-diego' ? 'San Diego, CA' : 'Bali';
    
    this.dialog.open(UploadCampaignModalComponent, {
      width: '440px',
      panelClass: 'browse-picklists-modal-shell',
      data: {
        campaignName: campaignName,
        campaignNumber: this.campaignNumberKey
      }
    });
  }
}

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import {
  BrowsePickListsModalComponent,
  BrowsePickListsModalData,
  BrowsePickListsModalResult
} from './browse-pick-lists-modal.component';

export interface BrowsePickListTableRow {
  id: string;
  name: string;
  type: string;
  pickListDate: string;
  count: string;
}

@Component({
  selector: 'app-browse-pick-lists',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatIconModule
  ],
  templateUrl: './browse-pick-lists.component.html',
  styleUrl: './browse-pick-lists.component.scss'
})
export class BrowsePickListsComponent {
  private readonly dialog = inject(MatDialog);

  private readonly campaignLocationLabels: Record<string, string> = {
    'chicago-il': 'Chicago, Illinois',
    'san-diego': 'San Diego, CA',
    'bali': 'Bali'
  };

  private readonly campaignCodePrefix: Record<string, string> = {
    'chicago-il': 'Chicago',
    'san-diego': 'San_Diego',
    'bali': 'Bali'
  };

  campaignNameKey = 'chicago-il';
  campaignNumberKey = '00005';
  operatorKey = 'all';
  typeFilter: 'all' | 'agent' | 'brandSyndicate' | 'geographic' | 'thematic' = 'all';
  viewNoPickLists = true;

  rows: BrowsePickListTableRow[] = [
    { id: '00001', name: 'Bali', type: 'Agent', pickListDate: '03.03.24', count: '200' },
    { id: '00002', name: 'San Diego, CA', type: 'Geographic', pickListDate: '16.03.24', count: '40' }
  ];

  get locationLabel(): string {
    return this.campaignLocationLabels[this.campaignNameKey] ?? 'Chicago, Illinois';
  }

  get pickListCode(): string {
    const prefix = this.campaignCodePrefix[this.campaignNameKey] ?? 'Chicago';
    return `${prefix}_${this.campaignNumberKey}`;
  }

  openBrowseModal(): void {
    const data: BrowsePickListsModalData = {
      locationLabel: this.locationLabel,
      initialCode: this.pickListCode
    };
    this.dialog
      .open(BrowsePickListsModalComponent, {
        width: 'min(480px, 96vw)',
        panelClass: 'browse-picklists-modal-shell',
        data
      })
      .afterClosed()
      .subscribe((result: BrowsePickListsModalResult | undefined) => {
        if (!result) return;
        // Hook: wire save / run / upload when backend exists.
      });
  }
}

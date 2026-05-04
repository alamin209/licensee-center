import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import {
  AddPropertyDialogComponent,
  AddPropertyDialogData,
  AddPropertyDialogResult
} from './add-property-dialog.component';

export interface PickListPropertyRow {
  property: string;
  gm: string;
  email: string;
  phone: string;
  logonOn: string;
  excom: string;
}

@Component({
  selector: 'app-add-pick-lists',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule
  ],
  templateUrl: './add-pick-lists.component.html',
  styleUrl: './add-pick-lists.component.scss'
})
export class AddPickListsComponent {
  private readonly dialog = inject(MatDialog);

  private readonly campaignAddTitleLocation: Record<string, string> = {
    'chicago-il': 'CHICAGO, ILLINOIS',
    'san-diego': 'SAN DIEGO, CA',
    'bali': 'BALI'
  };

  searchQuery = '';

  campaignNameKey = 'chicago-il';
  campaignNumberKey = '00005';

  properties: PickListPropertyRow[] = [
    {
      property: 'Hilton Downtown',
      gm: 'Alex Morgan',
      email: 'a.morgan@example.com',
      phone: '+1 312 555 0101',
      logonOn: '92%',
      excom: 'Yes'
    },
    {
      property: 'Sheraton 52nd Street',
      gm: 'Jordan Lee',
      email: 'j.lee@example.com',
      phone: '+1 212 555 0102',
      logonOn: '88%',
      excom: 'No'
    }
  ];

  get addPropertyDialogTitle(): string {
    const loc = this.campaignAddTitleLocation[this.campaignNameKey] ?? '';
    return `ADD PROPERTY to ${loc}`;
  }

  openAddPropertyDialog(): void {
    const data: AddPropertyDialogData = { title: this.addPropertyDialogTitle };
    this.dialog
      .open(AddPropertyDialogComponent, {
        width: 'min(520px, 96vw)',
        panelClass: 'add-property-dialog-shell',
        data
      })
      .afterClosed()
      .subscribe((result: AddPropertyDialogResult | undefined) => {
        if (!result) return;
        // Hook: persist new property / refresh table when API exists.
      });
  }
}

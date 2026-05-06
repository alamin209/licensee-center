import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
import { CampaignService, Campaign } from '../../services/campaign.service';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { Observable, BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule
  ],
  templateUrl: './add-pick-lists.component.html',
  styleUrl: './add-pick-lists.component.scss'
})
export class AddPickListsComponent implements OnInit, OnDestroy {
  private dialog = inject(MatDialog);
  private campaignService = inject(CampaignService);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  campaignNameKey = '';
  campaignNumberKey = '';
  operatorKey = 'all';
  filterType = 'all';
  viewNoPickLists = true;
  pageSize = 10;
  pageIndex = 0;
  totalLength = 0;

  // All BehaviorSubjects declared together at the top
  readonly searchQuery$ = new BehaviorSubject<string>('');
  readonly filterType$ = new BehaviorSubject<string>('all');

  readonly campaigns$: Observable<Campaign[]> = this.campaignService.getCampaignsObservable();

  // pickLists$ is built in constructor to ensure filterType$ is initialized first
  pickLists$!: Observable<PickListRow[]>;

  constructor() {
    // Build the derived observable here — after all fields are initialized
    this.pickLists$ = combineLatest([
      this.campaigns$,
      this.searchQuery$.pipe(startWith('')),
      this.filterType$.pipe(startWith('all'))
    ]).pipe(
      map(([campaigns, query, filter]) => {
        let filtered = campaigns.map(c => ({
          id: c.campaignId,
          name: c.campaignName,
          type: c.campaignType === 'agent-specific' ? 'Agent'
              : c.campaignType === 'geographic'     ? 'Geographic'
              : 'Other',
          pickListDate: c.dateInitiated
            ? new Date(c.dateInitiated).toLocaleDateString()
            : '',
          no: ''
        }));

        if (query) {
          const q = query.toLowerCase();
          filtered = filtered.filter(r =>
            r.name.toLowerCase().includes(q) || r.id.toLowerCase().includes(q)
          );
        }

        if (filter && filter !== 'all') {
          filtered = filtered.filter(r => r.type.toLowerCase() === filter.toLowerCase());
        }

        this.totalLength = filtered.length;
        return filtered.slice(
          this.pageIndex * this.pageSize,
          (this.pageIndex + 1) * this.pageSize
        );
      })
    );
  }

  ngOnInit(): void {
    this.campaigns$.pipe(takeUntil(this.destroy$)).subscribe(campaigns => {
      if (campaigns.length > 0) {
        const latest = campaigns[campaigns.length - 1];
        this.campaignNameKey = latest.campaignName;
        this.campaignNumberKey = latest.campaignId;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.searchQuery$.next(query);
    this.pageIndex = 0;
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    // Trigger re-emission to recalculate the page slice
    this.searchQuery$.next(this.searchQuery$.value);
  }

  onFilterTypeChange(): void {
    this.filterType$.next(this.filterType);
    this.pageIndex = 0;
    this.searchQuery$.next(this.searchQuery$.value);
  }

  onViewCampaign(id: string): void {
    const campaign = this.campaignService.getCampaigns().find(c => c.campaignId === id);
    if (campaign) {
      this.campaignService.setSelectedCampaign(campaign);
      this.router.navigate(['/campaigns/preview']);
    }
  }

  onBrowseFile(): void {
    this.dialog.open(UploadCampaignModalComponent, {
      width: '440px',
      panelClass: 'browse-picklists-modal-shell',
      data: {
        campaignName: this.campaignNameKey,
        campaignNumber: this.campaignNumberKey
      }
    });
  }
}

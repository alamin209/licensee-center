import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CampaignService, Campaign } from '../../services/campaign.service';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';

@Component({
  selector: 'app-campaign-preview',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, SafeUrlPipe],
  templateUrl: './campaign-preview.component.html',
  styleUrl: './campaign-preview.component.scss'
})
export class CampaignPreviewComponent implements OnInit {
  private readonly campaignService = inject(CampaignService);
  private readonly router = inject(Router);

  campaign: Campaign | null = null;

  ngOnInit(): void {
    // 1. Try to get specifically selected campaign
    const selected = this.campaignService.getSelectedCampaign();
    if (selected) {
      this.campaign = selected;
      return;
    }

    // 2. Fallback: Get the last added campaign from the service
    const campaigns = this.campaignService.getCampaigns();
    if (campaigns.length > 0) {
      this.campaign = campaigns[campaigns.length - 1];
    } else {
      // If no campaign at all, go back to define
      this.router.navigate(['/campaigns/define']);
    }
  }

  onBack(): void {
    this.router.navigate(['/campaigns/define']);
  }

  onConfirm(): void {
    this.router.navigate(['/campaigns/define-campaign-geographic']);
  }
}

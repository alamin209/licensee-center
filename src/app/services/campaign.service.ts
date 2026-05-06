import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Campaign {
  campaignType: string;
  campaignName: string;
  campaignId: string;
  descriptor?: string;
  tagline?: string;
  licenseManager: string;
  director: string;
  campaignLead: string;
  dataCollator: string;
  associateRep: string;
  selfLicensing: string;
  selectLicense: string;
  imageFile: string | null;
  imageFileUrl?: string | null;
  pdfFile: string | null;
  pdfFileUrl?: string | null;
  videoFile: string | null;
  videoFileUrl?: string | null;
  numProperties: number | null;
  productPriceVary: string;
  agentSuccessFee: string;
  dateInitiated: Date | null;
  notesInternal?: string;
  notesExternal?: string;
  location?: string | null;
  uploadUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private campaignsSubject = new BehaviorSubject<Campaign[]>([]);
  campaigns$ = this.campaignsSubject.asObservable();

  private lastCreatedCampaignSubject = new BehaviorSubject<Campaign | null>(null);
  lastCreatedCampaign$ = this.lastCreatedCampaignSubject.asObservable();

  private selectedCampaignSubject = new BehaviorSubject<Campaign | null>(null);
  selectedCampaign$ = this.selectedCampaignSubject.asObservable();

  addCampaign(campaign: Campaign): void {
    const currentCampaigns = this.campaignsSubject.getValue();
    this.campaignsSubject.next([...currentCampaigns, campaign]);
    this.lastCreatedCampaignSubject.next(campaign);
  }

  getCampaigns(): Campaign[] {
    return this.campaignsSubject.getValue();
  }

  getLastCreatedCampaign(): Campaign | null {
    return this.lastCreatedCampaignSubject.getValue();
  }

  getCampaignsObservable(): Observable<Campaign[]> {
    return this.campaigns$;
  }

  setSelectedCampaign(campaign: Campaign | null): void {
    this.selectedCampaignSubject.next(campaign);
  }

  getSelectedCampaign(): Campaign | null {
    return this.selectedCampaignSubject.getValue();
  }
}

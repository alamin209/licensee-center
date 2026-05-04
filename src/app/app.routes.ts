import { Routes } from '@angular/router';

const loadProfileEdit = () =>
  import('./pages/profile-edit/profile-edit.component').then((m) => m.ProfileEditComponent);
const loadDefineCampaigns = () =>
  import('./pages/define-campaigns/define-campaigns.component').then((m) => m.DefineCampaignsComponent);
const loadBrowsePickLists = () =>
  import('./pages/browse-pick-lists/browse-pick-lists.component').then((m) => m.BrowsePickListsComponent);
const loadAddPickLists = () =>
  import('./pages/add-pick-lists/add-pick-lists.component').then((m) => m.AddPickListsComponent);
const loadMyCampaignEdit = () =>
  import('./pages/my-campaign-edit/my-campaign-edit.component').then((m) => m.MyCampaignEditComponent);
const loadMyCampaigns = () =>
  import('./pages/my-campaigns/my-campaigns.component').then((m) => m.MyCampaignsComponent);
const loadAllCampaigns = () =>
  import('./pages/all-campaigns/all-campaigns.component').then((m) => m.AllCampaignsComponent);

export const routes: Routes = [
  { path: '', redirectTo: 'profile/all', pathMatch: 'full' },
  { path: 'profile/all', loadComponent: loadProfileEdit },
  { path: 'profile/profiles', loadComponent: loadProfileEdit },
  { path: 'profile/verify', loadComponent: loadProfileEdit },
  { path: 'campaigns/define', loadComponent: loadDefineCampaigns },
  { path: 'campaigns/picklists/browse', loadComponent: loadBrowsePickLists },
  { path: 'campaigns/picklists', loadComponent: loadAddPickLists },
  // Property detail (standalone page); legacy `/edit` URL still loads the same screen.
  { path: 'campaigns/my/campaign/:campaignId', loadComponent: loadMyCampaignEdit },
  { path: 'campaigns/my/:campaignId/edit', loadComponent: loadMyCampaignEdit },
  { path: 'campaigns/my', loadComponent: loadMyCampaigns },
  { path: 'campaigns/all', loadComponent: loadAllCampaigns },
  { path: '**', redirectTo: 'profile/all' }
];

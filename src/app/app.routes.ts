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

const loadViewAllProfiles = () =>
  import('./pages/view-all-profiles/view-all-profiles.component').then((m) => m.ViewAllProfilesComponent);
const loadVerifyOperator = () =>
  import('./pages/verify-operator/verify-operator.component').then((m) => m.VerifyOperatorComponent);
const loadBlankPage = () =>
  import('./pages/blank-page/blank-page.component').then((m) => m.BlankPageComponent);
const loadDefineCampaignGeographic = () =>
  import('./pages/define-campaign-geographic/define-campaign-geographic.component').then((m) => m.DefineCampaignGeographicComponent);
const loadCampaignProperty = () =>
  import('./pages/campaign-property/campaign-property.component').then((m) => m.CampaignPropertyComponent);
const loadCampaignPreview = () =>
  import('./pages/campaign-preview/campaign-preview.component').then((m) => m.CampaignPreviewComponent);

export const routes: Routes = [
  { path: '', redirectTo: 'profile/all', pathMatch: 'full' },

  // Edit My Profile — `ProfileEditComponent` (same component, view mode driven by URL path).
  { path: 'operator-console/edit-my-profile', redirectTo: 'profile/all', pathMatch: 'full' },
  { path: 'profile/edit', loadComponent: loadProfileEdit },
  { path: 'profile/view', loadComponent: loadProfileEdit },
  { path: 'profile/profiles', loadComponent: loadProfileEdit },
  { path: 'profile/verify', loadComponent: loadProfileEdit },

  { path: 'operator-console/view-all-profiles', loadComponent: loadViewAllProfiles },
  { path: 'operator-console/verify-operator', loadComponent: loadVerifyOperator },

  { path: 'placeholder', loadComponent: loadBlankPage },
  { path: 'communications/:id', loadComponent: loadBlankPage },
  { path: 'introduction/:id', loadComponent: loadBlankPage },
  { path: 'components/:id', loadComponent: loadBlankPage },
  { path: 'directory/:id', loadComponent: loadBlankPage },
  { path: 'hands-on/:id', loadComponent: loadBlankPage },
  { path: 'licencing/:id', loadComponent: loadBlankPage },
  { path: 'activation/:id', loadComponent: loadBlankPage },
  { path: 'other/:id', loadComponent: loadBlankPage },

  { path: 'campaigns/define', loadComponent: loadDefineCampaigns },
  { path: 'campaigns/define-campaigns', redirectTo: 'campaigns/define', pathMatch: 'full' },
  { path: 'campaigns/picklists/browse', loadComponent: loadBrowsePickLists },
  { path: 'campaigns/browse-pick-lists', redirectTo: 'campaigns/picklists/browse', pathMatch: 'full' },
  { path: 'campaigns/picklists', loadComponent: loadAddPickLists },
  { path: 'campaigns/add-pick-lists', redirectTo: 'campaigns/picklists', pathMatch: 'full' },
  { path: 'campaigns/my/campaign/:campaignId', loadComponent: loadMyCampaignEdit },
  { path: 'campaigns/my/:campaignId/edit', loadComponent: loadMyCampaignEdit },
  { path: 'campaigns/my', loadComponent: loadMyCampaigns },
  { path: 'campaigns/my-campaigns', redirectTo: 'campaigns/my', pathMatch: 'full' },
  { path: 'campaigns/all', loadComponent: loadAllCampaigns },
  { path: 'campaigns/all-campaigns', redirectTo: 'campaigns/all', pathMatch: 'full' },
  { path: 'campaigns/campaign-property/:campaignId', loadComponent: loadCampaignProperty },
  { path: 'campaigns/define-campaign-geographic', loadComponent: loadDefineCampaignGeographic },
  { path: 'campaigns/preview', loadComponent: loadCampaignPreview },

  { path: '**', redirectTo: 'profile/edit' }
];

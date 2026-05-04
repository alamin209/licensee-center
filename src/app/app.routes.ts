import { Routes } from '@angular/router';
import { ViewAllProfilesComponent } from './pages/view-all-profiles/view-all-profiles.component';
import { VerifyOperatorComponent } from './pages/verify-operator/verify-operator.component';
import { BlankPageComponent } from './pages/blank-page/blank-page.component';
import { DefineCampaignGeographicComponent } from './pages/define-campaign-geographic/define-campaign-geographic.component';
import { CampaignPropertyComponent } from './pages/campaign-property/campaign-property.component';

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

  // Edit My Profile → same screen as git (`ProfileEditComponent`); old URL still works.
  { path: 'operator-console/edit-my-profile', redirectTo: 'profile/all', pathMatch: 'full' },
  { path: 'profile/all', loadComponent: loadProfileEdit },
  { path: 'profile/profiles', loadComponent: loadProfileEdit },
  { path: 'profile/verify', loadComponent: loadProfileEdit },

  { path: 'operator-console/view-all-profiles', component: ViewAllProfilesComponent },
  { path: 'operator-console/verify-operator', component: VerifyOperatorComponent },

  { path: 'placeholder', component: BlankPageComponent },
  { path: 'communications/:id', component: BlankPageComponent },
  { path: 'introduction/:id', component: BlankPageComponent },
  { path: 'components/:id', component: BlankPageComponent },
  { path: 'directory/:id', component: BlankPageComponent },
  { path: 'hands-on/:id', component: BlankPageComponent },
  { path: 'licencing/:id', component: BlankPageComponent },
  { path: 'activation/:id', component: BlankPageComponent },
  { path: 'other/:id', component: BlankPageComponent },

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
  { path: 'campaigns/campaign-property/:campaignId', component: CampaignPropertyComponent },
  { path: 'campaigns/define-campaign-geographic', component: DefineCampaignGeographicComponent },

  { path: '**', redirectTo: 'profile/all' }
];

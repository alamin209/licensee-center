import { Injectable } from '@angular/core';

export interface MenuItem {
  title: string;
  icon?: string;
  route?: string;
  expanded?: boolean;
  children?: MenuItem[];
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  getMenu(): MenuItem[] {
    return [
      {
        title: 'Operator console',
        expanded: true,
        children: [
          { title: 'Edit My Profile', icon: 'person_outline', route: '/profile/all' },
          { title: 'View all Profiles', icon: 'headset_mic', route: '/profile/profiles' },
          { title: 'Verify Operator', icon: 'badge', route: '/profile/verify' },
        ]
      },
      {
        title: 'Campaigns',
        expanded: false,
        children: [
          { title: 'Define Campaigns', icon: 'description', route: '/campaigns/define' },
          { title: 'Add Pick Lists', icon: 'playlist_add', route: '/campaigns/picklists' },
          { title: 'Browse Pick Lists', icon: 'upload_file', route: '/campaigns/picklists/browse' },
          { title: 'My Campaigns', icon: 'inventory_2', route: '/campaigns/my' },
          {
            title: 'Campaign property',
            icon: 'edit_square',
            route: '/campaigns/my/campaign/00001',
          },
          { title: 'All Campaigns', icon: 'campaign', route: '/campaigns/all' },
        ]
      },
      {
        title: 'Communications',
        expanded: false,
        children: [
          { title: 'Campaign Messages', icon: 'chat', route: '#' },
        ]
      }
    ];
  }
}

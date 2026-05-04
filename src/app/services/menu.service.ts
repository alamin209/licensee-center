import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
 
export interface MenuItem {
  title: string;
  icon?: string;
  route?: string;
  expanded?: boolean;
  isSvg?: boolean;
  children?: MenuItem[];
  isLabel?: boolean;
}
 
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private sidebarOpenSubject = new BehaviorSubject<boolean>(false);
  sidebarOpen$ = this.sidebarOpenSubject.asObservable();
 
  // Dictionary of custom SVG icons
  private customIcons: { [key: string]: string } = {
    'sidebar-profile': `
      <svg width="24" height="24" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 12V10C0 9.68056 0.0868056 9.37847 0.260417 9.09375C0.434028 8.80903 0.673611 8.56944 0.979167 8.375C1.74306 7.93056 2.55112 7.59028 3.40335 7.35417C4.25559 7.11806 5.12114 7 6 7C6.52332 7 7.03956 7.04167 7.54873 7.125C8.05791 7.20833 8.55556 7.32639 9.04167 7.47917L7.83333 8.6875C7.52778 8.61806 7.22485 8.56944 6.92456 8.54167C6.62429 8.51389 6.3161 8.5 6 8.5C5.23611 8.5 4.49306 8.59722 3.77083 8.79167C3.04861 8.98611 2.36806 9.27778 1.72917 9.66667C1.65972 9.72222 1.60417 9.77586 1.5625 9.82758C1.52083 9.87931 1.5 9.93678 1.5 10V10.5H6.5V12H0ZM8 13V10.6458L12.375 6.29167C12.4758 6.18872 12.5878 6.11438 12.711 6.06863C12.8342 6.02288 12.9567 6 13.0783 6C13.211 6 13.3382 6.02431 13.4599 6.07292C13.5815 6.12153 13.6921 6.19444 13.7917 6.29167L14.7083 7.22917C14.7998 7.32997 14.8713 7.44198 14.9228 7.56519C14.9743 7.6884 15 7.81083 15 7.93248C15 8.05415 14.9771 8.17857 14.9314 8.30575C14.8856 8.43293 14.8113 8.54629 14.7083 8.64583L10.3542 13H8ZM9 12H9.9375L12.3333 9.60417L11.875 9.125L11.4167 8.66667L9 11.0625V12ZM11.875 9.125L11.4167 8.66667L12.3333 9.60417L11.875 9.125ZM6 6C5.16667 6 4.45833 5.70833 3.875 5.125C3.29167 4.54167 3 3.83333 3 3C3 2.16667 3.29167 1.45833 3.875 0.875C4.45833 0.291667 5.16667 0 6 0C6.83333 0 7.54167 0.291667 8.125 0.875C8.70833 1.45833 9 2.16667 9 3C9 3.83333 8.70833 4.54167 8.125 5.125C7.54167 5.70833 6.83333 6 6 6ZM6.00442 4.5C6.41814 4.5 6.77083 4.35269 7.0625 4.05808C7.35417 3.76346 7.5 3.40929 7.5 2.99558C7.5 2.58186 7.35269 2.22917 7.05808 1.9375C6.76346 1.64583 6.40929 1.5 5.99558 1.5C5.58186 1.5 5.22917 1.64731 4.9375 1.94192C4.64583 2.23654 4.5 2.59071 4.5 3.00442C4.5 3.41814 4.64731 3.77083 4.94192 4.0625C5.23654 4.35417 5.59071 4.5 6.00442 4.5Z" fill="currentColor"/>
      </svg>
    `,
    'sidebar-profiles-all': `
      <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 16.5V15H12.5V14H9V8H12.5V7C12.5 5.44444 11.9636 4.13889 10.8909 3.08333C9.81815 2.02778 8.52301 1.5 7.00548 1.5C5.48794 1.5 4.19097 2.02778 3.11458 3.08333C2.03819 4.13889 1.5 5.44444 1.5 7V8H5V14H1.5C1.09722 13.9722 0.746528 13.8194 0.447917 13.5417C0.149306 13.2639 0 12.9167 0 12.5V7.00344C0 6.03499 0.184028 5.12217 0.552083 4.26498C0.920139 3.40777 1.42361 2.66319 2.0625 2.03125C2.70139 1.39931 3.44472 0.902778 4.29248 0.541667C5.14026 0.180556 6.04303 0 7.00081 0C7.9586 0 8.86458 0.180556 9.71875 0.541667C10.5729 0.902778 11.316 1.39931 11.9479 2.03125C12.5799 2.66319 13.0799 3.4074 13.4479 4.26388C13.816 5.12035 14 6.03239 14 7V15C14 15.4028 13.8531 15.7535 13.5594 16.0521C13.2656 16.3507 12.9125 16.5 12.5 16.5H7ZM1.5 12.5H3.5V9.5H1.5V12.5ZM10.5 12.5H12.5V9.5H10.5V12.5Z" fill="currentColor"/>
      </svg>
    `,
    'sidebar-verify': `
      <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 17V1H1V17H21Z" stroke="currentColor" stroke-width="2" stroke-linecap="square"/>
        <path d="M5 7H7.5M5 11H7.5M11.5 12.5C11.5 11.7044 11.8161 10.9413 12.3787 10.3787C12.9413 9.81607 13.7044 9.5 14.5 9.5M14.5 9.5C15.2956 9.5 16.0587 9.81607 16.6213 10.3787C17.1839 10.9413 17.5 11.7044 17.5 12.5M14.5 9.5C15.0304 9.5 15.5391 9.28929 15.9142 8.91421C16.2893 8.53914 16.5 8.03043 16.5 7.5C16.5 6.96957 16.2893 6.46086 15.9142 6.08579C15.5391 5.71071 15.0304 5.5 14.5 5.5C13.9696 5.5 13.4609 5.71071 13.0858 6.08579C12.7107 6.46086 12.5 6.96957 12.5 7.5C12.5 8.03043 12.7107 8.53914 13.0858 8.91421C13.4609 9.28929 13.9696 9.5 14.5 9.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="square"/>
      </svg>
    `,
    'sidebar-add-pick-list': `
      <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.25 13H6.75V10.75H9V9.25H6.75V7H5.25V9.25H3V10.75H5.25V13ZM1.4941 16C1.08137 16 0.734375 15.8531 0.4375 15.5594C0.145833 15.2656 0 14.9125 0 14.5V1.5C0 1.0875 0.146875 0.734376 0.440625 0.440626C0.734375 0.146876 1.0875 0 1.5 0H8L12 4V14.5C12 14.9125 11.853 15.2656 11.5591 15.5594C11.2652 15.8531 10.9119 16 10.4992 16H1.4941ZM7 5V1.5H1.5V14.5H10.5V5H7Z" fill="currentColor"/>
      </svg>
    `,
    'sidebar-all-campaigns': `
      <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 12V4.5L4.5 0L9 4.5V12H0ZM1.5 10.5H3.75V8.2526H5.25V10.5H7.5V5.125L4.5 2.125L1.5 5.12277V10.5ZM3.75 6.75V5.25H5.25V6.75H3.75ZM10.5 12V3.88125L6.625 0H8.74129L12 3.25V12H10.5ZM13.4993 12V2.64375L10.8542 0H12.974L15 2.025V12H13.4993Z" fill="currentColor"/>
      </svg>
    `,
    'sidebar-ceo-greetings': `
      <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.66667 0C7.58333 0 8.33333 0.75 8.33333 1.66667C8.33333 2.58333 7.58333 3.33333 6.66667 3.33333C5.75 3.33333 5 2.58333 5 1.66667C5 0.75 5.75 0 6.66667 0ZM9.91667 5.08333C9.58333 4.75 9 4.16667 7.91667 4.16667H5.83333C3.5 4.16667 1.66667 2.33333 1.66667 0H0C0 2.66667 1.75 4.83333 4.16667 5.58333V16.6667H5.83333V11.6667H7.5V16.6667H9.16667V6.75L12.5 10L13.6667 8.83333L9.91667 5.08333Z" fill="currentColor"/>
      </svg>
    `,
    'sidebar-campaign-messages': `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.16667 11.8333H10.1667L12.6667 14.3333V11.8333H14.3333V5.16667H12.6667M1 1H10.1667V7.66667H5.16667L2.66667 10.1667V7.66667H1V1Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,
    'sidebar-define-campaigns': `
      <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 10H6.41667C6.54167 9.72222 6.69097 9.45833 6.86458 9.20833C7.03819 8.95833 7.22917 8.72222 7.4375 8.5H3V10ZM3 13H6.10417C6.05208 12.75 6.01823 12.5 6.0026 12.25C5.98698 12 5.99306 11.75 6.02083 11.5H3V13ZM1.5 16C1.0875 16 0.734375 15.8531 0.440625 15.5594C0.146875 15.2656 0 14.9125 0 14.5V1.5C0 1.0875 0.146875 0.734376 0.440625 0.440626C0.734375 0.146876 1.0875 0 1.5 0H8L12 4V7.10417C11.75 7.04861 11.5 7.01389 11.25 7C11 6.98611 10.75 6.99306 10.5 7.02083V5H7V1.5H1.5V14.5H6.66667C6.83333 14.7917 7.02778 15.066 7.25 15.3229C7.47222 15.5799 7.72222 15.8056 8 16H1.5ZM10.9953 14C11.554 14 12.0278 13.8071 12.4167 13.4214C12.8056 13.0356 13 12.5634 13 12.0047C13 11.446 12.8067 10.9722 12.42 10.5833C12.0333 10.1944 11.56 10 11 10C10.5556 10 10.1111 10.1667 9.66667 10.5C9.22222 10.8333 9 11.3333 9 12C9 12.56 9.19288 13.0333 9.57865 13.42C9.9644 13.8067 10.4366 14 10.9953 14ZM14.9375 17L12.8958 14.9375C12.6181 15.1181 12.3192 15.2569 11.9994 15.3542C11.6795 15.4514 11.3499 15.5 11.0104 15.5C10.0312 15.5 9.20139 15.1597 8.52083 14.4792C7.84028 13.7986 7.5 12.9722 7.5 12C7.5 11.0278 7.84028 10.2014 8.52083 9.52083C9.20139 8.84028 10.0278 8.5 11 8.5C11.9722 8.5 12.7986 8.84028 13.4792 9.52083C14.1597 10.2014 14.5 11.0278 14.5 12C14.5 12.3418 14.4514 12.6738 14.3542 12.996C14.2569 13.3181 14.1181 13.6181 13.9375 13.8958L16 15.9375L14.9375 17Z" fill="currentColor"/>
      </svg>
    `,
    'sidebar-hospitality': `
      <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.66667 0C8.50833 0 10 1.49167 10 3.33333C10 5.175 8.50833 6.66667 6.66667 6.66667C4.825 6.66667 3.33333 5.175 3.33333 3.33333C3.33333 1.49167 4.825 0 6.66667 0ZM10 8.78333C10 9.66667 9.76667 11.725 8.175 14.025L7.5 10L8.28333 8.43333C7.76667 8.375 7.225 8.33333 6.66667 8.33333C6.10833 8.33333 5.56667 8.375 5.05 8.43333L5.83333 10L5.15833 14.025C3.56667 11.725 3.33333 9.66667 3.33333 8.78333C1.34167 9.36667 0 10.4167 0 11.6667V15H13.3333V11.6667C13.3333 10.4167 12 9.36667 10 8.78333Z" fill="currentColor"/>
      </svg>
    `,
    'sidebar-my-campaigns': `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 16V3L4 0L8 3V5H16V16H0ZM1.5 14.5H3V13H1.5V14.5ZM1.5 11.3333H3V9.83333H1.5V11.3333ZM1.5 8.16667H3V6.66667H1.5V8.16667ZM1.5 5H3V3.5H1.5V5ZM5 5H6.5V3.5H5V5ZM5 14.5H14.5V6.5H5V14.5ZM9.5 9.64583V8.14583H13V9.64583H9.5ZM9.5 12.8542V11.3542H13V12.8542H9.5ZM6.5 9.64583V8.14583H8V9.64583H6.5ZM6.5 12.8542V11.3542H8V12.8542H6.5Z" fill="currentColor"/>
      </svg>
    `,
    'sidebar-property-welcome': `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.8585 4.12467L2.91683 7.08301C0.141829 9.84134 0.141829 14.3247 2.91683 17.083C5.69183 19.8413 10.1585 19.858 12.9168 17.083L17.9168 12.083C18.7502 11.2747 18.7502 9.94967 17.9168 9.13301C17.8335 9.03301 17.7252 8.94134 17.6085 8.86634L17.9168 8.54134C18.7502 7.73301 18.7502 6.40801 17.9168 5.59134C17.8002 5.45801 17.6418 5.34134 17.5002 5.24967C17.8168 4.48301 17.6752 3.56634 17.0502 2.94134C16.3252 2.21634 15.2002 2.14134 14.3835 2.70801C14.2139 2.44682 13.9883 2.22667 13.7231 2.06354C13.4578 1.9004 13.1596 1.79837 12.85 1.76486C12.5404 1.73135 12.2272 1.76719 11.9332 1.86979C11.6392 1.97238 11.3717 2.13916 11.1502 2.35801L9.0585 4.44967C8.9835 4.33301 8.89183 4.22467 8.79183 4.12467C8.39857 3.74385 7.8726 3.53092 7.32516 3.53092C6.77773 3.53092 6.25176 3.74385 5.8585 4.12467ZM7.0335 5.30801C7.20016 5.14134 7.4585 5.14134 7.62516 5.30801C7.79183 5.47467 7.79183 5.73301 7.62516 5.89967L4.97516 8.54967C5.44333 9.01843 5.7063 9.65384 5.7063 10.3163C5.7063 10.9788 5.44333 11.6143 4.97516 12.083L6.15016 13.258C6.7233 12.6849 7.11686 11.9572 7.28263 11.1638C7.44841 10.3704 7.37921 9.54596 7.0835 8.79134L12.3335 3.54134C12.5002 3.37467 12.7585 3.37467 12.9168 3.54134C13.0752 3.70801 13.0918 3.96634 12.9168 4.13301L9.09183 7.96634L10.2668 9.14134L15.2752 4.13301C15.4418 3.96634 15.7002 3.96634 15.8668 4.13301C16.0335 4.29967 16.0335 4.55801 15.8668 4.72467L10.8585 9.73301L12.0335 10.908L16.1585 6.78301C16.3252 6.61634 16.5835 6.61634 16.7502 6.78301C16.9168 6.94968 16.9168 7.20801 16.7502 7.37468L12.0335 12.083L13.2085 13.2663L16.1585 10.3163C16.3252 10.1497 16.5835 10.1497 16.7502 10.3163C16.9168 10.483 16.9168 10.7413 16.7502 10.908L11.7502 15.9163C9.6335 18.033 6.2085 18.033 4.09183 15.9163C1.97516 13.7997 1.97516 10.3747 4.09183 8.25801L7.0335 5.30801ZM19.1668 14.1663C19.1668 16.9247 16.9252 19.1663 14.1668 19.1663V17.9163C16.2502 17.9163 17.9168 16.2497 17.9168 14.1663H19.1668ZM0.833496 5.83301C0.833496 3.07467 3.07516 0.833008 5.8335 0.833008V2.08301C3.75016 2.08301 2.0835 3.74967 2.0835 5.83301H0.833496Z" fill="currentColor"/>
      </svg>
    `,
    // User can add more here...
  };
 
  getCustomIcons() {
    return this.customIcons;
  }
 
  toggleSidebar(): void {
    this.sidebarOpenSubject.next(!this.sidebarOpenSubject.value);
  }
 
  setSidebarState(isOpen: boolean): void {
    this.sidebarOpenSubject.next(isOpen);
  }
  getMenu(): MenuItem[] {
    return [
      {
        title: 'Operator console',
        expanded: true,
        children: [
          { title: 'Edit My Profile', icon: 'sidebar-profile', route: '/profile/all', isSvg: true },
          { title: 'View all Profiles', icon: 'sidebar-profiles-all', route: '/profile/profiles', isSvg: true },
          { title: 'Verify Operator', icon: 'sidebar-verify', route: '/profile/verify', isSvg: true },
        ]
      },
      {
        title: 'Campaigns',
        expanded: false,
        children: [
          { title: 'Define Campaigns', icon: 'sidebar-define-campaigns', route: '/campaigns/define', isSvg: true },
          { title: 'Add Pick Lists', icon: 'sidebar-add-pick-list', route: '/campaigns/picklists', isSvg: true },
          { title: 'My Campaigns', icon: 'sidebar-my-campaigns', route: '/campaigns/my', isSvg: true },
          { title: 'All Campaigns', icon: 'sidebar-all-campaigns', route: '/campaigns/all', isSvg: true },
        ]
      },
      {
        title: 'Communications',
        expanded: false,
        children: [
          { title: 'Campaign Messages', icon: 'sidebar-campaign-messages', route: '/communications/campaign-messages', isSvg: true },
        ]
      },
      {
        title: 'Introduction & Concepts',
        expanded: true,
        children: [
          { title: 'Property Welcome', icon: 'sidebar-property-welcome', route: '/introduction/property-welcome', isSvg: true },
          { title: 'Hospitality Professional', icon: 'sidebar-hospitality', route: '/introduction/hospitality-professional', isSvg: true },
          { title: 'CEO\'s Greetings', icon: 'sidebar-ceo-greetings', route: '/introduction/ceos-greetings', isSvg: true },
          { title: 'GBXM Overview', icon: 'info', route: '/introduction/gbxm-overview' },
          { title: 'GXI Success', icon: 'emoji_events', route: '/introduction/gxi-success' },
          { title: 'GXI Culture', icon: 'volunteer_activism', route: '/introduction/gxi-culture' },
          { title: 'Personalized-to-Pocket', icon: 'account_balance_wallet', route: '/introduction/personalized-to-pocket' },
          { title: 'The Escape', isLabel: true },
          { title: 'Excellence', icon: 'verified', route: '/introduction/excellence' },
          { title: 'Simplicity', icon: 'timeline', route: '/introduction/simplicity' },
          { title: 'Certainty', icon: 'gpp_good', route: '/introduction/certainty' },
          { title: 'Alignment', icon: 'grid_view', route: '/introduction/alignment' },
          { title: 'Productivity', icon: 'speed', route: '/introduction/productivity' },
          { title: 'Engagement', icon: 'campaign', route: '/introduction/engagement' },
        ]
      },
      {
        title: 'GBXM Components',
        expanded: true,
        children: [
          { title: 'Job Guides', icon: 'menu_book', route: '/components/job-guides' },
          { title: 'Daily Briefings', icon: 'calendar_month', route: '/components/daily-briefings' },
          { title: 'Orientation', icon: 'co_present', route: '/components/orientation' },
          { title: 'Team Quality Requirements', icon: 'format_list_bulleted', route: '/components/team-quality' },
          { title: 'GXM Exceptional Service', icon: 'auto_awesome', route: '/components/service-excellence' },
          { title: 'OXM Operating Standards', icon: 'check_circle_outline', route: '/components/operating-standards' },
          { title: 'DXM Progress Reports', icon: 'bar_chart', route: '/components/progress-reports' },
          { title: 'Achievement Certification', icon: 'workspace_premium', route: '/components/certification' },
        ]
      },
      {
        title: 'Directory',
        expanded: true,
        children: [
          { title: 'Property Details', icon: 'storefront', route: '/directory/property-details' },
          { title: 'Your Contacts', icon: 'call', route: '/directory/contacts' },
        ]
      },
      {
        title: 'Hands On',
        expanded: false,
        children: [
          { title: 'GM Access Credentials', icon: 'vpn_key', route: '/hands-on/credentials' },
          { title: 'Invite ExCom', icon: 'group_add', route: '/hands-on/invite-excom' },
          { title: 'Owner Briefing', icon: 'assignment', route: '/hands-on/owner-briefing' },
        ]
      },
      {
        title: 'Licencing',
        expanded: false,
        children: [
          { title: 'Property License (EULA)', icon: 'workspace_premium', route: '/licencing/eula' },
          { title: 'License Parties', icon: 'card_membership', route: '/licencing/parties' },
          { title: 'Pricing', icon: 'local_offer', route: '/licencing/pricing' },
          { title: 'ROI Calculators', icon: 'calculate', route: '/licencing/roi-calculators' },
          { title: 'Tenure & On Cost', icon: 'track_changes', route: '/licencing/tenure-cost' },
          { title: 'Rooms Upsales', icon: 'meeting_room', route: '/licencing/rooms-upsales' },
          { title: 'F&B Upsales', icon: 'arrow_circle_up', route: '/licencing/fb-upsales' },
          { title: 'Operational', icon: 'show_chart', route: '/licencing/operational' },
          { title: 'Approval & Purchase Order', icon: 'verified', route: '/licencing/approval-po' },
          { title: 'Order Tracking', icon: 'share_location', route: '/licencing/order-tracking' },
          { title: 'Account Admin', icon: 'admin_panel_settings', route: '/licencing/account-admin' },
        ]
      },
      {
        title: 'Activation',
        expanded: false,
        children: [
          { title: 'Switch On', icon: 'toggle_on', route: '/activation/switch-on' },
          { title: 'Expand', icon: 'open_in_full', route: '/activation/expand' },
          { title: 'Engage', icon: 'campaign', route: '/activation/engage' },
        ]
      },
      {
        title: 'Other Information',
        expanded: false,
        children: [
          { title: 'Papers', icon: 'article', route: '/other/papers' },
          { title: 'Videos', icon: 'videocam', route: '/other/videos' },
          { title: 'FAQs', icon: 'question_answer', route: '/other/faqs' },
        ]
      }
    ];
  }
}
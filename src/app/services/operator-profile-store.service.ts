import { Injectable } from '@angular/core';

export interface OperatorProfileDemo {
  givenName: string;
  lastName: string;
  preferred: string;
  title: string;
  userId: string;
  personalEmail: string;
  cell: string;
  contactEmail: string;
  companyEmail: string;
  linkedin: string;
  teamsId: string;
  about: string;
  tradingEntity: string;
  registration: string;
  digitalPresence1: string;
  digitalPresence2: string;
  digitalPresence3: string;
  digitalPresence4: string;
}

export const INITIAL_OPERATOR_PROFILE: OperatorProfileDemo = {
  givenName: 'Melinda',
  lastName: 'Tankard',
  preferred: 'Mel',
  title: 'Associate Representative',
  userId: '36574',
  personalEmail: 'melindaT347@gmail.com',
  cell: '+658934527812',
  contactEmail: 'LicensingM01@gbxm.com',
  companyEmail: 'MelindaT@gbxm.com',
  linkedin: 'linkedin.com/in/meltankard',
  teamsId: 'melinda25',
  about: '',
  tradingEntity: '',
  registration: '',
  digitalPresence1: '',
  digitalPresence2: '',
  digitalPresence3: '',
  digitalPresence4: ''
};

@Injectable({ providedIn: 'root' })
export class OperatorProfileStore {
  /** Editable form state (shared across profile routes until reload). */
  readonly draft: OperatorProfileDemo = { ...INITIAL_OPERATOR_PROFILE };

  /** Last submitted snapshot — shown on View all Profiles. */
  submitted: OperatorProfileDemo = { ...INITIAL_OPERATOR_PROFILE };

  submittedPhotoName: string | null = null;
  submittedCvName: string | null = null;

  commitSubmit(photo: File | null, cv: File | null): void {
    Object.assign(this.submitted, this.draft);
    this.submittedPhotoName = photo?.name ?? null;
    this.submittedCvName = cv?.name ?? null;
  }

  resetDraftToInitial(): void {
    Object.assign(this.draft, INITIAL_OPERATOR_PROFILE);
  }
}

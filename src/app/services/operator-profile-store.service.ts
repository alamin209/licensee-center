import { Injectable } from '@angular/core';
import { isPdfFile } from '../utils/file-helpers';

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
  /** Data URL of last submitted profile photo (for Verify / read-only views). */
  submittedPhotoDataUrl: string | null = null;

  /** Portrait preview while editing (before Submit) — surfaced on Verify Operator. */
  draftPhotoDataUrl: string | null = null;
  draftPhotoName: string | null = null;
  draftCvName: string | null = null;
  /** Blob URL for in-session PDF preview (draft CV). */
  draftCvPdfBlobUrl: string | null = null;
  /** Blob URL for PDF preview after profile Submit. */
  submittedCvPdfBlobUrl: string | null = null;

  /** Prefer last submit; fallback to draft pick so uploads show everywhere in-session. */
  get previewPhotoDataUrl(): string | null {
    return this.submittedPhotoDataUrl ?? this.draftPhotoDataUrl ?? null;
  }

  get previewCvName(): string | null {
    return this.submittedCvName ?? this.draftCvName ?? null;
  }

  /** PDF preview blob URL — Word/DOC uploads have no iframe preview here. */
  get previewCvPdfBlobUrl(): string | null {
    return this.submittedCvPdfBlobUrl ?? this.draftCvPdfBlobUrl ?? null;
  }

  syncDraftCvFromFile(file: File | null): void {
    if (this.draftCvPdfBlobUrl) {
      URL.revokeObjectURL(this.draftCvPdfBlobUrl);
      this.draftCvPdfBlobUrl = null;
    }
    if (!file) {
      this.draftCvName = null;
      return;
    }
    this.draftCvName = file.name;
    if (isPdfFile(file)) {
      this.draftCvPdfBlobUrl = URL.createObjectURL(file);
    }
  }

  commitSubmit(photo: File | null, cv: File | null, photoDataUrl: string | null): void {
    Object.assign(this.submitted, this.draft);
    this.submittedPhotoName = photo?.name ?? null;
    if (this.submittedCvPdfBlobUrl) {
      URL.revokeObjectURL(this.submittedCvPdfBlobUrl);
      this.submittedCvPdfBlobUrl = null;
    }
    this.submittedCvName = cv?.name ?? null;
    if (cv && isPdfFile(cv)) {
      this.submittedCvPdfBlobUrl = URL.createObjectURL(cv);
    }
    this.submittedPhotoDataUrl = photoDataUrl;
  }

  resetDraftToInitial(): void {
    Object.assign(this.draft, INITIAL_OPERATOR_PROFILE);
    this.draftPhotoDataUrl = null;
    this.draftPhotoName = null;
    if (this.draftCvPdfBlobUrl) {
      URL.revokeObjectURL(this.draftCvPdfBlobUrl);
      this.draftCvPdfBlobUrl = null;
    }
    this.draftCvName = null;
  }
}

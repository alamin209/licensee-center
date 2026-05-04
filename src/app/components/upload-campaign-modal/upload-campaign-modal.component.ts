import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export interface UploadCampaignModalData {
  campaignName: string;
  campaignNumber: string;
}

@Component({
  selector: 'app-upload-campaign-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './upload-campaign-modal.component.html',
  styleUrl: './upload-campaign-modal.component.scss'
})
export class UploadCampaignModalComponent implements OnInit {
  filename = '';

  constructor(
    public dialogRef: MatDialogRef<UploadCampaignModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UploadCampaignModalData
  ) {}

  ngOnInit(): void {
    // Generate default filename based on data
    this.filename = `${this.data.campaignName}_${this.data.campaignNumber}`;
  }

  onSave(): void {
    this.dialogRef.close({ action: 'save', filename: this.filename });
  }

  onRun(): void {
    this.dialogRef.close({ action: 'run', filename: this.filename });
  }

  onUpload(): void {
    this.dialogRef.close({ action: 'upload', filename: this.filename });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

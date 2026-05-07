import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface ModalField {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  value?: any;
}

export interface ModalData {
  title: string;
  description?: string;
  fields: ModalField[];
}

@Component({
  selector: 'app-reusable-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './reusable-modal.component.html',
  styleUrl: './reusable-modal.component.scss'
})
export class ReusableModalComponent {
  readonly dialogRef = inject(MatDialogRef<ReusableModalComponent>);
  readonly data = inject<ModalData>(MAT_DIALOG_DATA);
  private readonly fb = inject(FormBuilder);

  form: FormGroup;

  constructor() {
    const group: any = {};
    this.data.fields.forEach(field => {
      const validators = field.required ? [Validators.required] : [];
      group[field.name] = [field.value || '', validators];
    });
    this.form = this.fb.group(group);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}

import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FileDropUploadComponent } from '../../components/file-drop-upload/file-drop-upload.component';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, FileDropUploadComponent],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.scss'
})
export class ProfileEditComponent {
  profilePhoto: File | null = null;
  cvFile: File | null = null;
}

import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { OperatorProfileStore } from '../../services/operator-profile-store.service';

@Component({
  selector: 'app-view-all-profiles',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './view-all-profiles.component.html',
  styleUrl: './view-all-profiles.component.scss'
})
export class ViewAllProfilesComponent {
  readonly store = inject(OperatorProfileStore);
}

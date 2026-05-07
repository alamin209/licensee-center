import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-blank-page',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="app-page">
      <mat-card class="blank-card" appearance="outlined">
        <mat-card-content>
          <!-- Content placeholder -->
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .blank-card {
      background: #ffffff;
      border: 1px solid #e0e4e8;
      border-radius: 8px;
      min-height: calc(100vh - 160px);
    }
  `]
})
export class BlankPageComponent {}

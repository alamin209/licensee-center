import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { TopbarComponent } from './components/topbar/topbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TopbarComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app';
  readonly menuService = inject(MenuService);
  private readonly iconRegistry = inject(MatIconRegistry);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  /** Drives `.app-layout.sidebar-open` for the mobile drawer + dimmed overlay. */
  readonly sidebarOpen = toSignal(this.menuService.sidebarOpen$, { initialValue: false });

  constructor() {
    const customIcons = this.menuService.getCustomIcons();

    Object.keys(customIcons).forEach((key) => {
      this.iconRegistry.addSvgIconLiteral(
        key,
        this.sanitizer.bypassSecurityTrustHtml(customIcons[key])
      );
    });

    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.menuService.setSidebarState(false));
  }

  closeSidebar(): void {
    this.menuService.setSidebarState(false);
  }
}

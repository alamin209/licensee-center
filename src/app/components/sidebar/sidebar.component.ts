import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MenuService, MenuItem } from '../../services/menu.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatListModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  readonly menuService = inject(MenuService);
  readonly menuItems: MenuItem[] = this.menuService.getMenu();

  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.syncExpandedGroups();
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.syncExpandedGroups());
  }

  toggleMenu(item: MenuItem): void {
    item.expanded = !item.expanded;
  }

  /** Open any group that contains the current URL so the active row is visible (accordion is 0fr when closed). */
  private syncExpandedGroups(): void {
    const url = this.router.url.split('?')[0];
    for (const item of this.menuItems) {
      if (!item.children?.length) continue;
      const hasActiveChild = item.children.some((c) => {
        if (!c.route || c.route === '#') return false;
        if (url === c.route) return true;
        if (c.linkActiveExact === false && url.startsWith(`${c.route}/`)) return true;
        return false;
      });
      if (hasActiveChild) {
        item.expanded = true;
      }
    }
  }
}

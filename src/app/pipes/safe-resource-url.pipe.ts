import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/** Enables `blob:` PDF URLs on `<iframe>` / `<embed>` bindings (Angular strips them otherwise). */
@Pipe({
  name: 'safeResourceUrl',
  standalone: true
})
export class SafeResourceUrlPipe implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer);

  transform(url: string | null | undefined): SafeResourceUrl | null {
    if (!url) {
      return null;
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

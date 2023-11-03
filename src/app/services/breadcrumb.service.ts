import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  breadcrumbs$: Observable<any[]> = this.breadcrumbsSubject.asObservable();

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const breadcrumbs = this.createBreadcrumbs(this.router.routerState.snapshot.root);
      this.breadcrumbsSubject.next(breadcrumbs);
    });
  }

  private createBreadcrumbs(route: ActivatedRouteSnapshot, url: string = '', breadcrumbs: any[] = []): any[] {
    const children: ActivatedRouteSnapshot[] = route.children;
  
    if (children.length === 0) {
      return breadcrumbs;
    }
  
    for (const child of children) {
      const routeURL: string = child.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
        const paths: string[] = url.split('/');
        for (let i = 0; i < paths.length; i++) {
          const breadcrumbUrl = paths.slice(0, i + 1).join('/');
          const label = paths[i];
          if (label !== '' && !breadcrumbs.find(b => b.url === breadcrumbUrl)) {
            breadcrumbs.push({ label: label, url: breadcrumbUrl });
          }
        }
      }
  
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }
  

}

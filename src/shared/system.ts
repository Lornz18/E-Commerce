import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class System {
  constructor(private authService: AuthService, private router: Router) {}

  init() {
    console.log('System initializing...');
    this.authService.isLoggedIn();
  }

  resolve() {}

  navigateTo(route: string) {
    const currentUrl = this.router.url;
    console.log(`Navigating to ${route} from ${currentUrl}`);
    if (route === '/' && currentUrl === '/') {
      // Refresh the current route
      console.log('Refreshing the home route');
      window.location.reload();
    } else {
      this.router.navigate([route])
    }
  }
}

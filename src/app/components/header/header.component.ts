import { Component, OnInit, OnDestroy } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { System } from '../../../shared/system';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
@Component({
  selector: 'app-header',
  imports: [
    ImageModule,
    InputIcon,
    IconField,
    InputTextModule,
    FormsModule,
    ButtonModule,
    AvatarModule,
    MenuModule,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true,
  providers: [System],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  private isLoginSubscription: any;
  constructor(private system: System, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoginSubscription = this.authService.isLogin$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  ngOnDestroy(): void {
    if (this.isLoginSubscription) {
      this.isLoginSubscription.unsubscribe();
    }
  }

  menuItems = [
    { label: 'Profile', icon: 'pi pi-user', command: () => this.viewProfile() },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      command: () => this.openSettings(),
    },
    { separator: true },
    { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout() },
  ];

  navigateToLogin() {
    this.system.navigateTo('/sign-in');
    /* this.router.navigate(['/sign-in']); */
  }

  navigateToHome() {
    this.system.navigateTo('/');
    /* this.router.navigate(['/sign-in']); */
  }

  viewProfile() {
    console.log('Profile clicked');
    this.system.navigateTo('/profile');
  }

  openSettings() {
    console.log('Settings clicked');
  }

  logout() {
    console.log('Logged out');
    this.authService.logout();
    this.system.navigateTo("/")
  }
}

import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { System } from '../shared/system';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/seller/dashboard/dashboard.component';
import { sellerGuard } from './guards/seller.guard';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'product-item',
    component: ProductItemComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'seller',
    component: DashboardComponent,
    canActivate: [sellerGuard],
  },
];

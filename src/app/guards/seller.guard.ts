import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';

export const sellerGuard: CanActivateFn = (route, state) => {
  console.log('[sellerGuard] Guard function called');
  const authService = inject(AuthService) as AuthService;
  const router = inject(Router);
  const token = authService.getToken();
  let role = '';
  // Accept both JWT and plain role string for dev/testing
  if (token) {
    if (token.includes('.')) {
      // JWT path
      try {
        const parts = token.split('.');
        if (parts.length !== 3) {
          console.log('[sellerGuard] Invalid JWT structure:', token);
          router.navigate(['/sign-in']);
          return false;
        }
        let base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) base64 += '=';
        const decodedPayload = window.atob(base64);
        const payloadObj = JSON.parse(decodedPayload);
        role = (payloadObj.role || '').replace(/\s+/g, '').toLowerCase();
        console.log('[sellerGuard] User role (from JWT):', role);
      } catch (e) {
        console.error('[sellerGuard] Error decoding token or getting role:', e);
        router.navigate(['/sign-in']);
        return false;
      }
    } else {
      // Plain role string or object stringified
      try {
        // Try to parse as JSON
        const parsed = JSON.parse(token);
        console.log('[sellerGuard] Parsed token as JSON:', parsed);
        if (parsed && parsed.role) {
          role = (parsed.role || '').replace(/\s+/g, '').toLowerCase();
          console.log('[sellerGuard] User role (from JSON):', role);
        } else {
          // Fallback: treat token as role string
          role = token.replace(/\s+/g, '').toLowerCase();
          console.log('[sellerGuard] User role (from plain string):', role);
        }
      } catch (err) {
        console.log('[sellerGuard] Error parsing token as JSON:', err, 'Token:', token);
        // Not JSON, treat as plain string
        role = token.replace(/\s+/g, '').toLowerCase();
        console.log('[sellerGuard] User role (from plain string):', role);
      }
    }
  } else {
    console.log('[sellerGuard] No token found, redirecting to sign-in');
    router.navigate(['/sign-in']);
    return false;
  }
  if (role === 'seller') {
    console.log('[sellerGuard] Access granted to seller route');
    return true;
  } else {
    console.log('[sellerGuard] Access denied, redirecting to sign-in');
    router.navigate(['/sign-in']);
    return false;
  }
};

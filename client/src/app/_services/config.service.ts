import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private readonly config = {
    // Development defaults
    adminPassword: 'Lolita1984$',
    apiUrl: 'http://localhost:4200'
  };

  get adminPassword(): string {
    // Check for production override (set by deployment)
    return (window as any).env?.ADMIN_PASSWORD || this.config.adminPassword;
  }

  get apiUrl(): string {
    return (window as any).env?.API_URL || this.config.apiUrl;
  }
}

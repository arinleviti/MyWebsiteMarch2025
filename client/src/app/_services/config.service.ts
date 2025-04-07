import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private readonly config = {
    // Development defaults
    adminPassword: environment.adminPassword,
    apiUrl: environment.urlForAdmin
  };

  get adminPassword(): string {
    // Check for production override (set by deployment)
    return (window as any).env?.ADMIN_PASSWORD || this.config.adminPassword;
  }

  get apiUrl(): string {
    return (window as any).env?.API_URL || this.config.apiUrl;
  }
}

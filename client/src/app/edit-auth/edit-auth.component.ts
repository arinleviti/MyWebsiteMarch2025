import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from '../_services/config.service';

@Component({
  selector: 'app-edit-auth',
  imports: [FormsModule, NgIf],
  templateUrl: './edit-auth.component.html',
  styleUrl: './edit-auth.component.css'
})
export class EditAuthComponent {
 password= '';
 error = false;
  router = inject(Router);
  configService = inject(ConfigService);
 private correctPassword = this.configService.adminPassword;

 verifyPassword() {
    if (this.password === this.correctPassword) {
      sessionStorage.setItem('editAuth', 'true');
      this.router.navigate(['/blogforms']);
    } else {
      this.error = true;
      this.password = '';
    }
}
}

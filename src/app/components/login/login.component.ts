import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username = '';
  password = '';
  error = '';

  constructor(private router: Router) {}

  login() {
    // Credenciales de ejemplo
    if (this.username === 'admin' && this.password === '1234') {
      this.router.navigate(['/panel']);
    } else {
      this.error = 'Credenciales incorrectas';
    }
  }

  logout(event: Event) {
    event.preventDefault();

    this.username = '';
    this.password = '';
    // Redirige al login
    this.router.navigate(['/']);
  }

}

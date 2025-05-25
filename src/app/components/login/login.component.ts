import { UserService } from './../../services/user.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public username = '';
  public password = '';

  constructor(private router: Router, private userService: UserService,
    private alertService: AlertService
  ){}


  login() {
    this.userService.validarUsuario(this.username, this.password).subscribe({
      next: (respuesta) => {
        if(respuesta.Datos === null) {
           this.alertService.alertError('Error en la autenticación');
        }else{
        localStorage.setItem('username', respuesta.Datos.username);
        localStorage.setItem('idUser', String(respuesta.Datos.id));
        this.router.navigate(['/panel']);
        }
        console.log('Mensaje:', respuesta);
      },
      error: (err) => {
        console.error('Error en login:', err);
      }
    });

  }


  logout(event: Event) {
    event.preventDefault();

    this.username = '';
    this.password = '';
    this.router.navigate(['/']);
  }


}

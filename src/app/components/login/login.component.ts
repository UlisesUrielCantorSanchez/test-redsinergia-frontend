import { UserService } from './../../services/user.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public username = '';
  public password = '';

  constructor(private router: Router, private userService: UserService,private alertService: AlertService ){}



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

  createUserModal(): void {
    Swal.fire({
      title: 'Crear cuenta',
      html:
        `<input id="email" class="swal2-input" placeholder="email" inputmode="email">` +
        `<input id="usuario" class="swal2-input" placeholder="usuario" inputmode="text">`+
        `<input id="password" class="swal2-input" placeholder="password" inputmode="password">`,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const email = (document.getElementById('email') as HTMLInputElement).value.trim();
        const user = (document.getElementById('usuario') as HTMLInputElement).value.trim();
        const password = (document.getElementById('password') as HTMLInputElement).value.trim();

        if (!email) {
          Swal.showValidationMessage('El email no puede estar vacío');
          return false;
        }
        if (!user) {
          Swal.showValidationMessage('El usuario no puede estar vacío');
          return false;
        }
        if (!password) {
          Swal.showValidationMessage('El password no puede estar vacío');
          return false;
        }

        return {
           email,
           user,
           password
        };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const { email, user, password } = result.value;
        this.createUser(user, email, password);
      }
    });
  }

  createUser(usuario:string, email : string, password:string): void {
     const user: any = {
    user: usuario,
    email: email,
    password: password
    };
    this.userService.saveUsuario(user).subscribe({
      next: (respuesta) => {
        this.alertService.alertSuccess('Usuario creado correctamente');

      },
      error: (err) => {
        console.error('Error al crear usuario:', err);
        this.alertService.alertError('Error al crear el usuario');
      }
    });
  }

}

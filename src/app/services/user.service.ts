import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

interface Usuario {
  id: number;
  username: string;
  email: string;
  password: string;
  erased: boolean;
}

interface SaveUsuario {
  user: string;
  email: string;
  password: string;
}

interface Respuesta {
  Mensaje: string;
  Datos: Usuario;
  Estatus: any;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

 private apiUrl = `${environment.url_redsinergia}${environment.path}`;

  validarUsuario(username: string, password: string): Observable<Respuesta> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);
     return this.http.get<Respuesta>(`${this.apiUrl}/user/valid`, { params });
  }

  saveUsuario(user : SaveUsuario): Observable<any> {
    return this.http.post<Respuesta>(`${this.apiUrl}/user/save`, user);
  }

}

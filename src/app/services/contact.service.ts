import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

interface Respuesta {
  Mensaje: string;
  Datos: any[];
  Estatus: any;
}

export interface MyContact {
  idAccount: number;
  numberAccount: string;
}

export interface Response<T> {
  Mensaje: string;
  Estatus: any;
  Datos: MyContact[];
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private apiUrl = `${environment.url_redsinergia}${environment.path}`;

  constructor(private http: HttpClient) {}

  getContacts(idUser: number): Observable<Response<MyContact>> {
    const params = new HttpParams().set('idUser', idUser.toString());
    return this.http.get<any>(`${this.apiUrl}/contact`, { params });
  }
}

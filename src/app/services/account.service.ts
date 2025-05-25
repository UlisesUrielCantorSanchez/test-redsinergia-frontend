import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

interface AccountContactDto {
  idUser: number;
  numberAccount: string;
}

export interface MyAccount {
  idAccount: number;
  numberAccount: string;
}

export interface Respuesta<T> {
  Mensaje: string;
  Estatus: any;
  Datos: MyAccount[];
}

export interface Response<T> {
  Mensaje: string;
  Estatus: any;
  Datos: any;
}

export interface Account {
  idUser: number;
  numberAccount: string;
  balance: number;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = `${environment.url_redsinergia}${environment.path}`;

  constructor(private http: HttpClient) {}

  saveAccountContact(data: AccountContactDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/account/save-contact`, data);
  }

  getMyAccount(idUser: number): Observable<Respuesta<MyAccount>> {
    const params = new HttpParams().set('idUser', idUser.toString());
    return this.http.get<any>(`${this.apiUrl}/account/my-account`, { params });
  }

  getMyBalance(idUser: number): Observable<Response<any>> {
    const params = new HttpParams().set('idAcount', idUser.toString());
    return this.http.get<any>(`${this.apiUrl}/account/my-balance`, { params });
  }

   saveAccount(data: Account): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/account/save`, data);
  }

}

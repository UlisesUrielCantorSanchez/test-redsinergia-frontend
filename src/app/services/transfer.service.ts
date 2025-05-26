import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface TransferDto {
  count: number;
  origin: string;
  destination: string;
  amount: number;
  date: string;
  date_format: string;
}

export interface Respuesta<T> {
  Mensaje: string;
  Estatus: any;
  Datos: TransferDto[];
}

export interface GraphTransfers {
  origin: string;
  destination: string;
}

export interface Transfer {
  idAccountOrigin: string;
  idAccountDestination: string;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private apiUrl = `${environment.url_redsinergia}${environment.path}`;

  constructor(private http: HttpClient) {}

  getTransfers(idUser: number): Observable<Respuesta<TransferDto[]>> {
    const params = new HttpParams().set('idUser', idUser.toString());
    return this.http.get<any>(`${this.apiUrl}/transfer/my-transfers`, { params });
  }

  getTransfersTop(idUser: number): Observable<Respuesta<TransferDto[]>> {
    const params = new HttpParams().set('idUser', idUser.toString());
    return this.http.get<any>(`${this.apiUrl}/transfer/my-transfers-top`, { params });
  }

  getGraphTransfers(idAccount: number): Observable<Respuesta<GraphTransfers>> {
    const params = new HttpParams().set('idAccount', idAccount.toString());
    return this.http.get<any>(`${this.apiUrl}/transfer/grafic-transfers`, { params });
  }

  makeTransfer(data:Transfer): Observable<any> {
    return this.http.post(`${this.apiUrl}/transfer/save`, data);
  }

}

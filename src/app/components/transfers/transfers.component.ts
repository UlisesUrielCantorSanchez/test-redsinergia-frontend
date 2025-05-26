import { Account, MyAccount } from './../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { NgSelectModule } from '@ng-select/ng-select';

import { NgChartsModule } from 'ng2-charts';
import { Transfer, TransferDto, TransferService } from '../../services/transfer.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { ContactService, MyContact } from '../../services/contact.service';
import { AccountService } from '../../services/account.service';
import { AlertService } from '../../services/alert.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-transfers',
  imports: [
    NgChartsModule,
    CommonModule,
    FormsModule,
    NgSelectModule,
    RouterModule
  ],
  templateUrl: './transfers.component.html',
  styleUrl: './transfers.component.css'
})
export class TransfersComponent implements OnInit{

  public cuenta: string = '';
  public destinatario: string = '';
  public cantidad: number = 0;

  public transfersTable: TransferDto[] = [];
  public idUser: number = 0;

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };

  public pieChartLabels = [ [], [], '' ];
  public pieChartDatasets = [ {
    data: [0]
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private transferService: TransferService, private contactService: ContactService,
    private accountService : AccountService, private alertService: AlertService,private router: Router
  ) {}

  ngOnInit(): void {
    this.loadIdUser();
    this.loadTransfers();
    this.loadContacts();
    this.loadMyAccount();
  }

  limpiarFormulario() {
   this.selectMyAccount = null;
   this.selectedContact = null;
   this.cantidad = 0;
   this.balance = 0;
  }

  logout(): void {
  localStorage.removeItem('idUser');
  localStorage.removeItem('username');
  this.router.navigate(['/login']);
}

  openAccountNumberModal(): void {
  Swal.fire({
    title: 'Ingrese el número de cuenta',
    input: 'text',
    inputLabel: 'Número de cuenta (8 dígitos)',
    inputPlaceholder: 'Ej: 12345678',
    inputAttributes: {
      maxlength: '8',
      inputmode: 'numeric',
      pattern: '[0-9]*'
    },
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    inputValidator: (value) => {
      if (!value) {
        return 'El número de cuenta no puede estar vacío';
      }
      if (!/^\d{8}$/.test(value)) {
        return 'Debe contener exactamente 8 dígitos numéricos';
      }
      return null;
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const numeroCuenta = result.value;
      console.log(numeroCuenta);

      this.guardarContacto(numeroCuenta);
      window.location.reload();
    }
  });
}

createAccountModal(): void {
  Swal.fire({
    title: 'Crear cuenta',
    html:
      `<input id="numeroCuenta" class="swal2-input" placeholder="Número de cuenta (8 dígitos)" maxlength="8" inputmode="numeric">` +
      `<input id="saldoInicial" class="swal2-input" placeholder="Saldo inicial" inputmode="decimal">`,
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const numeroCuenta = (document.getElementById('numeroCuenta') as HTMLInputElement).value.trim();
      const saldo = (document.getElementById('saldoInicial') as HTMLInputElement).value.trim();

      if (!numeroCuenta) {
        Swal.showValidationMessage('El número de cuenta no puede estar vacío');
        return false;
      }
      if (!/^\d{8}$/.test(numeroCuenta)) {
        Swal.showValidationMessage('El número de cuenta debe tener exactamente 8 dígitos');
        return false;
      }
      if (!saldo || isNaN(Number(saldo))) {
        Swal.showValidationMessage('El saldo debe ser un número válido');
        return false;
      }

      return {
        numberAccount: numeroCuenta,
        balance: Number(saldo)
      };
    }
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      const userId = this.idUser;

      const account: Account = {
        idUser: userId,
        numberAccount: result.value.numberAccount,
        balance: result.value.balance
      };

      this.accountService.saveAccount(account).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Cuenta creada correctamente', 'success');
          window.location.reload();
        },
        error: () => {
          Swal.fire('Error', 'Ocurrió un error al guardar la cuenta', 'error');
        }
      });
    }
  });
}

contacts: MyContact[] = [];
selectedContact: MyContact | null = null;

loadContacts(): void {
    const idUser = this.idUser;
    this.contactService.getContacts(idUser).subscribe({
      next: (response) => {
        this.contacts = response.Datos;
        console.log(this.contacts);
      },
      error: (err) => {
        console.error(err);
      }
    });
}

  myAccounts: MyAccount[] = [];
  selectMyAccount: MyAccount | null = null;

  loadMyAccount(): void {
    const idUser = this.idUser;
    this.accountService.getMyAccount(idUser).subscribe({
      next: (response) => {
        this.myAccounts = response.Datos;
        console.log('Mis cuentas: ', this.myAccounts);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  sendTransfer(){
     const idOrigin = this.selectMyAccount?.idAccount;
     const idDestination = this.selectedContact?.idAccount;

  if (!idOrigin || !idDestination) {
    this.alertService.alertError('Selecciona una cuenta');
    return;
  }
     const transferData : Transfer = {
      idAccountOrigin: String(idOrigin),
      idAccountDestination: String(idDestination),
      amount: this.cantidad
    };
     if (!Number(this.cantidad) || isNaN(Number(this.cantidad)) || Number(this.cantidad) <= 0) {
        this.alertService.alertError('Ingrese una cantidad válida mayor a 0');
        return;
      }
      if((this.cantidad) > 100000){
        this.alertService.alertError('La cantidad a transferir es mayor a $ 100,000.00 MX. ');
        return;
      }
      if(transferData.idAccountOrigin === undefined || transferData.idAccountDestination === undefined){
        this.alertService.alertError('Selecciona una cuenta');
        return;
      }


    this.transferService.makeTransfer(transferData).subscribe({
      next: (response) => {
        if(response.Datos === "Saldo insuficiente en cuenta de origen") {
          this.alertService.alertError('Saldo insuficiente en cuenta de origen');
          return;
        }
        console.log(transferData);
        this.alertService.alertSuccess('Transferencia exitosa');

        setTimeout(() => {
        window.location.reload();
        }, 2000);

      },
      error: (error) => {
        console.error('Error en la transferencia', error);
        this.alertService.alertError('Error en la transferencia');
      }
    });
  }



  loadIdUser(): void {
    const storedId = localStorage.getItem('idUser');
    this.idUser = storedId ? parseInt(storedId, 10) : 0;
  }

  guardarContacto(account :string): void {
    const AccountContactDto = {
      idUser: this.idUser,
      numberAccount: account
    };

    this.accountService.saveAccountContact(AccountContactDto).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }


  loadGraph(idAccountSelect :number) {
  const idAccount = idAccountSelect;
  this.transferService.getGraphTransfers(idAccount).subscribe({
    next: res => {
      const datos = res.Datos;
      console.log(datos);

      const amounts: number[] = [];
      const labels: string[] = [];

      datos.forEach((item: any) => {
        labels.push(item.destination);
        amounts.push(item.amount);
      });

      this.pieChartLabels = labels;
      this.pieChartDatasets = [{ data: amounts }];
    },
    error: err => {
      console.error(err);
    }
  });
  }

  loadTransfers() {
    const storedId = localStorage.getItem('idUser');
    this.idUser = storedId ? parseInt(storedId, 10) : 0;
    const idUser = this.idUser;
    this.transferService.getTransfers(idUser).subscribe({
    next: (response) => {
      this.transfersTable = response.Datos;
    },
    error: (err) => {
      console.error('Error:', err);
    }
    });

  }

  balance: number = 0;

  getBalance(idUser: number) {
  this.accountService.getMyBalance(idUser).subscribe({
    next: (response) => {
    this.balance = response.Datos; // o response.data según tu API
    console.log('Balance recibido:', this.balance);

    },
    error: (error) => {
      console.error('Error al obtener balance', error);
    }

  });

}

  onOpen(event: MouseEvent): void {
  const select = event.target as HTMLSelectElement;
  select.size = 7;
  select.addEventListener('blur', () => (select.size = 0));
  }

}

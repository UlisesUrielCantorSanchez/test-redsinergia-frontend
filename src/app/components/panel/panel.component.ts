import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule} from '@angular/router';
import { TransferDto, TransferService } from '../../services/transfer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountService, MyAccount } from '../../services/account.service';
import { NgChartsModule } from 'ng2-charts';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChartOptions, ChartType } from 'chart.js';


@Component({
  selector: 'app-panel',
  imports: [RouterModule,
            CommonModule,
            FormsModule,
            NgChartsModule,
            NgSelectModule
  ],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent implements OnInit {

  constructor(private router: Router,private transferService : TransferService, private accountService : AccountService) {}

  ngOnInit() {
    this.getUsername();
    this.loadTransfers();
    this.loadMyAccount();
  }

  public username: string = '';
  public transfersTable: TransferDto[] = [];
  public idUser: number = 0;
   public pieChartLabels = [ [], [], '' ];
  public pieChartDatasets = [ {
    data: [0]
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];
   public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };

  logout() {
  localStorage.removeItem('idUser');
  localStorage.removeItem('username');
  this.router.navigate(['/login']);
}

  getUsername() {
    const nombreUsuario = localStorage.getItem('username');
    this.username = nombreUsuario ? nombreUsuario : 'Usuario';
  }

  loadTransfers() {
    const storedId = localStorage.getItem('idUser');
    console.log("valor -> "+  this.selectMyAccount?.numberAccount);
    let numerAccount = this.selectMyAccount?.numberAccount ?? '';//'22100899'

    this.idUser = storedId ? parseInt(storedId, 10) : 0;
    const idUser = this.idUser;
    this.transferService.getTransfersTop(idUser).subscribe({
    next: (response) => {
      this.transfersTable = response.Datos;
      console.log(this.transfersTable);
    },
    error: (err) => {
      console.error('Error:', err);
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

  onOpen(event: MouseEvent): void {
  const select = event.target as HTMLSelectElement;
  select.size = 7;
  select.addEventListener('blur', () => (select.size = 0));
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

}

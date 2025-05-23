import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartOptions } from 'chart.js';



@Component({
  selector: 'app-transfers',
  imports: [
    BrowserModule,

  ],
  templateUrl: './transfers.component.html',
  styleUrl: './transfers.component.css'
})
export class TransfersComponent {

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [ [ 'Download', 'Sales' ], [ 'In', 'Store', 'Sales' ], 'Mail Sales' ];
  public pieChartDatasets = [ {
    data: [ 300, 500, 100 ]
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];



}

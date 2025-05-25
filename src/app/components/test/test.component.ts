import { Component } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-test',
  imports: [
    NgChartsModule
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})

export class TestComponent {

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

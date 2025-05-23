import { Routes } from '@angular/router';
import { PanelComponent } from './components/panel/panel.component';
import { LoginComponent } from './components/login/login.component';
import { TransfersComponent } from './components/transfers/transfers.component';

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'panel', component: PanelComponent},
  {path: 'transfers', component: TransfersComponent}
];

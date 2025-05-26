import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './components/panel/panel.component';
import { LoginComponent } from './components/login/login.component';
import { TransfersComponent } from './components/transfers/transfers.component';
import { NgModule } from '@angular/core';
import { TestComponent } from './components/test/test.component';

export const routes: Routes = [
  { path: '', component: LoginComponent }, // Redirige raíz a login
  { path: 'login', component: LoginComponent },
  { path: 'panel', component: PanelComponent },
  { path: 'transfers', component: TransfersComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

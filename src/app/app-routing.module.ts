import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeradorCpfComponent } from './components/gerador-cpf/gerador-cpf.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'gerador-cpf', component: GeradorCpfComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

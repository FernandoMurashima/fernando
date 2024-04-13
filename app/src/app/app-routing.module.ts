import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { AuthGuardService } from './auth-guard.service';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { IndexComponent } from './index/index.component'; // Importe o IndexComponent aqui
import { AdminComponent } from './admin/admin.component'; // Importe o AdminComponent aqui

export const DEFAULT_ROUTE = '/movie-list';

const routes: Routes = [
  { path: '', component: IndexComponent }, // Rota para o IndexComponent
  { path: 'login', component: LoginComponent },
  { path: 'movie-list', component: MovieListComponent, canActivate: [AuthGuardService] },
  { path: 'movie-details/:id', component: MovieDetailsComponent, canActivate: [AuthGuardService] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardService] }, // Rota para a área de administração
  { path: 'error', component: MovieDetailsComponent },
  // outras rotas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

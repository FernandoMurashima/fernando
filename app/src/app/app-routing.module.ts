import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { AuthGuardService } from './auth-guard.service';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { IndexComponent } from './index/index.component';
import { AdminComponent } from './admin/admin.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component'; // Importe o MovieEditComponent aqui

export const DEFAULT_ROUTE = '/movie-list';

 const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'movie-list', component: MovieListComponent, canActivate: [AuthGuardService] },
  { path: 'movie-details/:id', component: MovieDetailsComponent, canActivate: [AuthGuardService] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardService] },
  { path: 'movie-edit', component: MovieEditComponent }, // Adicione a rota para o MovieEditComponent
  { path: 'error', component: MovieDetailsComponent },
  // outras rotas
]; 




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

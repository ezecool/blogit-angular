import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { ArticulosComponent } from './components/articulos/articulos.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'home'    ,   component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'registro',   component: RegistroComponent },
  { path: 'login'   ,   component: LoginComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'articulos',  component: ArticulosComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

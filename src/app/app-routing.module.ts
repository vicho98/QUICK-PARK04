import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./search/search.module').then((m) => m.SearchPageModule),
  },
  {
    path: 'add',
    loadChildren: () =>
      import('./add/add.module').then((m) => m.AddPageModule),
  },
  {
    path: 'parking',
    loadChildren: () =>
      import('./parking/parking.module').then((m) => m.ParkingPageModule),
  },
  {
    path: 'perfil',
    loadChildren: () =>
      import('./perfil/perfil.module').then((m) => m.PerfilPageModule),
  },
  {
    path: 'terminos',
    loadChildren: () =>
      import('./terminos/terminos.module').then((m) => m.TerminosPageModule),
  },
  {
    path: 'reclamos',
    loadChildren: () =>
      import('./reclamos/reclamos.module').then((m) => m.ReclamosPageModule),
  },
  {
    path: 'reservas',
    loadChildren: () =>
      import('./reservas/reservas.module').then((m) => m.ReservasPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login', // Ruta por defecto
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

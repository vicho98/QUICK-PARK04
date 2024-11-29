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
    path: 'membresia',
    loadChildren: () =>
      import('./membresia/membresia.module').then((m) => m.MembresiaPageModule),
  },
  {
    path: 'pago-simulado',
    loadChildren: () => import('./pago-simulado/pago-simulado.module').then(m => m.PagoSimuladoPageModule),
  },
  {
    path: 'pago-confirmado',
    loadChildren: () => import('./pago-confirmado/pago-confirmado.module').then(m => m.PagoConfirmadoPageModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}





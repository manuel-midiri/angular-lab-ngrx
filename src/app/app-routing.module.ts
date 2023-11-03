import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/guard/auth.guard';

const routes: Routes = [
  {
    path: '', 
    loadChildren: () => import('./modules/samples/samples.module').then(m => m.SamplesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login', 
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

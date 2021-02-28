import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LandmarksComponent } from './components/landmarks/landmarks.component';
import { LoginComponent } from './components/login/login.component';
//import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'landmarks', component: LandmarksComponent, pathMatch: 'full' }, //maybe just redirect to ''
  { path: 'landmarks/:landid', component: LandmarksComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

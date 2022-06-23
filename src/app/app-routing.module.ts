import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeComponent } from './code/code.component';
import { PhoneNumberComponent } from './phone-number/phone-number.component';
import { UsersComponent } from './users/users.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  {
    path: 'phone', component: PhoneNumberComponent
  },
  {
    path: 'code', component: CodeComponent
  },
  {
    path: 'home', component: UsersComponent
  },
  { path: '', redirectTo: '/phone', pathMatch: 'full'
},

  {
    path: 'users', component: UsersComponent
  },
  {
    path: 'detail/:id', component: UserDetailsComponent
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },

  { path: 'home', loadChildren: () => import('./modules/home-page/home-page.module').then(m => m.HomePageModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],


exports: [RouterModule]
})
export class AppRoutingModule { }

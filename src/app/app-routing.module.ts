import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeComponent } from './code/code.component';
import { PhoneNumberComponent } from './phone-number/phone-number.component';
import { UsersComponent } from './users/users.component';

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
  { path: '', redirectTo: '/phone', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

exports: [RouterModule]
})
export class AppRoutingModule { }

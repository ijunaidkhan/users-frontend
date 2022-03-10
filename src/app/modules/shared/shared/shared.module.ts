import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BurgerMenuComponent } from './../../../reuseable/burger-menu/burger-menu.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BurgerMenuComponent
  ],
  imports: [

  CommonModule,
    RouterModule
  ],
  exports: [
    BurgerMenuComponent
  ]
})
export class SharedModule { }

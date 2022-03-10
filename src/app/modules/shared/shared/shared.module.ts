import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BurgerMenuComponent } from './../../../reuseable/burger-menu/burger-menu.component';



@NgModule({
  declarations: [
    BurgerMenuComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BurgerMenuComponent
  ]
})
export class SharedModule { }

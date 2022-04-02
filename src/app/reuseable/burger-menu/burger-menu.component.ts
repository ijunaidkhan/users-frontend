import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-burger-menu',
  templateUrl: './burger-menu.component.html',
  styleUrls: ['./burger-menu.component.scss']
})
export class BurgerMenuComponent implements OnInit {
  @ViewChild('menu') menu!: ElementRef
  @ViewChild('content') content!: ElementRef

  constructor() {}

  ngOnInit(): void {
  }

  openNav(){
    this.menu.nativeElement.style.width = "100%";
  }

  closeNav(){
  this.menu.nativeElement.style.width = "0%"
  }

}

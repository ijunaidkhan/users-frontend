import { Component, OnInit } from '@angular/core';
import { DataService } from './../service/data.service';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.scss'],
})
export class Comp1Component implements OnInit {
  eneteredtext!: string;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  enterText() {
    this.dataService.raiseDataEmitterEvent(this.eneteredtext);
  }
}

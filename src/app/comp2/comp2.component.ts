import { Component, OnInit } from '@angular/core';
import { DataService } from './../service/data.service';

@Component({
  selector: 'app-comp2',
  templateUrl: './comp2.component.html',
  styleUrls: ['./comp2.component.scss'],
})
export class Comp2Component implements OnInit {
  inputText: string | undefined;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.dataEmitter.subscribe((value) => {
      this.inputText = value;
    });
  }
}

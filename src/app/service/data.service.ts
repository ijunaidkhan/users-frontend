import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // dataEmitter = new EventEmitter<string>(); //custom event
  dataEmitter = new Subject<string>(); // with subject

  constructor() {}

  //method to raise event
  raiseDataEmitterEvent(data: string) {
    debugger
    this.dataEmitter.next(data); //receive an argument of data type string
  }
}

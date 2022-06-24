import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchValue: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  //taking value from input
  changeSearchValue(eventData: Event) {
    console.log((<HTMLInputElement>eventData.target).value)
    this.searchValue = (<HTMLInputElement>eventData.target).value; //assigning value to searchValue from html
  }

}

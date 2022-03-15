import { Component, Input, OnInit } from '@angular/core';
import { User } from './../models/user.model';

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./user-details-page.component.scss']
})
export class UserDetailsPageComponent implements OnInit {
  @Input() user!: User
  constructor() { }

  ngOnInit(): void {
  }

}

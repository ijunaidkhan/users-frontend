import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from './../ui-components/create-user/create-user.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openUserForm(){
    this.dialog.open(CreateUserComponent,{
      disableClose: false,
      panelClass: ['create-user-form-overlay', 'action-dialog'],
    });
  }


}

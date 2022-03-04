import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UserService } from './../service/user.service';
import { take, takeUntil } from 'rxjs/operators';
import { ApiResponse } from './../models/response.model';
import { UserList } from './../models/userlist.model';
import { User } from './../models/user.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateUserComponent } from './../ui-components/create-user/create-user.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EditUserComponent } from '../ui-components/edit-user/edit-user.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public userList?: UserList;
  public users$ = this.userService.users$;

  public editUser!: FormGroup
  // public createUser!: FormGroup
  destroy$ = new Subject();

  @ViewChild('editUserDialog')
  editUserDialog!: TemplateRef<any>;


  experiences: any = ['2 Years', '3 Years', '4 Years', '5 Years', 'More than 5 years']
  education: any = ['HSSC', 'SSC', 'Graduation', 'Masters', 'PHD/M.phil', 'Others']
  techStack: any = ['Angular', 'Flutter', 'WordPress', 'QA-Engineer', 'NodeJS', 'React', 'Javascript', 'HTML/CSS', 'BlockChain']


  constructor(private userService: UserService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder) {


    this.editUser = this.formBuilder.group({
      name: new FormControl([null], [Validators.required, Validators.minLength(3)]),
      email: new FormControl([null], [Validators.required, Validators.email]),
      education: new FormControl([null], [Validators.required]),
      experience: new FormControl([null], [Validators.required]),
      phone: new FormControl([null], Validators.required),
      tech: new FormControl([null], Validators.required),
      bio: new FormControl([null], [Validators.required])
    })
  }



  ngOnInit(): void {
    this.getUsers()
  }
  openUserForm(user: User){
    this.dialog.open(this.editUserDialog, {
      disableClose: false,
      panelClass: ['create-user-form-overlay', 'action-dialog'],
      data: {user}
    });
  }

  getUsers() {
    this.userService.getAllUser()
    // .pipe(take(1))
    // .subscribe((result:ApiResponse<UserList>) => {
    //   if(!result.hasErrors()) {
    //     this.userList = result.data;
    //     console.log(this.userList)
    //   }
    // })
  }


  deleteUser(user: User) {
    // debugger
    this.userService.deleteUser(user.id).subscribe((res:ApiResponse<any>)=>{
      if(!res.hasErrors()) {
        this.getUsers();
      }
    })
  }

  updateUser() {
    debugger
    this.userService.editUser(this.editUser.value.id, this.editUser.value).pipe(takeUntil(this.destroy$)).subscribe((res: ApiResponse<any>)=> {
      debugger
      if(!res.hasErrors()) {
        console.log('User created')
        this.close();
       }
      else {
        console.log('something went wrong')
      }
    })


  }

  close(){
    this.dialog.closeAll();
  }

}

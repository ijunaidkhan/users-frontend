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
  public createUser!: FormGroup

  name: any;
  bio: any;
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
       this.createUser = this.formBuilder.group({
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        education: new FormControl('', [Validators.required]),
        // experience: new FormControl('', [Validators.required]),
        phone: new FormControl('', Validators.required),
        tech: new FormControl('', Validators.required),
        bio: new FormControl('', [Validators.required])
      })
  }



  ngOnInit(): void {
    this.getUsers()
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openUserForm(user: User){
    this.dialog.open(this.editUserDialog, {
      disableClose: false,
      panelClass: ['create-user-form-overlay', 'action-dialog'],
      data: {User}
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

  submit() {
    console.log(this.createUser.value);
  }

  createuser() {
    debugger
    const payload: User = {
      name: this.createUser.value.name,
      email: this.createUser.value.email,
      education: this.createUser.value.education,
      experience: this.createUser.value.experience,
      phoneno: this.createUser.value.phone,
      techStack: this.createUser.value.tech,
      bio: this.createUser.value.bio
    }
    debugger
    this.userService.createUser(payload).pipe(takeUntil(this.destroy$)).subscribe((res: ApiResponse<any>)=> {
      if(!res.hasErrors()) {
        console.log('User created')

      }
      else {
        console.log('something went wrong')
      }
    })


  }


  deleteUser(user: User) {
    debugger
    this.userService.deleteUser(user.id).subscribe((res:ApiResponse<any>)=>{
      if(!res.hasErrors()) {
        this.getUsers();
      }
    })
  }

  updateUser(user: User) {
    debugger
    this.userService.editUser(user.id, this.editUser.value).pipe(takeUntil(this.destroy$)).subscribe((res: ApiResponse<any>)=> {
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

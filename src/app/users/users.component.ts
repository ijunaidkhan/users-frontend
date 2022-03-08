import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UserService } from './../service/user.service';
import { take, takeUntil } from 'rxjs/operators';
import { ApiResponse } from './../models/response.model';
import { UserList } from './../models/userlist.model';
import { User } from './../models/user.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateUserComponent } from './../ui-components/create-user/create-user.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subject, BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class UsersComponent implements OnInit {
  private _userForm$ = new BehaviorSubject<any>([]);
  // public userForm$ = this._userForm$.asObservable();

  public userList?: UserList;
  public users$ = this.userService.users$;
  closeResult?: string;

  public editUser!: FormGroup
  public createUser!: FormGroup

  name: any;
  bio: any;
  public limit = 2;
  public page:number;
  public user :any
  // public createUser!: FormGroup
  destroy$ = new Subject();

  // @ViewChild('editUserDialog')
  // editUserDialog!: TemplateRef<any>;


  experiences: any = ['2 Years', '3 Years', '4 Years', '5 Years', 'More than 5 years']
  education: any = ['HSSC', 'SSC', 'Graduation', 'Masters', 'PHD/M.phil', 'Others']
  techStack: any = ['Angular', 'Flutter', 'WordPress', 'QA-Engineer', 'NodeJS', 'React', 'Javascript', 'HTML/CSS', 'BlockChain']


  constructor(private userService: UserService, config: NgbModalConfig, private modalService: NgbModal,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private formBuilder: FormBuilder) {
      this.page = 1;
       this.createUser = this.formBuilder.group({
         id: [null],
        name: [null],
        email: [null],
        education: [null],
        // experience: new FormControl('', [Validators.required]),
        phone: [null],
        tech: [null],
        bio: [null]
      })


      config.backdrop = 'static';
      config.keyboard = false;
  }



  ngOnInit(): void {
    this.getUsers()
  }

  open(ediUserDialog:any, user:User) {
    this.modalService.open(ediUserDialog, { centered: true }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
    this.createUser.setValue({
      id: user.id,
      name: user.name,
      bio: user.bio,
      phone: user.phoneno,
      email: user.email,
      education: user.education,
      tech: user.techStack
    })
  }
  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  openUserForm(user: User){
    this.dialog.open(CreateUserComponent, {
      disableClose: false,
      panelClass: ['create-user-form-overlay', 'action-dialog'],
      data: {User}
    });
  }

  getUsers() {
    this.userService.getAllUser(this.page, this.limit)
    .pipe(takeUntil(this.destroy$))
    .subscribe((result:ApiResponse<UserList>) => {
      if(!result.hasErrors()) {
        this.userList = result.data;
      }
    })
  }

  submit() {
    console.log(this.createUser.value);
  }

  createuser() {
    const payload: User = {
      name: this.createUser.value.name,
      email: this.createUser.value.email,
      education: this.createUser.value.education,
      // experience: this.createUser.value.experience,
      phoneno: this.createUser.value.phone,
      techStack: this.createUser.value.tech,
      bio: this.createUser.value.bio
    }
    this.userService.createUser(payload).pipe(takeUntil(this.destroy$)).subscribe((res: ApiResponse<any>)=> {
      if(!res.hasErrors()) {
        this.toastr.success('User Created!', `User with name ${this.createUser.value.name} is added.`)

      }
      else {
        this.toastr.error('Failed To Create New User', 'Create User');
      }
    })


  }


  deleteUser(user: User) {
    this.userService.deleteUser(user.id).subscribe((res:ApiResponse<any>)=>{
      if(!res.hasErrors()) {
        this.toastr.success('Deleted!', 'User successfully deleted.')
        this.getUsers();
      }
    })
  }


  updateUser() {
    debugger
    this.userService.editUser(this.createUser.value.id, this.createUser.value).pipe(takeUntil(this.destroy$)).subscribe((res: ApiResponse<any>)=> {
      debugger
      if(!res.hasErrors()) {
      this.toastr.success('Updated!', `${this.createUser.value.name} is updated succesfully`)
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
function content(content: any) {
  throw new Error('Function not implemented.');
}


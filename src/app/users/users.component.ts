import { ChangeDetectorRef, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
import { CreateUserService } from './../service/create-user.service';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class UsersComponent implements OnInit {
  defaultUser: User = {
    name : '',
    email: '',
    bio: '',
    phoneno: '',
    techStack: '',
    education: '',
    // captureFileURL: '',
    images: [
      {
        captureFileURL: ''
      }
    ]
  }


  private _userForm$ = new BehaviorSubject<any>([]);
  // public userForm$ = this._userForm$.asObservable();

  public userList?: UserList;
  public users$ = this.userService.users$;
  closeResult?: string;

  public editUser!: FormGroup
  public createUser!: FormGroup
  public file: any;
  name: any;
  bio: any;
  public limit = 2;
  public page:number;
  public user :any
  public urls: any[] = [];
  public imageSrc: any[] = [];



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
    public addUser: CreateUserService,
    private sanitizer: DomSanitizer,
    private cf: ChangeDetectorRef,

    private formBuilder: FormBuilder) {
      this.page = 1;

      this.editUser = this.formBuilder.group({
         id: [null],
        name: [null],
        email: [null],
        education: [null],
        phone: [null],
        tech: [null],
        bio: [null]
      })


      config.backdrop = 'static';
      config.keyboard = false;
  }



  ngOnInit(): void {
    this.getUsers()
    this.initUserForm();
  }

  initUserForm() {
    this.createUser = this.formBuilder.group({
      name: [
        this.defaultUser.name,
        Validators.compose([
          Validators.required
        ])
      ],
      bio: [
        this.defaultUser.bio,
        Validators.compose([
          Validators.required
        ])
      ],
      email: [
        this.defaultUser.email,
        Validators.compose([
          Validators.required
        ])
      ],
      phoneno: [
        this.defaultUser.phoneno,
        Validators.compose([
          Validators.required
        ])
      ],
      techStack: [
        this.defaultUser.techStack,
        Validators.compose([
          Validators.required
        ])
      ],
      education: [
        this.defaultUser.education,
        Validators.compose([
          Validators.required
        ])
      ],
     image: [
        this.defaultUser.images
      ],

    })
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
    this.editUser.setValue({
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

  // onSelectFile(event:any): void {

  //   if (event.target.files && event.target.files[0]) {
  //     this.imageSrc = event.target.files[0];
  //     debugger
  //     // this.createUser.get('image')?.setValue(this.file.name);

  //     if (event.target.files && event.target.files[0]) {
  //       debugger
  //       const reader = new FileReader();
  //       reader.onload = (e: any) => {
  //         debugger
  //         this.createUser.patchValue({
  //           image: this.imageSrc,
  //         });
  //       };
  //       reader.readAsDataURL(event.target.files[0]);
  //     }
  //   }
  // }

//   onSelectFile(event: any) {
//     debugger
//     const file = event.target.files[0] && event.target.files.length
//     this.createUser.patchValue({
//         image: file
//     });
//     const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
//     if (file && allowedMimeTypes.includes(file.type)) {
//         const reader = new FileReader();
//         debugger
//         reader.onload = () => {
//             this.imageSrc.push(reader.result as string)
//         };
//         reader.readAsDataURL(file);
//     }
// }

// onSelectFile(event: any) {
//   debugger
//   this.file = event.target.files && event.target.files.length;
//   if (this.file > 0 && this.file < 5) {
//     let i: number = 0;
//     for (const singlefile of event.target.files) {
//       var reader = new FileReader();
//       reader.readAsDataURL(singlefile);
//       this.urls.push(singlefile);
//       i++;
//       reader.onload = (event) => {
//         debugger
//         const url = (<FileReader>event.target).result as string;
//         this.imageSrc.push(url);
//         if (this.imageSrc.length > 4) {
//           this.imageSrc.pop();
//           this.urls.pop();
//           this.toastr.warning('Maximum No. of files reached', 'File Limit!')
//         }
//       };
//     }
//   }
// }


onSelectFile(event:any) {

  this.file = event.target.files && event.target.files.length;

  // let club = this._clubService.selectedClub;
  // let obj = {
  //   baseUrl: club.baseURL
  // };
  if (this.file == 1) {
    for (const singlefile of event.target.files) {


      var reader = new FileReader();
      reader.readAsDataURL(singlefile);
      this.createUser.get('image')?.setValue(this.file.name);
      this.urls.push(singlefile);
      this.cf.detectChanges();
      reader.onload = (event) => {
        const url = this.sanitizer.bypassSecurityTrustUrl((<FileReader>event.target).result as string);
        this.imageSrc.push(url);
        this.cf.detectChanges();
        if (this.imageSrc.length > 1) {
          this.imageSrc.pop();
          this.urls.pop();
          this.cf.detectChanges();
          this.toastr.error("Only one Image is allowed", "Upload Images");
        }
      };
    }
  } else {
    this.toastr.error("Please Select One Image to Upload", "Upload Image");
  }

}


  submit(user: User) {
    return this.addUser.createUserProfile(user.bio, user.name, user.email, user.phoneno, user.education, user.techStack, this.urls)
  }

  // createuser(user: User) {
    // const payload: User = {
    //   name: this.createUser.value.name,
    //   email: this.createUser.value.email,
    //   education: this.createUser.value.education,
    //   // experience: this.createUser.value.experience,
    //   phoneno: this.createUser.value.phone,
    //   techStack: this.createUser.value.tech,
    //   bio: this.createUser.value.bio
    // }
    // this.userService.createUser(payload).pipe(takeUntil(this.destroy$)).subscribe((res: ApiResponse<any>)=> {
    //   if(!res.hasErrors()) {
    //     this.toastr.success('User Created!', `User with name ${this.createUser.value.name} is added.`)

    //   }
    //   else {
    //     this.toastr.error('Failed To Create New User', 'Create User');
    //   }
    // })


  // }


  deleteUser(user: User) {
    this.userService.deleteUser(user.id).subscribe((res:ApiResponse<any>)=>{
      if(!res.hasErrors()) {
        this.toastr.success('Deleted!', 'User successfully deleted.')
        this.getUsers();
      }
    })
  }


  updateUser() {
    this.userService.editUser(this.editUser.value.id, this.editUser.value).pipe(takeUntil(this.destroy$)).subscribe((res: ApiResponse<any>)=> {
      if(!res.hasErrors()) {
      this.toastr.success('Updated!', `${this.editUser.value.name} is updated succesfully`)
      this.getUsers()
        // this.close();
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


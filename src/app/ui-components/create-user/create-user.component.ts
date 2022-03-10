import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { first, takeUntil } from 'rxjs/operators';
import { User } from './../../models/user.model';
import { UserService } from './../../service/user.service';
import { ApiResponse } from './../../models/response.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { UsersComponent } from './../../users/users.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from "@angular/platform-browser";
import { CreateUserService } from 'src/app/service/create-user.service';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
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


  destroy$ = new Subject();
  public createUser!: FormGroup

  public file: any;
  public urls: any[] = [];
  public imageSrc: any[] = [];

  // public limit = 2;

  experiences: any = ['2 Years', '3 Years', '4 Years', '5 Years', 'More than 5 years']
  education: any = ['HSSC', 'SSC', 'Graduation', 'Masters', 'PHD/M.phil', 'Others']
  techStack: any = ['Angular', 'Flutter', 'WordPress', 'QA-Engineer', 'NodeJS', 'React', 'Javascript', 'HTML/CSS', 'BlockChain']
  constructor(public matDialog: MatDialog,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    public addUser: CreateUserService,
    private router: Router,
    private route: ActivatedRoute) {


     }

  ngOnInit(): void {
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
        this.defaultUser.images,

      ],

    })
  }



  getUser() {
    // const param:any =  {
    //   limit: this.limit
    // }
    // this.userService.getAllUser(1);
  }

  close(){
    this.matDialog.closeAll();
  }

  createuser() {
    debugger
    const payload: User = {
      name: this.createUser.value.name,
      email: this.createUser.value.email,
      education: this.createUser.value.education,
      // experience: this.createUser.value.experience,
      phoneno: this.createUser.value.phone,
      techStack: this.createUser.value.tech,
      bio: this.createUser.value.bio
    }
    debugger
    this.userService.createUser(payload).pipe(takeUntil(this.destroy$)).subscribe((res: ApiResponse<any>)=> {
      if(!res.hasErrors()) {
        this.toastr.success('User Created!', `User with name ${this.createUser.value.name} is added.`)
        this.close()
        this.getUser()
       }
      else {
        console.log('something went wrong')
      }
    })


  }

  submit(user: User) {
    debugger
    return this.addUser.createUserProfile(user.bio, user.name, user.email, user.phoneno, user.education, user.techStack, this.urls)
  }


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
        reader.onload = (event) => {
          const url = this.sanitizer.bypassSecurityTrustUrl((<FileReader>event.target).result as string);
          this.imageSrc.push(url);

          if (this.imageSrc.length > 1) {
            this.imageSrc.pop();
            this.urls.pop();

            this.toastr.error("Only one Image is allowed", "Upload Images");
          }
        };
      }
    } else {
      this.toastr.error("Please Select One Image to Upload", "Upload Image");
    }

  }



  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }


}

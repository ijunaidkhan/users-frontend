import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { first, takeUntil, mergeMap } from 'rxjs/operators';
import { User } from './../../models/user.model';
import { UserService } from './../../service/user.service';
import { ApiResponse } from './../../models/response.model';
import { Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { UsersComponent } from './../../users/users.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from "@angular/platform-browser";
import { CreateUserService } from 'src/app/service/create-user.service';
import { MediaUploadService } from './../../service/media-upload.service';
import { Media } from './../../models/media.model';
import { NgxSpinnerService } from 'ngx-spinner';


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
  public users$ = this.userService.users$;
  private _isLoading:boolean;

  public limit = 2;
  public page!: number;

  experiences: any = ['2 Years', '3 Years', '4 Years', '5 Years', 'More than 5 years']
  education: any = ['HSSC', 'SSC', 'Graduation', 'Masters', 'PHD/M.phil', 'Others']
  techStack: any = ['Angular', 'Flutter', 'WordPress', 'QA-Engineer', 'NodeJS', 'React', 'Javascript', 'HTML/CSS', 'BlockChain']
  constructor(public matDialog: MatDialog,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    public addUser: CreateUserService,
    private router: Router,
    private route: ActivatedRoute,
    public mediaUplaod: MediaUploadService,
    public userService: UserService,
    private spinner: NgxSpinnerService
    ) {
      this.page = 1;
      this._isLoading = false;
      this.getUsers();
     }

     showSpinner() {
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
        this.close()
      }, 5000);
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



  getUsers() {
    if(this._isLoading) return
    this.userService.getAllUser(this.page, this.limit)
  }

  close(){
    this.matDialog.closeAll();
  }

  createuser() {
  this.showSpinner();
    const payload: User = {
      name: this.createUser.value.name,
      email: this.createUser.value.email,
      education: this.createUser.value.education,
      // experience: this.createUser.value.experience,
      phoneno: this.createUser.value.phone,
      techStack: this.createUser.value.tech,
      bio: this.createUser.value.bio
    }

    // return this.userService.createUser(payload)

    debugger
    this.userService.createUser(payload).pipe(takeUntil(this.destroy$)).subscribe((res: ApiResponse<any>)=> {
      if(!res.hasErrors()) {
        this.toastr.success('User Created!', `User with name ${this.createUser.value.name} is added.`)

        this.getUsers()
       }
      else {
        this.toastr.warning(res.errors?.error, 'Error!');
      }
    })


  }

  // submit(user: User) {
  //   debugger
  //   return this.addUser.createUserProfile(user.bio, user.name, user.email, user.phoneno, user.education, user.techStack, this.urls)
  // }

  async createUserProfile(user:User){
    debugger
    this.showSpinner();

    let mapUser = new User();
    mapUser.bio = user.bio;
    mapUser.email = user.email;
    mapUser.name = user.name;
    mapUser.education = user.education;
    mapUser.phoneno = parseInt(user.phoneno);
    mapUser.techStack = user.techStack;
    // mapUser.captureFileURL = '';
    mapUser.images = [];

   let mediaReq: Array<Observable<any>> = []
   debugger

   await this.urls.forEach((file:any)=> {
    mediaReq.push(this.mediaUplaod.uploadMedia('test', file))
  })

  combineLatest(mediaReq).pipe(mergeMap((uploadMedia):any => {
    uploadMedia.forEach((res:ApiResponse<any>) => {
      let media = new Media();
      media.captureFileURL = res.data.url;
      // mapUser.captureFileURL = res.data.url;
      mapUser.images?.push(media);
    })
    return this.userService.createUser(mapUser)
  })).subscribe(() => {
    this.toastr.success('Upload success!', 'User created successfully.')
  });
  // this.matDialog.closeAll();

  this.getUsers()
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

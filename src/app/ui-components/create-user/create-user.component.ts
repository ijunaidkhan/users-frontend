import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { User } from './../../models/user.model';
import { UserService } from './../../service/user.service';
import { ApiResponse } from './../../models/response.model';
import { Subject } from 'rxjs';
import { UsersComponent } from './../../users/users.component';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  destroy$ = new Subject();
  public createUser!: FormGroup

  experiences: any = ['2 Years', '3 Years', '4 Years', '5 Years', 'More than 5 years']
  education: any = ['HSSC', 'SSC', 'Graduation', 'Masters', 'PHD/M.phil', 'Others']
  techStack: any = ['Angular', 'Flutter', 'WordPress', 'QA-Engineer', 'NodeJS', 'React', 'Javascript', 'HTML/CSS', 'BlockChain']
  constructor(public matDialog: MatDialog,
    private formBuilder: FormBuilder,
    private userService: UserService) {
      this.createUser = this.formBuilder.group({
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        education: new FormControl('', [Validators.required]),
        experience: new FormControl('', [Validators.required]),
        phone: new FormControl('', Validators.required),
        tech: new FormControl('', Validators.required),
        bio: new FormControl('', [Validators.required])
      })
     }

  ngOnInit(): void {
  }

  getUser() {
    this.userService.getAllUser();
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
      experience: this.createUser.value.experience,
      phoneno: this.createUser.value.phone,
      techStack: this.createUser.value.tech,
      bio: this.createUser.value.bio
    }
    debugger
    this.userService.createUser(payload).pipe(takeUntil(this.destroy$)).subscribe((res: ApiResponse<any>)=> {
      if(!res.hasErrors()) {
        console.log('User created')
        this.close();
        this.getUser()

      }
      else {
        console.log('something went wrong')
      }
    })


  }
  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }


}

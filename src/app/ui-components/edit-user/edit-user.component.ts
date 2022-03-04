import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from './../../service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from './../../models/user.model';
import { ApiResponse } from './../../models/response.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  public createUser!: FormGroup
  destroy$ = new Subject();

  experiences: any = ['2 Years', '3 Years', '4 Years', '5 Years', 'More than 5 years']
  education: any = ['HSSC', 'SSC', 'Graduation', 'Masters', 'PHD/M.phil', 'Others']
  techStack: any = ['Angular', 'Flutter', 'WordPress', 'QA-Engineer', 'NodeJS', 'React', 'Javascript', 'HTML/CSS', 'BlockChain']
  constructor(public matDialog: MatDialog,
    private formBuilder: FormBuilder,
    private userService: UserService){}

  ngOnInit(): void {
  }

  close(){
    this.matDialog.closeAll();
  }

  editUser() {
    this.userService.editUser(this.createUser.value.id, this.createUser.value).pipe(takeUntil(this.destroy$)).subscribe((res: ApiResponse<any>)=> {
      if(!res.hasErrors()) {
        console.log('User created')
        this.close();
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

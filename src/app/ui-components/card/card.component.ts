import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from './../../service/user.service';
import { ApiResponse } from './../../models/response.model';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() user!:User;
  public editUser!: FormGroup
  destroy$ = new Subject();
  public limit = 2;
  public page!:number;
  education: any = ['HSSC', 'SSC', 'Graduation', 'Masters', 'PHD/M.phil', 'Others']
  techStack: any = ['Angular', 'Flutter', 'WordPress', 'QA-Engineer', 'NodeJS', 'React', 'Javascript', 'HTML/CSS', 'BlockChain']
  closeResult?: string;
  constructor(public userService: UserService,
    config: NgbModalConfig,
    public toastr: ToastrService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder) {
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
  }
  getUsers() {
    this.userService.getAllUser(this.page, this.limit)
    // .pipe(takeUntil(this.destroy$))
    // .subscribe((result:ApiResponse<UserList>) => {
    //   if(!result.hasErrors()) {
    //     this.userList = result.data;
    //   }
    // })
  }


  deleteUser(user: User) {
    this.spinner.show();
    this.userService.deleteUser(user.id).subscribe((res:ApiResponse<any>)=>{
      if(!res.hasErrors()) {
        this.toastr.success('Deleted!', 'User successfully deleted.')
        this.getUsers();
        this.spinner.hide();
      }
    })
  }

  updateUser() {
    this.userService.editUser(this.editUser.value.id, this.editUser.value).pipe(takeUntil(this.destroy$)).subscribe((res: ApiResponse<any>)=> {
      if(!res.hasErrors()) {
      this.toastr.success('Updated!', `${this.editUser.value.name} is updated succesfully`)
      this.getUsers();
        // this.close();
       }
      else {
        console.log('something went wrong')
      }
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

}

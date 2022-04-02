import { Component, OnInit, Input } from '@angular/core';
import { User } from './../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../service/user.service';
import { take } from 'rxjs/operators';
import { ApiResponse } from './../models/response.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
public user!: User;
  // user!: User
  id!: any;
  sub!: any;
  // page!: number;
  // limit!: number;

  constructor(private _Activatedroute:ActivatedRoute,
    private _userService : UserService) {

    }

  ngOnInit(): void {
    this.sub = this._Activatedroute.paramMap.subscribe(params=> {
      console.log(params)
      this.id = params.get('id');
    })
    this.getDetails()

  }

  getDetails() {
    debugger
    this._userService.getUserById(this.id).pipe(take(1))
    .subscribe((result: ApiResponse<User>)=> {
      debugger
      if(!result.hasErrors()) {
        this.user = result.data;
        console.log(this.user)
      }
    })
  }

}

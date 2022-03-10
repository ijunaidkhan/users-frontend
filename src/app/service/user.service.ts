import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from './../models/user.model';
import { UserList } from './../models/userlist.model';
import { HttpClient } from '@angular/common/http';
import { take, tap } from 'rxjs/operators';
import { ApiResponse } from '../models/response.model';
import { ThrowStmt } from '@angular/compiler';
import { BehaviorSubject, Observable } from 'rxjs';

type userApiData = UserList;

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService<userApiData> {
  public limit = 100;
  private _users$ = new BehaviorSubject<Array<User>>([]);
  public readonly users$: Observable<Array<User>>  = this._users$.asObservable();

  constructor( protected http: HttpClient) {
    super(http);
  }

  getAllUser(page: number, limit:number ) {
    page--;
    const param: any = {
      offset: page ? this.limit * page : 0,
      limit: this.limit,
    }
    return this.get('/users/getAllUsers', param).pipe(take(1), tap((result:ApiResponse<userApiData>)=>{
      if(result.hasErrors()) {
        console.log(result?.errors[0]?.error?.message)
      }
      // if(!result.hasErrors()) {

      //   debugger
      //   this._users$.next(result.data?.data)
      //   const ab = this._users$.getValue();
      //   console.log(ab)
      // }
      // else {
      //   console.error(result?.errors[0]?.error?.message)
      // }
    }))
    // .subscribe();

  }

  createUser(payload: User): Observable<ApiResponse<userApiData>> {
    return this.post('/users/createUser', payload).pipe(tap((result:ApiResponse<any>)=>{
      if(!result.hasErrors()){
        const user: Array<User> = this._users$.getValue();
        this._users$.next((<User>result?.data)?.id)
      }
    }));
  }

  editUser(userID: string, user: User): Observable<ApiResponse<userApiData>>{
    return this.put(`/users/updateUser/${userID}`, user);
  }

  deleteUser(id: string): Observable<ApiResponse<any>> {
    return this.delete(`/users/deleteUser/${id}`);
  }
}

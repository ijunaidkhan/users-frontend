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

  private _users$ = new BehaviorSubject<Array<User>>([]);
  public readonly users$: Observable<Array<User>>  = this._users$.asObservable();

  constructor( protected http: HttpClient) {
    super(http);
  }

  getAllUser() {

    return this.get('/users/getAllUsers').pipe(take(1), tap((result:ApiResponse<userApiData>)=>{
      debugger
      if(!result.hasErrors()) {

        this._users$.next(result.data?.data)
        const ab = this._users$.getValue();
        console.log(ab)
      }
      else {
        console.error(result?.errors[0]?.error?.message)
      }
    })).subscribe();
  }

  createUser(payload: User): Observable<ApiResponse<userApiData>> {
    return this.post('/users/createUser', payload).pipe(tap((result:ApiResponse<any>)=>{
      if(!result.hasErrors()){
        const user: Array<User> = this._users$.getValue();
        this._users$.next((<User>result?.data)?.id)
      }
    }));
  }

  editUser(user: User, userID: string): Observable<ApiResponse<userApiData>>{
    return this.post(`/users/updateUser/${userID}`, user);
  }

  deleteUser(id: string): Observable<ApiResponse<any>> {
    // debugger
    return this.delete(`/users/deleteUser/${id}`);
  }
}

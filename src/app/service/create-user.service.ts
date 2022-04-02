import { Injectable } from '@angular/core';
import { User } from './../models/user.model';
import { MediaUploadService } from './media-upload.service';
import { combineLatest, Observable } from 'rxjs';
import { ApiResponse } from './../models/response.model';
import { mergeMap } from 'rxjs/operators';
import { Media } from './../models/media.model';
import { UserService } from './user.service';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class CreateUserService {



  constructor(public mediaUplaod: MediaUploadService, public userService: UserService,
     public toastr: ToastrService) { }

  async createUserProfile(bio: string, name: string, email: string, gender: string, phoneno: string, education: string, techStack: string, image: any){

    let mapUser = new User();
    mapUser.bio = bio;
    mapUser.email = email;
    mapUser.gender = gender;
    mapUser.name = name;
    mapUser.education = education;
    mapUser.phoneno = parseInt(phoneno);
    mapUser.techStack = techStack;
    // mapUser.captureFileURL = '';
    mapUser.images = [];

   let mediaReq: Array<Observable<any>> = []

   await image.forEach((file:any)=> {
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
}





}

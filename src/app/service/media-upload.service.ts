import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { MediaUpload } from './../models/media-upload.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from './../models/response.model';
import { take, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Media } from './../models/media.model';

type uploadMedia = Media
@Injectable({
  providedIn: 'root'
})
export class MediaUploadService extends ApiService<uploadMedia>{

  constructor(protected http: HttpClient,
    protected toastrService: ToastrService) {
    super(http);
  }


  uploadMedia(folderName: string, file:any):Observable<ApiResponse<uploadMedia>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.postMedia(`/media-upload/mediaFiles/${folderName}`, formData).pipe(take(1), tap((result:ApiResponse<uploadMedia>)=>{
      if (result.hasErrors()) {
        this.toastrService.error(result?.errors[0]?.error?.message)
      }
    }))
  }
}

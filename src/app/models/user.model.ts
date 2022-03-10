import { Media } from './media.model';

export class User {

  id?:	string | any;
  name?:	string | any;
  bio?:	string | any;
  email?:	string| any;
  address?:	string | any;
  experience?:	number| any;
  techStack?:	string | any;
  education?:	string | any;
  phoneno?:	string | any;
  images?: Media[] | any;
  // captureFileURL?: string | any;

  // constructor(){
  //   this.id = '';
  //   this.name = '';
  //   this.bio = '';
  //   this.education = '';
  //   this.email = '';
  //   this.experience = 0;
  //   this.image = [];
  //   this.phoneno = 0;
  //   this.techStack = '';
  //   this.address = '';
  // }
}

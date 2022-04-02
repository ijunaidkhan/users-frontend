import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

var config = {
  apiKey: "AIzaSyDJxyJxEIC48HpF3ECTN_YSHcz60l9srIw",
  authDomain: "phone-auth-bf6a1.firebaseapp.com",
  projectId: "phone-auth-bf6a1",
  storageBucket: "phone-auth-bf6a1.appspot.com",
  messagingSenderId: "770079296257",
  appId: "1:770079296257:web:aab075afa8a5c719daa900"
}

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.scss']
})
export class PhoneNumberComponent implements OnInit {

  phoneNumber: any;
  reCaptchaVerifier: any;

  constructor(private router: Router) { }

  ngOnInit() {
    firebase.initializeApp(config)
  }

  getOTP() {
    this.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {size: 'invisible'})
    firebase.auth().signInWithPhoneNumber(this.phoneNumber, this.reCaptchaVerifier)
    .then((confirmationResult)=> {
      localStorage.setItem('verificationId', JSON.stringify(confirmationResult.verificationId))
      console.log(confirmationResult);
    this.router.navigate(['/code'])
    }).catch((error)=> {
      alert(error.message)
      setTimeout(()=>{
        window.location.reload()
      }, 5000)

    })



  }

}

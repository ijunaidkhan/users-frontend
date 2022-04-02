import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent implements OnInit {
  otp!: string;
  verify: any;

  constructor(private router: Router) { }

  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '50px',
      height: '50px',
    }
  }


  ngOnInit(){
    this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}')
    console.log(this.verify)
  }

  onOtpChange(otpCode: any) {
    this.otp = otpCode
    console.log(this.otp)
  }

  handleClick() {
    var credentials = firebase.auth.PhoneAuthProvider.credential(this.verify, this.otp)
    firebase.auth().signInWithCredential(credentials)
    .then((response) => {
      this.router.navigate(['/home'])
      console.log(response)
    }).catch((error) => {
      alert(error.message)
    })
  }


}

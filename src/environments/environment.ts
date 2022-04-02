// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  firebase: {
    apiKey: "AIzaSyDJxyJxEIC48HpF3ECTN_YSHcz60l9srIw",
    authDomain: "phone-auth-bf6a1.firebaseapp.com",
    projectId: "phone-auth-bf6a1",
    storageBucket: "phone-auth-bf6a1.appspot.com",
    messagingSenderId: "770079296257",
    appId: "1:770079296257:web:aab075afa8a5c719daa900"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

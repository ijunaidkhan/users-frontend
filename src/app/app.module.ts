import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './interceptor/interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateUserComponent } from './ui-components/create-user/create-user.component';
import { MatDialogModule } from '@angular/material/dialog'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { EditUserComponent } from './ui-components/edit-user/edit-user.component';
import { PhoneNumberComponent } from './phone-number/phone-number.component';
import { CodeComponent } from './code/code.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { NgOtpInputModule } from  'ng-otp-input';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HeaderComponent,
    FooterComponent,
    CreateUserComponent,
    EditUserComponent,
    PhoneNumberComponent,
    CodeComponent
  ],
  imports: [
    NgOtpInputModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatSliderModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

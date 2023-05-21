import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './shared/components/header/header.component';
import {SharedModule} from "./shared/shared.module";
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginModule} from "./login/login.module";
import {TokenInterceptor} from "./token-interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HomeModule} from "./home/home.module";
import {EditorModule} from "@tinymce/tinymce-angular";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        NgbModule,
        SharedModule,
        AppRoutingModule,
        ReactiveFormsModule,
        LoginModule,
        HomeModule,
        EditorModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

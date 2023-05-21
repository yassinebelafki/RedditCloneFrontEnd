import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import {RouterLink} from "@angular/router";
import { SpinnerComponent } from './components/spinner/spinner.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SpinnerComponent
  ],
    exports: [HeaderComponent, SpinnerComponent],
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class SharedModule { }

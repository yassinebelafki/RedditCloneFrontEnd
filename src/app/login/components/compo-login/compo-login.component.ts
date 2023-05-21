import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegistrationService} from "../../services/registration.service";
import {LoginPayload} from "../../LoginModels/LoginPayload";
import {dateComparator} from "@ng-bootstrap/ng-bootstrap/datepicker/datepicker-tools";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-compo-login',
  templateUrl: './compo-login.component.html',
  styleUrls: ['./compo-login.component.css']
})
export class CompoLoginComponent implements OnInit{

    formGroup:FormGroup;

    loginReq:LoginPayload;

    isloading:boolean;

    isLoginError:boolean;

    constructor(private loginService:RegistrationService,
                private toastr:ToastrService,
                private activeRoute:ActivatedRoute,
                private router:Router) {
    }
  ngOnInit(): void {
    this.formGroup = new FormGroup<any>(
      {
        username: new FormControl('',Validators.required),
        password:new FormControl('',Validators.required)
      }
    );
    this.activeRoute.queryParamMap.subscribe(
      (params)=>{
        if (params.get("registered") == 'true'){
          console.log("success babe ")

          this.toastr.success("Please Check your inbox for activation email activate your account before you Login!"
            ,"Sign Up Successful")
        }
      }
    );
  }


  loginUser() {
      this.isloading = true;
      this.loginReq={
        username:this.formGroup.get("username").value,
        password:this.formGroup.get("password").value
      }

    this.loginService.login(this.loginReq).subscribe(
      (data)=>{
        console.log(data)
        this.isloading=false;
        this.router.navigate(["/"]).then(
          ()=>{
            window.location.reload()
          }
        )
        this.toastr.success("Login Successful")
        console.log("success")

      },error => {
        this.isLoginError=true;
        this.isloading=false;

      }
    )
  }
}

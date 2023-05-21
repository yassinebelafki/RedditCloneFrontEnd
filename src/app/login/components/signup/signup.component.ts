import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SignupPayload} from "../../LoginModels/SignupPayload";
import {RegistrationService} from "../../services/registration.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  signUpForm:FormGroup;

  signupRequest:SignupPayload;
  isloading:boolean;


  constructor(private signupservice:RegistrationService,
              private router:Router,
              private toastr:ToastrService) {
    this.signupRequest= {username:"",email:"",password:""}
  }
  ngOnInit(): void {
    this.signUpForm= new FormGroup<any>(
      {username:new FormControl('',Validators.required),
              email:new FormControl('',[Validators.required,Validators.email]),
              password:new FormControl('',Validators.required)}
    )
  }


  signupUser() {
    this.isloading=true;
    this.signupRequest={username:this.signUpForm.get('username').value
                    ,password:this.signUpForm.get('password').value,
                    email:this.signUpForm.get('email').value}
    this.signupservice.signup(this.signupRequest).subscribe(
      ()=>{
        this.isloading=false;
        this.router.navigate(["/login"],{queryParams:{registered:true}})
      },
      error => {
        this.toastr.error('Registration Failed! Please try again')
      }
    )
  }
}

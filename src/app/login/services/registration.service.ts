import { Injectable } from '@angular/core';
import {SignupPayload} from "../LoginModels/SignupPayload";
import {HttpClient} from "@angular/common/http";
import {LoginPayload} from "../LoginModels/LoginPayload";
import {map, Observable, tap} from "rxjs";
import {LocalStorageService} from "ngx-webstorage";
import {LoginResponsePayload} from "../LoginModels/LoginResponsePayload";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http:HttpClient,
              private localStorage:LocalStorageService) { }

    signup(signupReq:SignupPayload){
      return  this.http.post("http://localhost:8080/api/auth/singup",signupReq, { responseType: 'text' });
    }

  login(loginRequestPayload: LoginPayload):Observable<boolean>{
    return this.http.post<LoginPayload>('http://localhost:8080/api/auth/login', loginRequestPayload)
      .pipe(map((data:LoginResponsePayload) => {
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);
          return  true;
      }
      ));
}

  getJwt() {
    return this.localStorage.retrieve("authenticationToken")
  }

  refreshToken() {
    const refreshTokenReq ={
      refreshToken : this.getRefreshToken(),
      username : this.getUsername()
    }
    return this.http.
    post<LoginResponsePayload>("http://localhost:8080/api/auth/refresh/token",refreshTokenReq)
      .pipe(tap(response => {
        this.localStorage.store("authenticationToken",response.authenticationToken);
        this.localStorage.store("expiresAt",response.expiresAt);

      }))
  }

   getRefreshToken() {
    return this.localStorage.retrieve("refreshToken")


  }

   getUsername() {
    return this.localStorage.retrieve("username")
  }
  islogedin(){
    return (this.getJwt()!=null)
  }

  logout() {
    this.http.get("http://localhost:8080/api/auth/logout").subscribe(
      (success)=>{

      },
      error => {

      }
    )
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
  }
}

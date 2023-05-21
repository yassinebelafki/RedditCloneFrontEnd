import {Component, OnInit} from '@angular/core';
import {RegistrationService} from "../../../login/services/registration.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(private authService:RegistrationService,private route:Router) {
  }
menuToggeled:boolean=false;
  islogedin:boolean=false;

  toggleMenu() {
    if (this.menuToggeled){
      this.menuToggeled=false;
    }
    else {
      this.menuToggeled=true;
    }
  }

  ngOnInit(): void {
    this.islogedin=this.authService.islogedin();
  }
  getUsername(){
    return this.authService.getUsername();
  }

  logout() {
    this.authService.logout();
    this.route.navigateByUrl("/login").then(()=>{
        window.location.reload();
      }
          )
  }
}

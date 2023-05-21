import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SubredditModel} from "../homeModels/SubredditModel";
import {SubredditService} from "../services/subreddit.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-createsubreddit',
  templateUrl: './createsubreddit.component.html',
  styleUrls: ['./createsubreddit.component.css']
})
export class CreatesubredditComponent implements OnInit{
  createSubReddit:FormGroup;
  subredditModel:SubredditModel;
  isloading: boolean=false;


  constructor(private subredditService:SubredditService,private router:Router) {
  }

  ngOnInit(): void {
    this.createSubReddit= new FormGroup<any>(
      {
        subTitle:new FormControl('',Validators.required),
        subDescription:new FormControl('',Validators.required)
      }
    )
  }

  submitSub() {
    this.isloading=true;
      this.subredditModel={
      subRedditName:this.createSubReddit.get("subTitle").value,
        description:this.createSubReddit.get("subDescription").value
      }
      this.subredditService.createNewSubreddit(this.subredditModel).subscribe(
        ()=>{
          console.log("sub created")
          this.isloading=false;
          this.router.navigateByUrl("/subredditList")

        }
      )
  }
}

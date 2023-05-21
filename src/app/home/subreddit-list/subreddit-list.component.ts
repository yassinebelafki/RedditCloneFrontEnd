import {Component, OnInit} from '@angular/core';
import {SubredditModel} from "../homeModels/SubredditModel";
import {SubredditService} from "../services/subreddit.service";

@Component({
  selector: 'app-subreddit-list',
  templateUrl: './subreddit-list.component.html',
  styleUrls: ['./subreddit-list.component.css']
})
export class SubredditListComponent implements OnInit{
  subreddits: Array<SubredditModel>;
  isloading: boolean=false;

  constructor(private subredditService:SubredditService) {
  }
  ngOnInit(): void {
    this.subredditService.getAllSubreddits().subscribe(
      (subs)=>{
        this.subreddits = subs;
      }
    )

  }


}

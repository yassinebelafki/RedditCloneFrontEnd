import {Component, Input, OnInit} from '@angular/core';
import {SubredditModel} from "../homeModels/SubredditModel";
import {HomeServiceService} from "../services/home-service.service";
import {SubredditService} from "../services/subreddit.service";

@Component({
  selector: 'app-subreddit-side-bar',
  templateUrl: './subreddit-side-bar.component.html',
  styleUrls: ['./subreddit-side-bar.component.css']
})
export class SubredditSideBarComponent implements OnInit{

  @Input() subreddits: Array<SubredditModel>;
  constructor(private subService:SubredditService) {
  }
  ngOnInit() {
  }

}

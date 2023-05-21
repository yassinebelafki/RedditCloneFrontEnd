import {Component, OnInit} from '@angular/core';
import {PostModel} from "../homeModels/PostModel";
import {HomeServiceService} from "../services/home-service.service";
import {SubredditService} from "../services/subreddit.service";
import {SubredditModel} from "../homeModels/SubredditModel";
import {concatMap} from "rxjs";


@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit{

  postsList:Array<PostModel>;
  subsList:Array<SubredditModel>;
  constructor(private postService: HomeServiceService,
              private subredditService:SubredditService) {

  }
  ngOnInit(): void {
    this.postService.getAllPosts().pipe(
      concatMap(posts => {
        this.postsList = posts;
        return this.subredditService.getAllSubreddits();
      })
    ).subscribe(
      (subreddits) => {
        if (subreddits.length >= 4) {
          this.subsList = subreddits.splice(0, 3);
        } else {
          this.subsList = subreddits;}
      },
      (error) => {
        console.log(error);
      }
    );
  }


}

import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HomeServiceService} from "../services/home-service.service";
import {CommentsService} from "../services/comments.service";
import {PostModel} from "../homeModels/PostModel";
import {CommentModel} from "../homeModels/CommentModel";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  name: string;
  posts: PostModel[];
  comments: CommentModel[];
  postLength: number;
  commentLength: number;

  constructor(private activatedRoute: ActivatedRoute, private postService: HomeServiceService,
              private commentService: CommentsService) {
    this.name = this.activatedRoute.snapshot.params['username'];

    this.postService.getAllPostsByUser(this.name).subscribe(data => {
      this.posts = data;
      this.postLength = data.length;
    });
    this.commentService.getAllCommentsByUser(this.name).subscribe(data => {
      this.comments = data;
      this.commentLength = data.length;
    });
  }
}

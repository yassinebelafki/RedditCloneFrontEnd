import {Component, Input} from '@angular/core';
import {PostModel} from "../homeModels/PostModel";
import {VoteService} from "../services/vote.service";
import {VoteModel} from "../homeModels/VoteModel";
import {HomeServiceService} from "../services/home-service.service";

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent {

  constructor(private voteService:VoteService,
              private postService:HomeServiceService) {
  }
  isHoveredOnArrowUp:boolean=false;

  isHoveredOnArrowDown:boolean=false;

  @Input() post:PostModel;

  upVote() {
    const myvote:VoteModel={
      postId:this.post.postId,
      voteType:"UPVOTE"
    }
    this.voteService.createMyVote(myvote).subscribe(
      ()=>{
        this.updatePostVote()
      },error => {
        this.updatePostVote()

        console.log("error in vote")
      }
    );
  }

  downVote() {
    const myvote:VoteModel={
      postId:this.post.postId,
      voteType:"DOWNVOTE"
    }
    this.voteService.createMyVote(myvote).subscribe(
      ()=>{
        this.updatePostVote()
      },error => {
        console.log("error in vote")
        this.updatePostVote()

      }
    );

  }

  updatePostVote(){
    this.postService.gtePostById(this.post.postId).subscribe(
      (data)=>{
        this.post=data;
      },error => {
        console.log("fetch error for the post")

      }
    )
  }
}

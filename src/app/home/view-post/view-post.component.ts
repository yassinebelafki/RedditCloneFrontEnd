import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {PostModel} from "../homeModels/PostModel";
import {HomeServiceService} from "../services/home-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {concatMap, throwError} from "rxjs";
import {CommentsService} from "../services/comments.service";
import {CommentModel} from "../homeModels/CommentModel";

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit{
  isHoveredOnArrowUp:boolean=false;

  isHoveredOnArrowDown:boolean=false;

 post:PostModel;
 postId:number;

 commentlist:Array<CommentModel>
  commetText: string;
  isloading: boolean=false;

 constructor(private postService:HomeServiceService,
             private activeRoute:ActivatedRoute,
             private commentService:CommentsService,
             private changeDeteced:ChangeDetectorRef,
             private router:Router) {

 }

  ngOnInit(): void {
   this.isloading=true;
   this.postId=this.activeRoute.snapshot.params['id'];

    this.postService.gtePostById(this.postId).pipe(
      concatMap(post => {
        this.post = post;
        return this.commentService.getCommentsByPost(this.postId);
      })
    ).subscribe(
      (comments) => {
        this.isloading=false;
        this.commentlist = comments;

      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCommentsForPost(){
   this.commentService.getCommentsByPost(this.postId).subscribe(
     (data)=>{
       this.commentlist=data;
     }
   )
  }
  PostComment() {
   const mycomment:CommentModel={
     postId:this.postId,
     text:this.commetText
   }
    this.commentService.createComment(mycomment).subscribe(
      ()=>{
        console.log("comment posted");
          }
      ,error => {
        console.log("err comment")
        this.ngOnInit();
      }
    );
  }
}

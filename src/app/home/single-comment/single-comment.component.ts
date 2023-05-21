import {Component, Input, OnInit} from '@angular/core';
import {CommentModel} from "../homeModels/CommentModel";

@Component({
  selector: 'app-single-comment',
  templateUrl: './single-comment.component.html',
  styleUrls: ['./single-comment.component.css']
})
export class SingleCommentComponent implements OnInit{
  @Input("mycomment") comment:CommentModel;
  ngOnInit(): void {
  }

}

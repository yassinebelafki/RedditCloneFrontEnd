import {Component, Input} from '@angular/core';
import {PostModel} from "../homeModels/PostModel";

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent {
  isHoveredOnArrowUp:boolean=false;

  isHoveredOnArrowDown:boolean=false;

  @Input() post:PostModel;

}

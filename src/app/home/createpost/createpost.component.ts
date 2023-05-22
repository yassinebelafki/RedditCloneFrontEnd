import {Component, OnInit} from '@angular/core';
import {SubredditService} from "../services/subreddit.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SubredditModel} from "../homeModels/SubredditModel";
import {PostModel} from "../homeModels/PostModel";
import {Router} from "@angular/router";
import {HomeServiceService} from "../services/home-service.service";
import {throwError} from "rxjs";
import {LocalStorageService} from "ngx-webstorage";
import {PostCreateReq} from "../homeModels/PostCreateReq";

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit{



  createPostForm: FormGroup;
  postPayload: PostCreateReq;
  subreddits: Array<SubredditModel>;

  constructor(private router: Router, private postService: HomeServiceService,
              private subredditService: SubredditService,private locaStorage:LocalStorageService) {
    this.postPayload = {
      postName: '',
      url: '',
      description: '',
      subredditName: '',
    }
  }

  ngOnInit() {
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      subredditName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
    this.subredditService.getAllSubreddits().subscribe((data) => {
      this.subreddits = data;
    }, error => {
      throwError(error);
    });
  }

  createPost() {
    this.postPayload.postName = this.createPostForm.get('postName').value;
    this.postPayload.subredditName = this.createPostForm.get('subredditName').value;
    this.postPayload.url = this.createPostForm.get('url').value;
    this.postPayload.description = this.createPostForm.get('description').value;

    this.postService.createNewPost(this.postPayload).subscribe((data) => {
      this.router.navigateByUrl('/login')
      console.log("post created success")
    }, error => {
      this.router.navigateByUrl('/');
      console.log("post created error")
    })
  }

  discardPost() {
    this.router.navigateByUrl('/');
  }

}

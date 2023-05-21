import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SubredditSideBarComponent } from './subreddit-side-bar/subreddit-side-bar.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { CreatesubredditComponent } from './createsubreddit/createsubreddit.component';
import {RouterLink} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SubredditListComponent } from './subreddit-list/subreddit-list.component';
import {SharedModule} from "../shared/shared.module";
import {EditorComponent} from "@tinymce/tinymce-angular";
import { ViewPostComponent } from './view-post/view-post.component';
import { SingleCommentComponent } from './single-comment/single-comment.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MainHomeComponent } from './main-home/main-home.component';



@NgModule({
  declarations: [
    AllPostsComponent,
    SinglePostComponent,
    SideBarComponent,
    SubredditSideBarComponent,
    CreatepostComponent,
    CreatesubredditComponent,
    SubredditListComponent,
    ViewPostComponent,
    SingleCommentComponent,
    UserProfileComponent,
    MainHomeComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    SharedModule,
    EditorComponent,
    FormsModule
  ],
  exports :[SinglePostComponent,AllPostsComponent]
})
export class HomeModule { }

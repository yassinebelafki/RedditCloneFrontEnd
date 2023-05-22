import {Component, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

import {HeaderComponent} from "./shared/components/header/header.component";
import {SignupComponent} from "./login/components/signup/signup.component";
import {CompoLoginComponent} from "./login/components/compo-login/compo-login.component";
import {AllPostsComponent} from "./home/all-posts/all-posts.component";
import {SubredditSideBarComponent} from "./home/subreddit-side-bar/subreddit-side-bar.component";
import {CreatepostComponent} from "./home/createpost/createpost.component";
import {CreatesubredditComponent} from "./home/createsubreddit/createsubreddit.component";
import {SubredditListComponent} from "./home/subreddit-list/subreddit-list.component";
import {ViewPostComponent} from "./home/view-post/view-post.component";
import {SingleCommentComponent} from "./home/single-comment/single-comment.component";
import {UserProfileComponent} from "./home/user-profile/user-profile.component";
import {MainHomeComponent} from "./home/main-home/main-home.component";
import {AuthGuard} from "./auth.guard";

const route:Routes=[
{path:"signup",component:SignupComponent},
  {path:"login",component:CompoLoginComponent},
  {path:"createPost",component:CreatepostComponent,canActivate:[AuthGuard]},
  {path:"createSubreddit",component:CreatesubredditComponent,canActivate:[AuthGuard]},
  {path:"subredditList",component:SubredditListComponent,canActivate:[AuthGuard]},
  {path:"viewPost/:id",component:ViewPostComponent,canActivate:[AuthGuard]},
  {path:"userProfile/:username",component:UserProfileComponent,canActivate:[AuthGuard]},
  {path:"logout",component:CompoLoginComponent},
  { path: '', component: AllPostsComponent ,canActivate:[AuthGuard]}


]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(route)
  ],
  exports :[RouterModule]
})
export class AppRoutingModule { }

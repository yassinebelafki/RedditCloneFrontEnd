import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PostModel} from "../homeModels/PostModel";
import {SubredditModel} from "../homeModels/SubredditModel";
import {PostCreateReq} from "../homeModels/PostCreateReq";
import {CommentModel} from "../homeModels/CommentModel";

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {


  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>('http://localhost:8080/api/posts/all');
  }
  createNewPost(postModel:PostCreateReq){
    return this.http.post("http://localhost:8080/api/posts/create",postModel)
  }
  gtePostById(id:number) : Observable<PostModel>{
    return this.http.get<PostModel>("http://localhost:8080/api/posts/"+id)
  }


  getAllPostsByUser(name: string):Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>("http://localhost:8080/api/posts/by-user/"+name)
  }
}

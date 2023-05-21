import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommentModel} from "../homeModels/CommentModel";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http:HttpClient) { }

  getCommentsByPost(id:number):Observable<Array<CommentModel>>{
    return this.http.get<Array<CommentModel>>("http://localhost:8080/api/comments/all/post_id/"+id);
  }

  createComment(mycomment: CommentModel) {
    return this.http.post("http://localhost:8080/api/comments/create",mycomment);
  }

  getAllCommentsByUser(name: string):Observable<Array<CommentModel>> {
    return this.http.get<Array<CommentModel>>("http://localhost:8080/api/comments/all/username/"+name)
  }
}

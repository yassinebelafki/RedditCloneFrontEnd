import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {SubredditModel} from "../homeModels/SubredditModel";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SubredditService {

  constructor(private http:HttpClient) { }

  getAllSubreddits():Observable<Array<SubredditModel>> {
    return this.http.get<Array<SubredditModel>>("http://localhost:8080/api/subreddit/all");
  }

  createNewSubreddit(subModel:SubredditModel){
    return this.http.post("http://localhost:8080/api/subreddit/create",subModel);
  }
}

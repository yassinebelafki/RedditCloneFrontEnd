import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {VoteModel} from "../homeModels/VoteModel";

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http:HttpClient) { }

  createMyVote(vote:VoteModel){
    return  this.http.post("http://localhost:8080/api/votes/create",vote)
  }

}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../../models/Post";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPost() {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }

  getPostId(postId: number) {
    return this.http.get<Post>(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  }

  deletePost(post: Post) {
    return this.http.delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`);
  }

  updatePost(post: Post) {
    return this.http.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, post);
  }

}

import {Component, OnInit} from '@angular/core';
import {Post} from "../../models/Post";
import {PostService} from "../../service/post/post.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  post: Post[] = [];
  constructor(private postService: PostService) {
  }
  ngOnInit(): void {
    this.getPost();
  }
  getPost() {
    this.postService.getPost().subscribe(posts => {
      this.post = posts;
    })
  }

  delete(post: Post)  {
    this.post = this.post.filter(p => p.id !== post.id);
    this.postService.deletePost(post).subscribe();
  }

}

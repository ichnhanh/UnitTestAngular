import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../service/post/post.service";
import {Post} from "../../models/Post";
import {Location} from "@angular/common";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit{

  post !: Post ;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    const id = this.route.snapshot.paramMap.get('id');
    id && this.postService.getPostId(+id).subscribe((post) => this.post = post);

  }

  goBack() {
    this.location.back();
  }


  save() {
    this.postService.updatePost(this.post).subscribe(() => this.goBack());
  }
}

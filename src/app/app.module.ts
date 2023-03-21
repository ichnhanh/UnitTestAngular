import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StrengthPipe } from './Strength/strength.pipe';
import { PostsComponent } from './Component/posts/posts.component';
import {HttpClientModule} from "@angular/common/http";
import { PostComponent } from './Component/post/post.component';
import {RouterLink} from "@angular/router";
import { PostDetailComponent } from './Component/post-detail/post-detail.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    StrengthPipe,
    PostsComponent,
    PostComponent,
    PostDetailComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterLink,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

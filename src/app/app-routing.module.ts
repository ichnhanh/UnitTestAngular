import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PostDetailComponent} from "./Component/post-detail/post-detail.component";
import {PostsComponent} from "./Component/posts/posts.component";

const routes: Routes = [
  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'detail/:id',
    component: PostDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {

}

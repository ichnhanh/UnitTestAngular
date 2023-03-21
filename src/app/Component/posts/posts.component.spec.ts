import {Post} from "../../models/Post";
import {PostsComponent} from "../../Component/posts/posts.component";
import {of} from "rxjs";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {PostService} from "../../service/post/post.service";
import {Component, Input, NO_ERRORS_SCHEMA} from "@angular/core";
import {By} from "@angular/platform-browser";
import {PostComponent} from "../post/post.component";

describe('Posts Component', () => {
  let POST: Post[];
  let component: PostsComponent;
  let mockPostService: any;
  let fixture: ComponentFixture<PostsComponent>;

  beforeEach(() => {
    POST = [
      {
        id: 1,
        body: 'body 1',
        title: 'title 1',
      },
      {
        id: 2,
        body: 'body 2',
        title: 'title 2',
      },
      {
        id: 3,
        body: 'body 3',
        title: 'title 3',
      }
    ];
    mockPostService = jasmine.createSpyObj(['getPost', 'deletePost']);
    TestBed.configureTestingModule({
      declarations: [PostsComponent, PostComponent],
      providers: [
        {
          provide: PostService,
          useValue: mockPostService
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
  });

  it ('should create exact same number of Post Componenet with Posts', () => {
    mockPostService.getPost.and.returnValue(of(POST));
    fixture.detectChanges();
    const postComponentDes = fixture.debugElement.queryAll(By.directive(PostComponent));
    expect(postComponentDes.length).toBe(POST.length);

  });

  it ('should check whether exact post is sending to PostComponent', () => {
    mockPostService.getPost.and.returnValue(of(POST));
    fixture.detectChanges();

    const postComponentDes = fixture.debugElement.queryAll(By.directive(PostComponent));
    for (let i=0 ;i < postComponentDes.length; i++)  {
      let postComponentInstance = postComponentDes[i].componentInstance;

      expect(postComponentInstance.post.title).toEqual(POST[i].title);
    }

  });

  it ('should set posts from the service directly', () => {
    mockPostService.getPost.and.returnValue(of(POST));
    fixture.detectChanges();
    expect(component.post.length).toBe(3);
  });

  it ('should create one post child Element for each post', () =>  {
    //arrange
    mockPostService.getPost.and.returnValue(of(POST));
    fixture.detectChanges();
    const debugElement = fixture.debugElement;

    //act
    const postsElement = debugElement.queryAll(By.css('.posts'));

    //assert
    expect(postsElement.length).toBe(POST.length);


  });

  describe('delete', () =>  {

    beforeEach(() => {
      mockPostService.deletePost.and.returnValue(of(true));
      component.post = POST;
    })

    it ('should delete the selected Post from the posts', () => {
      //arrange

      //act
      component.delete(POST[1]);

      //assert
      expect(component.post.length).toBe(2);

    });

    it ('should call the delete method in Post Service only once', () =>  {
      //arrange
      //act
      component.delete(POST[1]);

      //assert
      expect(mockPostService.deletePost).toHaveBeenCalledTimes(1);

    });

    it ('should delete the actual selected Post in  Posts', () => {
      //arrange

      //act
      component.delete(POST[2]);

      //assert
      for (let p of component.post) {
        expect(p).not.toEqual(POST[2]);
      }
    });

    it ('should call delete method when post component button is clicked', () => {
      spyOn(component, 'delete');
      mockPostService.getPost.and.returnValue(of(POST));
      fixture.detectChanges();

      let postComponentDes = fixture.debugElement.queryAll(By.directive(PostComponent));
      postComponentDes[0].query(By.css('button')).triggerEventHandler('click');

      expect(component.delete).toHaveBeenCalledWith(POST[0]);
    });

    it ('should call the delete method when the delete event is emitted in Post Component', () => {
      //arrange
      spyOn(component, 'delete');
      mockPostService.getPost.and.returnValue(of(POST));
      fixture.detectChanges();

      //act
      let postComponentDes = fixture.debugElement.queryAll(By.directive(PostComponent));
      for (let i = 0; i < postComponentDes.length;  i++) {
        (postComponentDes[i].componentInstance as PostComponent).delete.emit(POST[i]);

        expect(component.delete).toHaveBeenCalledWith(POST[i]);
      }



    });

  });

})

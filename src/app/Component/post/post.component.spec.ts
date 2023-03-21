import {PostComponent} from "./post.component";
import {Post} from "../../models/Post";
import {first} from "rxjs";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('Post Component',() => {
  let fixture: ComponentFixture<PostComponent>;
  let comp: PostComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(PostComponent);
    comp = fixture.componentInstance;
  });

  it ('should create Post Component using TesBed', () => {
    expect(comp).toBeDefined();
  });

  it ('should render the post title in the anchor elememt', () => {
    //arrange
    const post: Post = {id: 1, body: 'body 1', title: 'dsdsd 1' }
    comp.post =  post;
    fixture.detectChanges();

    //act
    const postElement: HTMLElement = fixture.nativeElement;
    const a = postElement.querySelector('a');

    //assert
    expect(a?.textContent).toContain(post.title);

  });

  it ('should render the post title in the anchor elememt using debug element', () => {
    //arrange
    const post: Post = {id: 1, body: 'body 1', title: 'dsdsd 1' }
    comp.post =  post;
    fixture.detectChanges();

    //act
    const postDebugElement = fixture.debugElement;
    const aElement = postDebugElement.query(By.css('a')).nativeElement;

    //assert
    expect(aElement?.textContent).toContain(post.title);

  });

  it ('should raise an event  when the delete  post is clicked', () => {
    //arrange
    const post: Post = {id: 1, body: 'body 1', title: 'dsdsd 1' }
    comp.post =  post;


    //act
    comp.delete.pipe(first()).subscribe((selectedPost) => {
      expect(selectedPost).toEqual(post);
    });

    comp.onDeletePost(new MouseEvent('click'));

    //assert

  })
});

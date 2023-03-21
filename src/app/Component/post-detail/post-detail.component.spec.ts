import {ComponentFixture, TestBed} from "@angular/core/testing";
import {PostDetailComponent} from "./post-detail.component";
import {Location} from "@angular/common";
import {PostService} from "../../service/post/post.service";
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";
import {Post} from "../../models/Post";
import {By} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";

describe('PostDetailComponent',  () => {

  let fixture: ComponentFixture<PostDetailComponent>;
  let mockPostService: jasmine.SpyObj<PostService>;
  beforeEach(() => {
    let mockActivetedRouted = {
      snapshot: {
        paramMap: {
          get: () => {
            return '3';
          }
        }
      }

    };
    mockPostService = jasmine.createSpyObj(['getPostId', 'updatePost']);
    let mockLocation = jasmine.createSpyObj(['back']);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [PostDetailComponent],
      providers: [
        {
        provide: Location,
        useValue: mockLocation
      },
        {
          provide: PostService,
          useValue: mockPostService
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivetedRouted
        }
      ]
    });
    fixture =  TestBed.createComponent(PostDetailComponent);

  });

  it ('should render the  post title in h2  template', () => {
    mockPostService.getPostId.and.returnValues(of({
      id: 1,
      title: 'title 1',
      body: 'body  1'
    } as Post))
    fixture.detectChanges();

    // const element = fixture.debugElement.query(By.css('h2')).nativeElement as HTMLElement; // hoặc dùng nó;
    const element = fixture.nativeElement.querySelector('h2');
    expect(element.textContent).toBe(fixture.componentInstance.post.title);


  });




});

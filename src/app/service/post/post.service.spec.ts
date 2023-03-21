import {HttpClient} from "@angular/common/http";
import {PostService} from "./post.service";
import {of} from "rxjs";
import {TestBed} from "@angular/core/testing";

describe('Post Service()', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let postService: PostService;
  let POST = [
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
  beforeEach(() => {
    let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [PostService, {
        provide: HttpClient,
        useValue: httpClientSpyObj,
      }]
    })
    postService = TestBed.inject(PostService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;

  });

  describe('getPost', () => {
    it('should return expected posts when getPosts is called', (done) => {
      httpClientSpy.get.and.returnValues(of(POST));
      postService.getPost().subscribe({
        next: (post) => {
          expect(post).toEqual(POST);
          done();
        },
        error: () => {
          done.fail;
        },
      });
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });

  });
});



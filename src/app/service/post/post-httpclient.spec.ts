import {PostService} from "./post.service";
import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
describe('postService (HttpClientTestingModule) ', ()=> {

  let postService: PostService;
  let httpTestingController: HttpTestingController;
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
    TestBed.configureTestingModule({
      providers: [PostService],
      imports: [HttpClientTestingModule]
    });
    postService = TestBed.inject(PostService);
    httpTestingController =  TestBed.inject(HttpTestingController);
  });

  it ('getPost()', (done)  => {
    postService.getPost().subscribe((data)=> {
      expect(data).toEqual(POST);
      done();
    });

    const request = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/posts');
    request.flush(POST);

  });

  describe('getPostID', () => {
    it ('should return single post when getpost is called with postId', () => {
      postService.getPostId(1).subscribe();

      const request = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/posts/1');
      expect(request.request.method).toBe('GET');
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  })
});

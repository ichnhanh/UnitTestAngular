import {HttpClient} from "@angular/common/http";
import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

let testUrl = '/data';
interface Data {
  name: string;
}

describe('Http client testing module', () => {
  let httpClient: HttpClient;
  let httpClientController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpClient = TestBed.inject(HttpClient);
    httpClientController = TestBed.inject(HttpTestingController);

  });

  it ('should call the tesurl  with get Request', () => {
    const testData: Data  = {name: 'Ngo Huy Ich'};
    httpClient.get<Data>(testUrl).subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const request = httpClientController.expectOne(testUrl);
    request.flush(testData);

  });

  it ('should  test multiple request', ()  => {
    const testData: Data[] = [{name: 'Ngo XXX'}, {name: 'Huy Ich'}];

    httpClient.get<Data[]>(testUrl).subscribe((data) =>  {
      expect(data.length).toEqual(0);
    })
    httpClient.get<Data[]>(testUrl).subscribe((data) =>  {
      expect(data).toEqual([testData[0]]);
    })
    httpClient.get<Data[]>(testUrl).subscribe((data) =>  {
      expect(data).toEqual(testData);
    });
    const request = httpClientController.match(testUrl);
    request[0].flush([]);
    request[1].flush([testData[0]]);
    request[2].flush(testData);

  })


});

import {LoggerService} from "./logger.service";
import {TestBed} from "@angular/core/testing";

describe('LoggerService', () => {

  let service: LoggerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggerService]
    });
    service = TestBed.inject(LoggerService);
  });

  it ('should not have any messages at starting', () => {
    //arrange
    const count = service.messages.length;

    //assert
    expect(count).toBe(0);

  });

  it  ('should add messages when log is called', () => {
    //act
    service.log('message Ich');

    //assert
    expect(service.messages.length).toBe(1);

  });

  it ('should clear all the messaged when clear is called', () => {
    //arrange
    service.log('Add msg');

    //act
    service.clear();

    //assert
    expect(service.messages.length).toBe(0);

  });


})

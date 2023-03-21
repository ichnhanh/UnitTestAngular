import {CalculatorService} from "./calculator.service";
import {LoggerService} from "../Logger/logger.service";
import {TestBed} from "@angular/core/testing";

function setUp() {
  const mockLoggerService = jasmine.createSpyObj('loggerService', ['log']);
  TestBed.configureTestingModule({
    providers: [
      CalculatorService,
      {
        provide: LoggerService,
        useValue: mockLoggerService
      }
    ]
  });
  const calculator = TestBed.inject(CalculatorService);
  const loggerServiceSpy = TestBed.inject(LoggerService) as jasmine.SpyObj<LoggerService>;
  return {calculator, loggerServiceSpy};
}

describe('CalculatorService', ()  =>  {

  // let mockLoggerService: any ;
  // let loggerServiceSpy: jasmine.SpyObj<LoggerService>;
  // let calculator: CalculatorService;

  it('Should add two number', ()  => {
    //arrange
    const {calculator, loggerServiceSpy} = setUp();

    //act
    let result = calculator.add(2, 3);

    //assert
    expect(result).toBe(5);
    expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1);

  });

  it('Should subtract two number', () => {
    //arrange
    const {calculator, loggerServiceSpy} = setUp();

    //act
    let result = calculator.subtract(2, 1);

    //assert
    expect(result).toBe(1);
    expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1);

  });
})

import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {
  it('create an instance', () => {
    const pipe = new StrengthPipe();
    expect(pipe).toBeTruthy();
  });

  it ('should display weak if 5 value is passed', () => {
    //arrange
    const pipe = new StrengthPipe();

    //assert
    expect(pipe.transform(5)).toBe('5 (weak)');
  });

  it ('should display strong  if 10 value  is passed', () => {
    //arrange
    const pipe = new StrengthPipe();

    //assert
    expect(pipe.transform(10)).toBe('10 (strong)');

  });

  it ('should display strongest  if 20 value  is passed', () => {
    //arrange
    const pipe = new StrengthPipe();

    //assert
    expect(pipe.transform(20)).toBe('20 (strongest)');

  });



});

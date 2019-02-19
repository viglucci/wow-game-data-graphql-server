import matchSorter from 'match-sorter';
import names from 'starwars-names';
import { injectable } from 'inversify';

@injectable()
export default class HelloService {
  public getNames(): Array<string> {
    return names.all;
  }

  public getRandomNames(count?: number): Array<string> {
    if (!count) {
      count = 1;
    }
    return names.random(count);
  }

  public searchNames(term?: string): Array<string> {
    return matchSorter(this.getNames(), term);
  }
}

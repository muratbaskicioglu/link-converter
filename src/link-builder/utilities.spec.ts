import { createQueryString, QueryParams } from './utilities';

describe('utilities', () => {
  describe('createQueryString', () => {
    const queryParams: QueryParams = {
      testParam1: 'testParam1',
      testParam2: 'testParam2',
    };
    const queryString = `?testParam1=${queryParams.testParam1}&testParam2=${queryParams.testParam2}`;

    it('should return correct query string', () => {
      expect(createQueryString(queryParams)).toEqual(queryString);
    });

    it('should remove the properties which has undefined or null value', () => {
      expect(
        createQueryString({
          ...queryParams,
          testParam3: null,
          testParam4: undefined,
        }),
      ).toEqual(queryString);
    });

    it('should return empty string when has not any query param', () => {
      expect(createQueryString({})).toEqual('');
    });
  });
});

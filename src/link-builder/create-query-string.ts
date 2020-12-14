export type QueryParams = {
  [key: string]: any;
};

export function createQueryString(queryParams: QueryParams): string {
  const keys = Object.keys(queryParams);

  keys.forEach((key) => {
    if (queryParams[key] === null || queryParams[key] === undefined) {
      delete queryParams[key];
    }
  });

  return keys.length ? `?${new URLSearchParams(queryParams)}` : '';
}

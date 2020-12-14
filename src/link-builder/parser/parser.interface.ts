export interface Parser<T> {
  canParse(url: URL): boolean;
  parse(url: URL): T;
}

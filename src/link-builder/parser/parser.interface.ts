export interface Parser {
  canParse(url: URL): boolean;
  parse<T>(url: URL): T;
}

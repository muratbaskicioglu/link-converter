export class RequestDto {
  method: string;
  url: string;
  userAgent: string;
  ip: string;
  statusCode: number;

  constructor(
    method: string,
    url: string,
    userAgent: string,
    ip: string,
    statusCode: number,
  ) {
    this.method = method;
    this.url = url;
    this.userAgent = userAgent;
    this.ip = ip;
    this.statusCode = statusCode;
  }
}

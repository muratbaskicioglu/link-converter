import { RequestDto } from './dto/request.dto';

export interface Elasticsearch {
  indexRequest(request: RequestDto);
}

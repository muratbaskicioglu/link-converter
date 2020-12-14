import { RequestDto } from './dto/request.dto';

export interface ElasticsearchService {
  indexRequest(request: RequestDto);
}

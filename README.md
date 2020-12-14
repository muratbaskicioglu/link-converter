# Link Converter

[![Build Status](https://img.shields.io/badge/status-done-yellowgreen)](http://localhost:3000/documentation)

# 🔗 [Live](https://protected-basin-75379.herokuapp.com/documentation)

This service provides you to convert your links to another type of link.
# Features

#### Web URL to Deeplink Converter

`GET` `/web-url-to-deeplink?url=[Your Web URL]`

Use the endpoint to convert your Web URLs to Deeplinks.

#### Deeplink to Web URL Converter

`GET` `/deeplink-to-web-url?url=[Your Deeplink]`

Use the endpoint to convert your Deeplinks to Web URLs.

***Notice**: `GET` method has limited characters by URL length. Might be needed to support `POST` method if reach the limit in some cases.*

## Running on Local Environment

Install dependencies with yarn package manager:

```yarn```

Docker compose to run Elasticsearch and Kibana:

```docker-compose up -d```

Starting application in development mode:

```yarn start --watch```

API documentation can be found at: [`/documentation`](http://localhost:4242/documentation)

### Todos

  - Refactor on link builder module
  - Enhancement on unit testing

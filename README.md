# Link Converter

[![Build Status](https://img.shields.io/badge/status-done-yellowgreen)](http://localhost:3000/documentation)

This service provides you to convert your links to another type of link.

# Features

#### Web URL to Deeplink Converter

`GET` `/web-url-to-deeplink?url=[Your Web URL]`

Use the endpoint to convert your Web URLs to Deeplinks.

#### Deeplink to Web URL Converter

`GET` `/deeplink-to-web-url?url=[Your Deeplink]`

Use the endpoint to convert your Deeplinks to Web URLs.

***Notice**: `GET` method has limited characters by URL length. Might be needed to support `POST` method if reach the limit in some cases.*

See the API documentation for more detail at: `/documentation`

### Todos

  - Refactor on link builder module
  - Enhancement on unit testing


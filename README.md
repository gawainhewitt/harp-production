# harp-production

A playable harp instrument that is accessible to disabled musicians.

### Testing

To run tests `npm test`

At the moment there are no tests for touch functionality as they end up calling `document.elementFromPoint()` and this doesn't exist in JSDOM. Consequently percentage is low.

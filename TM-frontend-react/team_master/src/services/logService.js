import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn:
      "https://9205c1a392e445b38046cc36a656a984@o384146.ingest.sentry.io/5224680",
  });
}

function log(error) {
  //console.error(error);
  Sentry.captureException(error); //log server errors in sentry
}

export default { init, log };

export default (env) => ({
  iam_apikey: env.WATSON_API_KEY,
  url: env.WATSON_API_URL,
  version: env.WATSON_API_VERSION || '2019-07-12',
  disable_ssl: env.WATSON_DISABLE_SSL || true,
  headers: {
    'X-Watson-Learning-Opt-Out': true,
  },
  return_response: true,
});

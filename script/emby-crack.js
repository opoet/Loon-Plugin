function hackEmbyVerifyRes(response, res) {
  response.statusCode = 200;
  response.headers['Content-Type'] = 'application/json';
  response.body = res;
  console.log('Rewrite Emby verify URL response successfully');
}

function processResponse(response) {
  const url = new URL(response.url);
  const urlPath = url.pathname;

  const rewriteRules = {
      '/admin/service/registration/validateDevice': '{"cacheExpirationDays":999,"message":"Device Valid","resultCode":"GOOD"}',
      '/admin/service/registration/validate': '{"featId": "","registered": true,"expDate": "2099-01-01","key": ""}',
      '/admin/service/registration/getStatus': '{planType: "Lifetime", deviceStatus: 0, subscriptions: []}',
      '/admin/service/appstore/register': '{"featId": "","registered": true,"expDate": "2099-01-01","key": ""}',
      '/emby/Plugins/SecurityInfo': '{SupporterKey: "", IsMBSupporter: true}'
  };

  if (rewriteRules.hasOwnProperty(urlPath)) {
      hackEmbyVerifyRes(response, rewriteRules[urlPath]);
  }

  return response;
}

if (typeof $response !== 'undefined') {
  $done(processResponse($response));
} else {
  $done({});
}

/*
  Author: opoet
  Date: 2023-03-26
  Description: Emby crack loon script
*/

function crackEmbyVerifyRes(response, res) {
  response.headers["Content-Type"] = "application/json; charset=utf-8";
  response.status = 200;
  response.body = res;
  console.log("Rewrite Emby verify URL response successfully");
}

function processResponse(response) {
  const { url } = $request;
  const regex = /https?:\/\/mb3admin\.com(\/[^?]+)\?/;
  const match = url.match(regex);

  if (match) {
    const rewriteRules = {
      "/admin/service/registration/validateDevice":
        '{"cacheExpirationDays":999,"message":"Device Valid","resultCode":"GOOD"}',
      "/admin/service/registration/validate":
        '{"featId": "","registered": true,"expDate": "2099-01-01","key": ""}',
      "/admin/service/registration/getStatus":
        '{planType: "Lifetime", deviceStatus: 0, subscriptions: []}',
      "/admin/service/appstore/register":
        '{"featId": "","registered": true,"expDate": "2099-01-01","key": ""}',
      "/emby/Plugins/SecurityInfo": '{SupporterKey: "", IsMBSupporter: true}',
    };

    const urlPath = match[1];

    if (rewriteRules.hasOwnProperty(urlPath)) {
      crackEmbyVerifyRes(response, rewriteRules[urlPath]);
    }
  }
  return response;
}

$done(processResponse($response));

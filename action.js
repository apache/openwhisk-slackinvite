//jshint esversion:6
var request = require("request");
function main({ email, org, slacktoken }) {
  return new Promise((resolve, reject) => {
    request.post({
      url: `https://${org}.slack.com/api/users.admin.invite`,
      form: {
        email: email,
        token: slacktoken,
        set_active: true
      }
    }, (err, httpResponse, body) => {
      if (err) {
        reject({ message: "Error" + err });
      } else {
        body = JSON.parse(body);
        if (body.ok) {
          resolve({
            message: `Success! Check ${email} for an invite from Slack.`
          });
        } else {
          reject({ message: body.error });
        }
      }
    });
  });
}
exports.main = main;

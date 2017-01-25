# openwhisk-slackinvite
Simple webpage for invitations for Apache OpenWhisk Slack Community

Join our Slack https://csantanapr.github.io/openwhisk-slackinvite

Backend is implemented as a serverless action with api gateway route

## Installing

### Deploy action
Configure the `wsk` CLI with authentication and host

Create the action using `wsk` CLI and set default parameters
```
wsk create slackinvite action.js -p org "myslackteam" -p slacktoken "xop-12345..."
```

The org is the Slack team name, usually the hostname from your .slack.com.
The slacktoken is a token for a user with admin access. You can get one from https://api.slack.com/docs/oauth-test-tokens
Recommend creating a bot user with admin to use for invites.

Verify the action by invoking with the `wsk` CLI
```
wsk action invoke slackinvite -p email "user@example.com"
```

The action should do a http call to the slack API using the team host and token, then Slack will send the invite to the email provided.

### Expose action
Create a public url to invoke the action using `wsk` CLI
```
wsk api-experimental create /openwhisk-team /slackinvite GET slackinvite
```
The command will print the new url created
```
ok: created api /slackinvite GET for action slackinvite
https://21ef035.api-gw.mybluemix.net/openwhisk-team/slackinvite
```

Verify the exposed url by invoking using the `curl` CLI or a web browser
```
curl -X GET https://21ef035.api-gw.mybluemix.net/openwhisk-team/slackinvite?email=user@example.com
```

### Update index.html
Edit the line `var actionUrl = "https://...";` and replace the value with your new url that expose your new action.

### Deploy to github-pages
Create a new github repo, then go to settings, and set master branch as github page.
Push the modified `index.html` to the new repo, then your webpage would be accesible from https://$username.github.io/$reponame


License: Apache-2.0

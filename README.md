Aha.io OAuth2 Wrapper for Javascript
----

NPM package for fascilitating the OAuth2 flow for the [AHA.io](https://aha.io) API.

## Getting Started

Install the NPM package.

```bash
$ npm install aha-io-oauth --save
```

Require the package in your application.

```javascript
var AhaOAuthClient = require('aha-io');
```

## Create an App

To start one will need to obtain a client ID and secret. This is done by creating an application in your Aha account at a URL similar to the one below:

https://yourdomain.aha.io/oauth/applications/

## Initialization

The OAuth client is instantiated by passing in the Client ID and Secret (as well as your organizations subdomain) that you generated in the previous step. 

```javascript
let ahaOAuth = new AhaOAuthClient(
    process.env.AHA_CLIENT_ID,
    process.env.AHA_CLIENT_SECRET,
    process.env.AHA_SUBDOMAIN
)
```

## Generating the Auth URL

To start the OAuth process, one needs to generate a link to present to the user that will take them to Aha to authorize 

```javascript
let ahaAuthUrl = ahaOAuth.authorizeUri( 'http://example.com/aha/oauth', {
    responseType: 'code',
    state: `${some-id}`
})
```

## Generating a Token

After the user authenticates and authorizes your application by following the link generated in the previous step, Aha will call your Redirect URI. Below is a simple express app for generating an OAuth token.

```javascript
const express = require('express')
const app = express()
const port = 3000
app.get('/aha/oauth', async (req, res) => {
    const { code, state } = req.query
    await ahaOAuth.authorize({
    	  code: code,
    	  redirectUri: 'http://example.com/aha/oauth'
    })
    const token = ahaOAuth.token()
    // do something with the token
})
app.listen(port, () => console.log(`Examplee app listening on port ${port}!`))
```

Instantiate a new client. Currently the wrapper uses basic HTTP authentication, so this requires a `username`, `password`, your AHA `subdomain` and an optional `options` object. In the options you can pass `{useSubdomain: false}` if you want to use `secure.aha.io` subdomain instead of `your-subdomain.aha.io`.

```javascript
// If you want to specify an API key when creating a client
var client = AhaIO('username', 'password', 'subdomain');
```

You can also use AHA's `secure.aha.io`. The subdomain is *always* required for authentication purposes.

```javascript
var client = AhaIO('username', 'password', 'subdomain', { useSubdomain: false });
```


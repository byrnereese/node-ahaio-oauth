Aha.io API Wrapper
----

NPM package for interacting with the [AHA.io](https://aha.io) API.

A special thanks to Matt McClure ([@mmcc](https://github.com/mmcc)) and Ryan Faerman ([@ryanfaerman](https://github.com/ryanfaerman)). This code was heavily inspired, based on and out-right copied from their (super clean and amazing) Zencoder API wrapper.

### Getting Started

Install the NPM package

    $ npm install aha-io --save

Require the package in your application

    var AhaIo = require('aha-io');

Instantiate a new client. Currently the wrapper uses basic HTTP authentication, so this requires a `username`, `password`, your AHA `subdomain` and an optional `options` object. In the options you can pass `{useSubdomain: false}` if you want to use `secure.aha.io` subdomain instead of `your-subdomain.aha.io`.

    // If you want to specify an API key when creating a client
    var client = AhaIO('username', 'password', 'subdomain');

You can also use AHA's `secure.aha.io`. The subdomain is *always* required for authentication purposes.

    var client = AhaIO('username', 'password', 'subdomain', { useSubdomain: false });

### This is still a work in progress, and pull requests are appreciated

[Routes Implemented](./implemented-routes.md)

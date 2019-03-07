'use strict';

var _ = require('lodash');
var expect = require('chai').expect;
var moment = require('moment');

var AhaOAuthClient = require('../../dist/index').default;

describe('dist/index.js', function() {
   context('constructor', function() {
       it('should correctly build a client', function() {
           let client = new AhaOAuthClient('id','secret','sub');
           expect(client.baseUrl).to.eql('https://sub.aha.io');
           expect(client.client_id).to.eql('id');
           expect(client.client_secret).to.eql('secret');
	   let auth_url = client.authorizeUri('http://example.com', { responseType: 'code', state: 'a:b' });
	   console.log(auth_url);
	   expect(auth_url).to.eql('https');
       });
   })
});

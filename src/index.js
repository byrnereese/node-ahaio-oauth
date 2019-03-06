import axios from 'axios'
import querystring from 'querystring'
import URI from 'urijs'

class AhaOAuthClient {
    constructor(client_id, client_secret, subdomain, options, axiosInstance) {
	this.client_id = client_id
	this.client_secret = client_secret
	this.options = options || { useSubdomain: true, timeout: null }
	this.subdomain = subdomain
	this.requestDefaultHeaders = {}
	if (this.options.useSubdomain === false) {
            this.requestDefaultHeaders['X-AHA-ACCOUNT'] = this.subdomain;
            this.subdomain = 'secure';
	}
	this.baseUrl = `https://${this.subdomain}.aha.io`
	this._axios = axiosInstance || axios.create()
	this._token = undefined
    }

    token (_token) {
	if (arguments.length === 0) { // get
	    return this._token
	}
	const tokenChanged = this._token !== _token
	this._token = _token
    }

    authorizeUri (redirectUri, options = { responseType: 'code', state: '', brandId: '', display: '', prompt: '' }) {
	let authUrl = this.baseUrl + "/oauth/authorize" +
	    "?response_type=" + options.responseType + 
	    "&client_id="   + this.client_id + 
            "&redirect_uri=" + redirectUri + 
            "&state=" + options.state
	console.log("Auth URL is: " + authUrl)
	return authUrl
    }

    request (config) {
	let uri = URI(this.baseUrl)
	if (uri.hostname() === '') {
	    uri = URI(this.baseUrl).path(config.url)
	}
	return this._axios.request({
	    ...config,
	    url: uri.toString()
	})
    }

    post (url, data = undefined, config = {}) {
	return this.request({ ...config, method: 'post', url, data })
    }

    async authorize({ code, redirectUri }, options = {}) {
	let data = querystring.stringify({
	    code: code,
	    client_id: this.client_id,
	    client_secret: this.client_secret,
	    grant_type: 'authorization_code',
	    redirect_uri: redirectUri,
	    ...options })
	const r = await this._axios.request({
	    method: 'post',
	    url: URI(this.baseUrl).path('/oauth/token').toString(),
	    data,
	})
	this.token(r.data.access_token)
    }
    
}

export default AhaOAuthClient

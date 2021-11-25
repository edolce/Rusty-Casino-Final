const OidcSettings = {
    authority: 'https://****/identity',
    client_id: 'myclientid',
    redirect_uri: 'https://localhost:9090/',
    response_type: 'id_token token',
    scope: 'openid profile roles',
    post_logout_redirect_uri: 'https://localhost:9090/'
};

export default OidcSettings

//steam api key: 2A11B273D8DD033654103AAEBE9325B7
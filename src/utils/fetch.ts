const request = ( url: string, params: any = {}, method = 'GET' ) => {
  const options = {
      method
  };
  if ( 'GET' === method ) {
    const query = Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');

    url += query;

  }
  console.log('the url :: ', url);
  return fetch( url, options ).then( response => response.json() );
};

export const get = ( url: string, params: any ) => request( url, params, 'GET' );

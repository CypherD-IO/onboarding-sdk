const request = ( url: string, params:{key:string, value: string}[] = [], method = 'GET' ) => {
  const options = {
      method
  };
  if ( 'GET' === method ) {
    const query = params.map(({ key,value }) => encodeURIComponent(key) + '=' + encodeURIComponent(value))
    .join('&');

    url += query;

  }
  console.log('the url :: ', url);
  return fetch( url, options ).then( response => response.json() );
};

export const get = ( url: string, params: any ) => request( url, params, 'GET' );

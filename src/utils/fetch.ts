declare let globalThis;

export const request = ( url: string, params:{key:string, value: string}[] = [], method = 'GET', body={} ) => {
  const options = {
      method,
      headers: {
        client: 'sdk',
        "Content-type": "application/json; charset=UTF-8",
        "Cyd-Sdk-Key": '123'// globalThis.cypherWalletDetails.appId
      }
  };
  switch(method){
    case 'GET':
      const query = params.map(({ key,value }) => encodeURIComponent(key) + '=' + encodeURIComponent(value)).join('&');
      url += query;
      break;
    case 'POST':
      options['body'] = body;
      break;
  }
  // if ( 'GET' === method ) {
  //   const query = params.map(({ key,value }) => encodeURIComponent(key) + '=' + encodeURIComponent(value))
  //   .join('&');

  //   url += query;

  // }
  console.log('the url :: ', url);
  return fetch( url, options ).then( response => response.json() );
};

export const get = ( url: string, params: any = [] ) => request( url, params, 'GET' );

export const post = (url: string, body: any) => request(url, [], 'POST', body);

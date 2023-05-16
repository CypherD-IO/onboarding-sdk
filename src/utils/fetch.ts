import { ARCH_HOST } from "../constants/server";

declare let globalThis: any;

export const request = ( url: string, params:{key:string, value: string}[] = [], method = 'GET', body={} ) => {
  const {appId} = globalThis.cypherWalletDetails;
  const options = {
      method,
      headers: {
        client: 'sdk:' + appId,
        "Content-type": "application/json; charset=UTF-8",
        "Cyd-Sdk-Key": appId
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
  return fetch( url, options ).then( response => response.json() );
};

export const get = ( url: string, params: any = [] ) => request( `${ARCH_HOST}/${url}`, params, 'GET' );

export const post = (url: string, body: any) => request( `${ARCH_HOST}/${url}`, [], 'POST', body);

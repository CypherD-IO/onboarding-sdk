var sdkScript = document.createElement('script');
sdkScript.id = 'cypher-sdk';
sdkScript.src = 'https://public.cypherd.io/sdk/onboardingsdk.js';
sdkScript.type = 'text/javascript';

var sdkCss =document.createElement('link');
sdkCss.id = 'cypher-sdk-css';
sdkCss.rel = 'stylesheet';
sdkCss.href = 'https://public.cypherd.io/sdk/onboardingsdk.css';

document.head.append(sdkCss);
document.head.append(sdkScript);


// const script = document.createElement("script")
// script.type = "text/javascript"
// script.src = "https://public.cypherd.io/sdk/cypher-sdk.js"
// document.head.appendChild(script)

// eval(script)

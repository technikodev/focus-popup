var url = new URL(window.location.href);
var parsedUrl = url.searchParams.get('url');

/*var iframe = document.createElement('iframe');
iframe.src = iframeUrl;
document.body.appendChild(iframe);*/
var myWindow = window.open(parsedUrl, '', 'menubar=no');
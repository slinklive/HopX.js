# HopX
HopX is a more modern and faster webserver, it has live editing, built-in handling with HTML files &amp; easy-to-use functions

(HopX is no-where near complete and most likely has a v2 coming, but this is it for now)

**Pre-coding requirements**

1) Download hopx.js into your project directory
2) Install handlebars `npm install handlebars`

**Alternatively you can clone the example folder and have a complete working code in minutes, the zip will be uploaded to releases**

**index.js**

```js
const webServer = require("./hopx.js")

webServer.server(YOUR_PORT, (req, res) => {
    // Create a client instance for getting client information
    const client = new webServer.ClientInfo(req)

    // Create your file map to lead to your files

    const fileMap = {
      "/": {
        path: "./index.html",
        data: { title: "Hello friend!", ip: client.ip, agent: client.userAgent }
      },
    };
    // Declare the file map so you can post it later

    const mapping = fileMap[req.url] || {
      path: './404.html',
      data: { title: '404: Not Found' }
    };
    
    // Make events for visiting & getting an error page

    if (req.url in fileMap) {
      webServer.loadEvent(`The IP ${client.ip} visited the page`, req.url);
    } else {
      webServer.loadEvent(`The IP ${client.ip} got an error page`, req.url);
    }

    // Now post your file map to the internet!
    webServer.post(mapping.path, mapping.data, res);
});

```

**index.html**
```html
<title>{{ title }}</title>
<p>Hello, {{ ip }} I welcome your browser, {{ agent }}, we're all like family!<p>

```

**404.html**
```html
<title>{{ title }}</title>
<p>Oh no! This file doesn't exist!</p>
```

I will add more documentation in a bit, this is it for now!

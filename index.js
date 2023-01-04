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

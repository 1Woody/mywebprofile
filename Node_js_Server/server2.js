const http = require('http');
const url = require('url');
const hostname = 'ubiwan.epsevg.upc.edu';
const port = 3002;
http.createServer((req, res) => {
    let q = url.parse(req.url, true);
    let host = q.host;
    let path = q.pathname;
    let search = q.search;
    let search_obj = q.query;
    res.write(`host: ${host}\npath: ${path}\nsearch: ${search}\n`);
    for (let k in search_obj) res.write(`\n${k}: ${search_obj[k]}`);
    res.end();
}).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})
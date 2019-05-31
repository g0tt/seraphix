const http = require('http');
const { JSDOM } = require('jsdom');
const config = require('./config.json');
const jquery = require('jquery');

const options = {
  hostname: config.hostname,
  port: 80,
  path: config.path,
  headers: {
    Authorization: config.auth,
  },
}
http.get(options, res => {
  let html = '';
  res.on('data', line => html += line);
  res.on('end', () => {
    const dom = new JSDOM(html);
    const $ = jquery(dom.window);
    let newsList = [];
    Object.keys(config.target).forEach((category) => {
      const result = $('.student_newslist dl dt strong.' + category).parent().parent().find('dd a');
      result.each((key, item) => {
        const url_split = item.href.split('/');
        console.log(config.target[category]);
        console.log(url_split[url_split.length - 2]);
        console.log(item.text);
        console.log(item.href + '\n');
      });
    });
  });
});

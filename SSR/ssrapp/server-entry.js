export default function renderFullPage(html) {
    return `
      <!doctype html>
      <html>
        <head>
          <title>Redux Universal Example</title>
        </head>
        <body>
          <div id="root">${html}</div>
          <script src="./public/bundle.js"></script>
        </body>
      </html>
      `
}
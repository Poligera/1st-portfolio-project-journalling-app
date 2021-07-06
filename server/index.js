const app = require("./app");

let port = 3000;
app.listen(port, () =>
  console.log(`Server is listening on http://locahost:${port}`)
);

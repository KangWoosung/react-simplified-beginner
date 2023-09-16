// cors-middleware.js
/*
For those who meet the CORS error, you can use this middleware to solve it.
Edit the file pachage.json as follows:


    "dev": "json-server --watch db.json --port 3000 --host 127.0.0.1  --middlewares ./cors-middleware.js"

and then rerun the server.
*/

module.exports = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
};

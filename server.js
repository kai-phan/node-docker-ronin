const ronin = require('ronin-server');
const mocks = require('ronin-mocks');
const db = require('ronin-database');

async function main() {
  try {
    await db.connect(process.env.CONNECTIONSTRING);

    const server = ronin.server({
      port: process.env.SERVER_PORT || 8000,
    });

    server.use('/', mocks.server(server.Router()));
    server.use( '/foo', (req, res) => {
      return res.json({ "foo": "bar" })
    });

    const result = server.start();
    console.log(result);
  } catch (err) {
    console.error(err);
  }
}

main();
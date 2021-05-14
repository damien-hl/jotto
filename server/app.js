const fastify = require("fastify");
const fs = require("fs");

/**
 * @param {import('fastify').FastifyServerOptions} options
 * @returns {import('fastify').FastifyInstance}
 */
const createApp = (options) => {
  /** @type {import('fastify').FastifyInstance} */
  const app = fastify(options);

  app.register(require("fastify-cors"), {
    origin: "http://localhost:3000",
    credentials: true,
  });

  const fileContents = fs.readFileSync("./five-letter-words.json", "utf-8");
  const words = JSON.parse(fileContents);
  const { fiveLetterWords } = words;

  app.get("/", (req, res) => {
    const word =
      fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)];

    res.code(200).send(word);
  });

  return app;
};

module.exports = createApp;

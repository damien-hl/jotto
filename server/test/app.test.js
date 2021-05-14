const request = require("supertest");
const createApp = require("../app.js");

let fastify;

describe("Test server", () => {
    beforeEach(async () => {
        fastify = createApp();
        await fastify.ready();
        global.agent = request.agent(fastify.server);
    });

    afterEach(async () => {
        await fastify.close();
    });

    test("responds with status 200 the GET method", async () => {
        const response = await request(fastify.server).get("/");

        expect(response.statusCode).toBe(200);
    });

    test("response is a five letter word", async () => {
        const response = await request(fastify.server).get("/");

        expect(response.text.length).toBe(5);
    });
});

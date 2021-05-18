module.exports = {
  ...jest.requireActual("../"),
  __esModule: true,
  // TODO: Update return value for Redux / Context implementation
  getSecretWord: jest.fn().mockReturnValue({ type: "mock" }),
};

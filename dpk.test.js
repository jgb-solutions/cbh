const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the partitionKey string when given an event input with a partitionKey property set to a string", () => {
    const event = { partitionKey: "hello world" }

    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(event.partitionKey);
  });

  it("Returns an object when given an event input with a partitionKey property set to an object", () => {
    const event = { partitionKey: { someKey: 'with Value'} }

    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(event.partitionKey);
  });

  it("Returns an encrypted string when given an event object without the partitionKey property", () => {
    const event = { hello: 'world' }

    const trivialKey = deterministicPartitionKey(event);
    expect(typeof trivialKey).toBe('string');
  });

  it("Returns an encrypted string when given an event string", () => {
    const event = "hello"

    const trivialKey = deterministicPartitionKey(event);
    expect(typeof trivialKey).toBe('string');
  });
});

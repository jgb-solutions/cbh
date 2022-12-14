const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    }
  }

  if (candidate) {
    if (typeof candidate !== "string") {
      const data = JSON.stringify(candidate);

      if (data.length > MAX_PARTITION_KEY_LENGTH) {
         candidate = crypto.createHash("sha3-512").update(data).digest("hex");
      }
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }

  return candidate;
};
import { parseJSONAsync } from "./parseJSON.js";

const cache = {};

const parseJSONAsyncWithCache = (json, callback) => {
  const cached = cache[json];

  if (cached) {
    callback(cached.err, cached.result);
    return;
  }

  parseJSONAsync(json, (err, result) => {
    cache[json] = { err, result };
    callback(err, result);
  });
};

export const json = '{"message": "Hello", "to": "World"}';
export const callback = (err, result) => {
  console.log("first result : ", err, result);

  parseJSONAsyncWithCache(json, (err, result) => {
    console.log("second result : ", err, result);
  });

  console.log("second invoke is complete");
};

// parseJSONAsyncWithCache(json, callback);

// console.log("first invoke is complete");
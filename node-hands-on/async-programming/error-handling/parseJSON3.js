import { parseJSONAsync } from "./parseJSON.js";
import { json, callback } from "./parseJSON2.js";

const cache = {}

const parseJSONAsyncWithCache = (json, callback) => {
    const cached = cache[json]

    if(cached){
        setTimeout(() => callback(cached.err, cached.result), 0)
        return
    }

    parseJSONAsync(json, (err, result) => {
        cache[json] = { err, result }
        callback(err, result)
    })
}

parseJSONAsyncWithCache(json, callback)

console.log("first invoke is complete");
function parseJSONSync(json) {
  try {
    return JSON.parse(json);
  } catch (error) {
    console.log("error contain: ", error);
  }
}

export const parseJSONAsync = (json, callback) => {
    try{
        setTimeout(() => {
            callback(JSON.parse(json))
        }, 1000)
    }catch(error){/home/vscode/workspace/node-hands-on/callback/error-handling
        console.log('error contain: ', error)
        callback({})
    }
}

function parseJSONAsync2(json, callback){
    setTimeout(() => {
        try{
            callback(JSON.parse(json))
        }catch(err){
            console.log('error contain: ', err)
        }
    }, 1000)
}

// parseJSONSync("invalid JSON");
const result = parseJSONSync('{"message": "Hello", "to": "World"}')

// console.log(`result = ${JSON.stringify(result)}`)

const callback = result => console.log('parse result ', result)

// result = parseJSONAsync2('invalid json data.', callback)

// console.log(`result = ${JSON.stringify(result)}`)


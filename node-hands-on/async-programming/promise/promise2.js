const json = '{"foo": 1}'
const stringPromise = Promise.resolve(json)

console.log(stringPromise)

const numberPromise = stringPromise.then(str => console.log(str.length))

console.log(stringPromise)

const unrecoveredPromise = Promise.reject(new Error('error')).then(() => 1, err => console.log(err.message))


import {performance} from 'perf_hooks'


const allResolved = Promise.all([
    1,
    Promise.resolve('foo'),
    Promise.resolve(true)
])

allResolved.then(one => console.log(one))

const containsRejected = Promise.all([
    1,
    Promise.resolve('foo'),
    Promise.reject(new Error('error')),
    Promise.resolve(true)
])

containsRejected.then(one => console.log(one))
    .catch(err => console.log(err.message))

console.log(Promise.all([]))

const asyncFunc = () => {
    return new Promise(resolve => setTimeout(resolve, 1000))
}

const start = performance.now()

asyncFunc()
    .then(asyncFunc)
    .then(asyncFunc)
    .then(asyncFunc)
    .then(() => {
        console.log('sequential time required : ', performance.now() - start)
    })

Promise.all([
    asyncFunc(),
    asyncFunc(),
    asyncFunc(),
    asyncFunc()
]).then(() => console.log('sequential time required(all) : ', performance.now() - start))
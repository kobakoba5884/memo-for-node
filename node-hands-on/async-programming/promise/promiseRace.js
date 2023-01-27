
const wait = (time) => {
    return new Promise(resolve => setTimeout(resolve, time))
}

const fulfilledFirst = Promise.race([
    wait(10).then(() => 1),
    wait(30).then(() => 'foo'),
    wait(20).then(() => Promise.reject(new Error('error')))
])

fulfilledFirst.then((one) => console.log('fulfilledFirst', one))

const rejectFirst = Promise.race([
    wait(20).then(() => 1),
    wait(30).then(() => 'foo'),
    wait(10).then(() => Promise.reject(new Error('error')))
])

rejectFirst.catch(err => console.log('rejectFirst', err.message))

const containsNonPromise = Promise.race([
    wait(10).then(() => 1),
    'foo',
    wait(20).then(() => Promise.reject(new Error('error')))
])

containsNonPromise.then(one => console.log('containsNonPromise', one))

const raceWithEmptyArray = Promise.race([])

console.log(raceWithEmptyArray)

const withTimeout = (promise, timeout) => {
    return Promise.race([
        promise,
        new Promise((_, reject) => {
            setTimeout(() => reject(new Error('timeout')), timeout)
        })
    ])
}

const promise = new Promise(resolve => setTimeout(() => resolve(1), 20))

const shouldBeResolved = withTimeout(promise, 30)

const shouldBeRejected = withTimeout(promise, 10)

shouldBeResolved.then(one => console.log('shouldBeResolved', one))
shouldBeRejected.catch(err => console.log('shouldBeRejected', err.message))
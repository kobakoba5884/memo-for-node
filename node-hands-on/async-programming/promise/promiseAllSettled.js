
const allSettled = Promise.allSettled([
    1,
    Promise.resolve('foo'),
    Promise.reject(new Error('error')),
    Promise.resolve(true)
])

allSettled.then((one) => console.log(one))

const NonPromise = Promise.allSettled([])

NonPromise.then(one => console.log(one))

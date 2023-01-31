
const parseJSONAsync = (json) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try{
                resolve(JSON.parse(json))
            }catch(err){
                reject(err)
            }
        }, 1000)
    })
}

const asyncFunc = async (json) => {
    try{
        const result = await parseJSONAsync(json)
        console.log('parse result ', result)
    }catch(err){
        console.log('catching error')
    }
}

const asyncReturnFoo = async () => {
    return 'foo'
}

const asyncThrow = async () => {
    throw new Error('error')
}

const pauseAndResume = async (pausePeriod) => {
    console.log('starting pauseAndResume method')
    await new Promise(resolve => setTimeout(resolve, pausePeriod))
    console.log('resume pauseAndResume')
}

asyncFunc('{"foo": 1}')
asyncFunc('invalid JSON')

console.log(asyncReturnFoo())
asyncThrow().catch(err => console.log(err))

pauseAndResume(1000)
console.log('async function')
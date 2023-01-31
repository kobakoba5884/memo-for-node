import events from 'events'

const createFizzBuzzEventEmitter = (until) => {
    const eventEmitter = new events.EventEmitter()
    process.nextTick(() => _emitFizzBuzz(eventEmitter, until))
    return eventEmitter
}

const _emitFizzBuzz = async (eventEmitter, until) => {
    eventEmitter.emit('start')

    let count = 1

    while(count <= until){
        await new Promise(resolve => setTimeout(resolve, 1000))

        if(count % 15 === 0){
            eventEmitter.emit('FizzBuzz', count)
        }else if(count % 3 === 0){
            eventEmitter.emit('Fizz', count)
        }else if(count % 5 === 0){
            eventEmitter.emit('Buzz', count)
        }
        count++
    }

    eventEmitter.emit('end', eventEmitter)
}

const startListener = () => {
    console.log('start')
}

const fizzListener = (count) => {
    console.log('Fizz : ', count)
}

const buzzListener = (count) => {
    console.log('Buzz : ', count)
}

const fizzBuzzListener = (count) => {
    console.log('fizzBuss : ', count)
}

const endListener = (eventEmitter) => {
    console.log('end')

    eventEmitter.off('start', startListener)
        .off('Fizz', fizzListener)
        .off('Buzz', buzzListener)
        .off('FizzBuzz', fizzBuzzListener)
        .off('end', endListener)
}

createFizzBuzzEventEmitter(0)
    .on('start', startListener)
    .on('Fizz', fizzListener)
    .once('Buzz', buzzListener)
    .on('FizzBuzz', fizzBuzzListener)
    .on('end', endListener)

console.log('----------------------------------')

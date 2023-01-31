import events from 'events'

export class FizzBuzzEventEmitter extends events.EventEmitter{
    start = async (until) => {
        this.emit('start')

        let count = 1

        while(count < until){
            if(count % 15 === 0){
                this.emit('FizzBuzz', count)
            }else if(count % 3 === 0){
                this.emit('Fizz', count)
            }else if(count % 5 === 0){
                this.emit('Buzz', count)
            }
            count++
            await new Promise((resolve) => setTimeout(resolve, 1000))
        }

        this.emit('end', this)
    }
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

new FizzBuzzEventEmitter()
    .on('start', startListener)
    .on('Fizz', fizzListener)
    .once('Buzz', buzzListener)
    .on('FizzBuzz', fizzBuzzListener)
    .on('end', endListener)
    .start(2)
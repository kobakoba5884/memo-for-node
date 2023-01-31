import stream from 'stream'

export class DelayLogStream extends stream.Writable{
    constructor(options){
        super({ objectMode: true, ...options })
    }

    _write = (chunk, _, callback) => {
        console.log('_write()')

        const { message, delay } = chunk

        setTimeout(() => {
            console.log(message)
            callback()
        }, delay)
    }
}

// const delayLogStream = new DelayLogStream()

// delayLogStream.write({message: 'Hi', delay: 0})
// delayLogStream.write({message: 'Hi Hi', delay: 1000})
// delayLogStream.write({message: 'Hi Hi Hi', delay: 100})

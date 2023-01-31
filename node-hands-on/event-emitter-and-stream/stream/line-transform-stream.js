import stream, {} from 'stream'
import { DelayLogStream } from './delay-log-stream.js'
import { HelloReadableStream } from './hello-readable-stream.js'

export class LineTransformStream extends stream.Transform{
    remaining = ''

    constructor(options){
        super({ readableObjectMode: true, ...options })
    }

    _transform = (chunk, _, callback) => {
        console.log('_transform()')
        const lines = (chunk + this.remaining).split(/\n/)

        this.remaining = lines.pop()

        for(const line of lines){
            this.push({message: line, delay: line.length * 100})
        }

        callback()
    }

    _flush = (callback) => {
        console.log('_flush()')

        this.push({
            message: this.remaining,
            delay: this.remaining.length * 100
        })

        callback()
    }
}

const lineTransformStream = new LineTransformStream()

lineTransformStream.on('readable', () => {
    let chunk

    while((chunk = lineTransformStream.read()) !== null){
        console.log(chunk)
    }
})

// lineTransformStream.write('foo\nbar')
// lineTransformStream.write('baz')
// lineTransformStream.write('foo\nfoo\nbaz')
// lineTransformStream.end()

new HelloReadableStream()
    .pipe(new LineTransformStream())
    .pipe(new DelayLogStream())
    .on('finish', () => console.log('completely read'))

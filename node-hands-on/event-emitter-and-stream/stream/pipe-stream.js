import { DelayLogStream } from './delay-log-stream.js'
import { HelloReadableStream } from './hello-readable-stream.js'
import { LineTransformStream } from './line-transform-stream.js'

new HelloReadableStream({ highWaterMark: 0 })
    .pipe(new LineTransformStream({
        writableHighWaterMark: 0,
        readableHighWaterMark: 0
    }))
    .pipe(new DelayLogStream({ highWaterMark: 0 }))
    .on('finish', () => console.log('complete'))

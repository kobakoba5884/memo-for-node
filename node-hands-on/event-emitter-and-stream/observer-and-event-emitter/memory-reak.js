import events from 'events'

const eventNum = 10
const barEventEmitter = new events.EventEmitter()
barEventEmitter.setMaxListeners(eventNum)

for(let i = 0; i < eventNum; i++){
    barEventEmitter.on(`bar`, () => console.log('bar'))
}


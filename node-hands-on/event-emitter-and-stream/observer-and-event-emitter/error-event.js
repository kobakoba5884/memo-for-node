import events from 'events'

try{
    new events.EventEmitter()
        .emit('error', new Error('error'))
}catch(err){
    console.log(err.message)
}
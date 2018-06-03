const EventEmitter = require('events');

let emitter = new EventEmitter();

// emitter.on('myEvent', function sth () {
//   emitter.on('myEvent', sth);
//   console.log('hi');
// });
// emitter.emit('myEvent');

// let emitter = new EventEmitter();
// var a = 0;
// emitter.on('myEvent', () => {
//   // console.log('hi');
//   a++;
//   console.log(a)
//   emitter.emit('myEvent');
// });
emitter.on('myEvent', function sth () {
  emitter.on('myEvent', sth);
  console.log('hi');
});

emitter.emit('myEvent');

emitter.emit('myEvent');
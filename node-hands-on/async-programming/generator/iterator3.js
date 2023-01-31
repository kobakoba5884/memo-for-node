import { asyncWithGeneratorFunc, generatorFunc, handleAsyncWithGenerator } from "./basic-generator.js";

const asyncWithGenerator1 = asyncWithGeneratorFunc('{"foo": 1}');

const promise1 = asyncWithGenerator1.next().value;

promise1.then((result) => {
  asyncWithGenerator1.next(result);
  console.log(result);
});

const generator = generatorFunc();

console.log(generator.next());

const asyncWithGenerator2 = asyncWithGeneratorFunc('invalid JSON')

const promise2 = asyncWithGenerator2.next().value

promise2.catch(err => asyncWithGenerator2.throw(err))

console.log('-------------------------------------')

handleAsyncWithGenerator(asyncWithGeneratorFunc('{"foo": 1}'))

handleAsyncWithGenerator(asyncWithGeneratorFunc('invalid JSON'))



import {
  resetableGeneratorFunc,
  generatorArgsFunc,
  tryCatchGeneratorFunc,
} from "./basic-generator.js";

const resetableGenerator = resetableGeneratorFunc();

console.log(resetableGenerator.next());
console.log(resetableGenerator.next());
console.log(resetableGenerator.next());
console.log(resetableGenerator.next(true));
console.log(resetableGenerator.next());
console.log(resetableGenerator.next());

console.log("-----------------------------------");

const iterator = generatorArgsFunc();
console.log(iterator.next());
console.log(iterator.next(10));
console.log(iterator.next(20));
console.log(iterator.next(30));

console.log("-----------------------------------");

const tryCatchGenerator = tryCatchGeneratorFunc();

console.log(tryCatchGenerator.next());
console.log(tryCatchGenerator.throw(new Error("error")));
console.log(tryCatchGenerator.next());

try{
    console.log(tryCatchGenerator.throw(new Error("error")));
}catch(err){
    console.log('catch err out of generator')
}

console.log("-----------------------------------");

const iterator2 = generatorArgsFunc();
console.log(iterator2.next());
console.log(iterator2.next());
console.log(iterator2.next());
console.log(iterator2.next());

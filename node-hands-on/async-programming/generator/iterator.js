import { generatorFunc } from "./basic-generator.js";

const generator = generatorFunc()

const iterator = generator[Symbol.iterator]()

for(let value of iterator){
    console.log(value)
}

console.log(generator === iterator)

const array = [1, 2, 3]

const arrayIterator = array[Symbol.iterator]()

for(let value of arrayIterator){
    console.log(value)
}

for(let value of array){
    console.log(value)
}

array.forEach(i => console.log(i))


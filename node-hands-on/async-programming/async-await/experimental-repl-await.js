const asyncIterable = {
  [Symbol.asyncIterator]() {
    let i = 0;

    return {
      next() {
        if (i > 3) {
          return Promise.resolve({ done: true });
        }
        return new Promise((resolve) =>
          setTimeout(() => {
            resolve({ value: i++, done: false });
          }, 1000)
        );
      },
    };
  },
};

async function* asyncGenerator(){
    let i = 0

    while(i <= 3){
        await new Promise(resolve => setTimeout(resolve, 100))
        yield i++
    }
}

for await (const element of asyncIterable){
    console.log(element)
}

for await (const element of asyncGenerator()){
    console.log(element)
}
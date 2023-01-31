export function* generatorFunc() {
  console.log("start generator function");
  console.log("yield 1");
  yield 1;
  console.log("yield 2");
  yield 2;
  console.log("yield 3");
  yield 3;
  console.log("stop generator function");
  return "end generator function";
}

export function* generatorArgsFunc() {
  let a = yield 1;
  let b = yield 2;
  let c = yield 3;
  console.log(a, b, c);
}

export function* resetableGeneratorFunc() {
  let count = 0;
  while (true) {
    if (yield count++) {
      count = 0;
    }
  }
}

export function* tryCatchGeneratorFunc() {
  try {
    yield 1;
  } catch (err) {
    console.log("catching error", err);
    yield 2;
  }
}

const parseJSONAsync = (json) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(JSON.parse(json));
      } catch (err) {
        reject(err);
      }
    }, 1000);
  });
};

export function* asyncWithGeneratorFunc(json) {
  try {
    const result = yield parseJSONAsync(json);
    console.log("parse result", result);
  } catch (err) {
    console.log("catching error ", err);
  }
}

export const handleAsyncWithGenerator = (generator, resolved) => {
  const { done, value } = generator.next(resolved);

  if (done) {
    return Promise.resolve(value);
  }

  return value.then(
    (resolved) => handleAsyncWithGenerator(generator, resolved),
    (err) => generator.throw(err)
  );
};


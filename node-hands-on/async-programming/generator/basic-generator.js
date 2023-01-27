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

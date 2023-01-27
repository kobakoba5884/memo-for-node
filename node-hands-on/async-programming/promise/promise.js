console.log("start");

setTimeout(
  () => console.log("setTimeout"),
  0
);

(async () => {
  await 0;
  console.log("async");
})();

function promiseFunc() {
  return new Promise((resolve) => resolve());
}

promiseFunc().then(() => console.log("promise"));

Promise.resolve().then(() => console.log("resolve"));

console.log("end");

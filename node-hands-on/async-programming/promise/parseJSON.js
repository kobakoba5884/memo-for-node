const parseJSONAsync = (json) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const data = JSON.parse(json);
        return resolve(data);
      } catch (err) {
        return reject(err);
      }
    }, 1000);
  });
};

const toBeFulfilled = parseJSONAsync('{"foo": 1}');
const toBeRejected = parseJSONAsync('{invalid": "JSON"}');

console.log("------------- after generating promise -------------");
console.log(toBeFulfilled);
console.log(toBeRejected);

setTimeout(() => {
  console.log("------------- after one second -------------");
  console.log(toBeFulfilled);
  console.log(toBeRejected);
}, 1000);

toBeRejected.catch((err) => {
  console.log("----------------------------------------------");
  console.log(err);
});

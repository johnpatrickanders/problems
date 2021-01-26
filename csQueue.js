// In JavaScript, any function can return an object.
// When it does so without the new keyword, it’s a factory function.

// a request is a funciton that returns a promise resolving to a string

function createRequestQueue() {
  const table = {};
  const queue = [];
  return {
    enqueue(id, req) {
      // const promise = new Promise(req);
      table[id] = req;
      queue.push(req);
      return req;
    },
    cancel(id) {
      console.log(!!table[id]);
      if (!!table[id]) {
        for (let i = 0; i < queue.length; i++) {
          const promise = queue[i];
          if (promise === table[id]) {
            queue.splice(i, 1);
            delete table[id];
          }
        }
      }
    },
    processNext() {
      const promise = queue[0];
      try {
        console.log("attempting resolve:", Promise.resolve(promise));
        queue.shift();
        return true;
      } catch {
        console.log("your promise had an error");
        return false;
      }
    },
    size() {
      return queue.length;
    }
  }
}

const queue = createRequestQueue();
console.log("enqueue", queue.enqueue(1, () => new Promise(() => "hi")));
console.log("enqueue", queue.enqueue(2, () => new Promise(() => "hi x 2")));
console.log("size should be two", queue.size());
console.log("enqueue", queue.processNext());
console.log("size should be one", queue.size());
console.log("enqueue", queue.enqueue(3, () => new Promise(() => "hi x 2")));
console.log("size should be two", queue.size());
console.log("cancel (should be undefined)", queue.cancel(3));
console.log("should be one", queue.size());

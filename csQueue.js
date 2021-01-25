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
      if (table[id]) {
        for (let i = 0; i < queue.length; i++) {
          const promise = queue[i];
          if (promise === table[id]) {
            queue.splice(id, 1);
            delete table[id];
          }
        }
      }
    },
    processNext() {
      const promise = queue.shift();
      try {
        promise.resolve();
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

const req = createRequestQueue();
console.log(req.enqueue(1, () => new Promise(() => "hi")))

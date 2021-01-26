// In JavaScript, any function can return an object.
// When it does so without the new keyword, it’s a factory function.

// a request is a funciton that returns a promise resolving to a string

function createRequestQueue() {
  const table = {};
  const queue = [];
  let inc = 1;
  return {
    enqueue(req) {
      const promise = new Promise(req);

      table[inc] = promise;
      queue.push(inc);
      inc++;
      return promise;
    },
    cancel(id) {
      delete (table[id]);
    },
    processNext() {
      const id = queue.shift();
      try {
        console.log("attempting resolve:", Promise.resolve(table[id]));
        queue.shift();
        this.cancel(id);
        return true;
      } catch {
        // queue.unshift()
        console.log("your promise had an error");
        return false;
      }
    },
    size() {
      return Object.keys(table).length;
    }
  }
}

const queue = createRequestQueue();
console.log("enqueue", queue.enqueue(() => new Promise(() => "hi")));
console.log("enqueue", queue.enqueue(() => new Promise(() => "hi x 2")));
console.log("size should be two", queue.size());
console.log("process next", queue.processNext());
console.log("size should be one", queue.size());
console.log("enqueue", queue.enqueue(() => new Promise(() => "hi x 2")));
console.log("size should be two", queue.size());
console.log("cancel (should be undefined)", queue.cancel(3));
console.log("should be one", queue.size());

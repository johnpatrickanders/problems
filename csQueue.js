// In JavaScript, any function can return an object.
// When it does so without the new keyword, it’s a factory function.

function createRequestQueue() {
  return {
    enqueue() {
      return "hi"
    }
  }
}

const req = createRequestQueue();
console.log(req.enqueue())

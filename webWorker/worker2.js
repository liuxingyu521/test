self.onmessage = function (e) {
  if (e.data && e.data.action == 'calc') {
    var result = fibonacci(42);
    self.postMessage(result);
  }
}

console.log('子线程2 ready!');

/**
 * 
 * @param {Number} index fibonacci数列的第几位
 */
function fibonacci(index) {
  if (index == 1) {
    return 0;
  } else if (index == 2) {
    return 1;
  } else {
    return fibonacci(index - 1) + fibonacci(index - 2);
  }
}
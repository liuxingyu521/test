if (window.Worker) {
  var mainWorker1 = new Worker('worker1.js', {
    name: 'worker1'
  });
  var mainWorker2 = new Worker('worker2.js', {
    name: 'worker2'
  });

  mainWorker1.onmessage = function (e) {
    console.log('主线程收到子线程1发来的消息： ', e.data);
  }

  mainWorker1.onerror = function (e) {
    console.log('子线程1出错： ', e);
  }

  mainWorker2.onmessage = function (e) {
    console.log('主线程收到子线程2发来的消息： ', e.data);
  }

  mainWorker2.onerror = function (e) {
    console.log('子线程2出错： ', e);
  }

  // 响应动作
  var input1 = document.getElementById('singleCalc');
  var input2 = document.getElementById('multipleCalc');

  input1.onclick = function () {
    console.log('主线程开始计算')
    console.time('main_time')

    var result1 = fibonacci(41);
    var result2 = fibonacci(42);

    console.log('主线程 ==> 第41个斐波那契数 ==> ' + result1);
    console.log('主线程 ==> 第42个斐波那契数 ==> ' + result2);

    console.timeEnd('main_time');
  }

  input2.onclick = function () {
    console.log('Web Worker线程开始计算')
    console.time('webWorker_time')

    var promise1 = new Promise(function (resolve, reject) {
      mainWorker1.onmessage = function (e) {
        console.log('子线程1 ==> 第41个斐波那契数 ==> ' + e.data);
        resolve();
      }

      mainWorker1.postMessage({
        action: 'calc'
      });

    })

    var promise2 = new Promise(function (resolve, reject) {
      mainWorker2.onmessage = function (e) {
        console.log('子线程2 ==> 第42个斐波那契数 ==> ' + e.data);
        resolve();
      }

      mainWorker2.postMessage({
        action: 'calc'
      });

    })

    Promise.all([promise1, promise2]).then(function () {
      console.timeEnd('webWorker_time');
    })

  }
} else {
  document.write('浏览器不支持Web Workers，请更换浏览器体验')
}

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
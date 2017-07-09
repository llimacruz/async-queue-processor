var queue = require('./index')

var teste = 0

function whatProcess(callback) {
    // console.log('getting items that must be pushed into queue')
    // var items = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    var items = []
    for(var i=0; i<1000; i++) {
        items.push(i);
    }
    if (teste % 3 !== 0) {
        items = []
    }
    teste++;
    callback(null, items || []);
}
function howProcess(item, callback) {
    setTimeout(()=> {
        console.log('do something with the item ', item)
        callback(null);
    }, 20)
}

var parallelCount = 2;
var waitTime = 5;

queue.initProcess(whatProcess, howProcess, parallelCount, waitTime);

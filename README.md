# async-queue-processor

This package allows to process a queue with the following caracteristcs:

## Installing
async-queue-processor is available on npm. To install it, type:

## Using
`$ npm install async-queue-processor`

then require it in your js script:

`var queue = require('async-queue-processor')`

## Sintax
The sintax to use async-queue-processor is:

` queue.initProcess(whatProcess, howProcess, parallelCount, waitTime *[, silent]*)`

where the arguments are:
- whatProcess: Async function that returns the content to be processed. Must return a callback(err, content).
- howProcess: Async function that processes the items (one each time) that were provided by the whatProcess. Must return a callback(err).
- parallelCount: Quantity of siimultaneous execution of howProcess.
- waitTime: Seconds to wait a new search for content to be processed when this content is over.
- silent: [optional] fill it with 1 or true to don't see any log about the process

## Examples

```
var queue = require('async-queue-processor')

function myWhatProcess(callback) {
    // you could be getting data from database or external API
    var items = []
    for(var i=0; i<100; i++) {
        items.push(i);
    }
    callback(null, items || []);
}
function myHowProcess(item, callback) {
    // you could be updating data from database or posting data on an API
    setTimeout(()=> {
        console.log('do something with the item ', item)
        callback(null);
    }, 1000)
}
var parallelCount = 10; // the myHowProcess will be executed ten times simultaneously
var waitTime = 5;
queue.initProcess(myWhatProcess, myHowProcess, parallelCount, waitTime);
```

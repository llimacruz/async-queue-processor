'use strict';

let async = require('async');

const smartQueue = (() => {
  const initProcess = (whatProcess, howProcess, parallelCount, waitTime, silent) => {
    const logger = (msg) => {
      if (!silent) {
        console.log(msg);
      }
    };

    const queue = async.queue((item, callback) => {
      howProcess(item, (err) => {
        if (err) {
          console.log('Error processing item: ', err)
        }
        callback();
      });
    }, parallelCount);

    let mainCallback;
    const pushQueue = (callback) => {
      if (callback) {
        mainCallback = callback;
      }
      logger('Queueing new items.');
      whatProcess((err, items) => {
        if (err) {
          console.log('Error coming from whatProcess: ', err)
          return callback();
        }

        if (items.length > 0) {
            items.forEach(item => {
                queue.push(item);
            });
            logger(`All ${items.length} items were pushed into queue`);
        } else {
            logger('There are no items do be processed');
            mainCallback();
        }
      });
    };

    queue.drain = () => {
      logger('Queue is empty.');
      pushQueue();
    };

    async.whilst(
      function() { return true; }, //execute forever
      function(callback) {
        pushQueue(() => {
          logger('All items were processed. Waiting next block.');
          setTimeout(()=> {
            callback();
          },
          waitTime * 1000);
        });
      },
      (err) => {
        if (err) {
          console.log('Error processing queue: ', err);
        }
      }
    );
  };
  return {
    initProcess
  };
})();

module.exports = smartQueue;

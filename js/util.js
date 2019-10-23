'use strict';

(function () {
  var NODE_INDEX = 0;
  var TYPE_LISTENER_INDEX = 1;
  var HANDLER_INDEX = 2;
  var DEBOUNCE_INTERVAL = 500;

  var getRandomBetween = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomIndex = function (max) {
    return getRandomBetween(0, max - 1);
  };

  var spliceRandomItem = function (arr) {
    return arr.splice(getRandomIndex(arr.length - 1), 1);
  };

  var getRandomItem = function (arr) {
    return arr[getRandomIndex(arr.length)];
  };

  var setHandlers = function (arr) {
    arr.forEach(function (key) {
      key[NODE_INDEX].addEventListener(key[TYPE_LISTENER_INDEX], key[HANDLER_INDEX]);
    });
  };

  var debounce = function (callback) {
    var lastTimeout = null;
    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(function () {
        callback.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.util = {
    spliceRandomItem: spliceRandomItem,
    getRandomItem: getRandomItem,
    setHandlers: setHandlers,
    debounce: debounce
  };
})();

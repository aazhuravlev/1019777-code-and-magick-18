'use strict';

(function () {
  var Index = {
    NODE: 0,
    TYPE_LISTENER: 1,
    HANDLER: 2
  };
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
      key[Index.NODE].addEventListener(key[Index.TYPE_LISTENER], key[Index.HANDLER]);
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

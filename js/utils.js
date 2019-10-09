'use strict';

(function () {
  window.getRandomBetween = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.getRandomIndex = function (max) {
    return window.getRandomBetween(0, max - 1);
  };

  window.spliceRandomItem = function (arr) {
    return arr.splice(window.getRandomBetween(arr.length - 1), 1);
  };

  window.getRandomItem = function (arr) {
    return arr[window.getRandomBetween(arr.length)];
  };
})();

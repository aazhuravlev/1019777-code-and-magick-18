'use strict';

(function () {
  var getRandomBetween = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomIndex = function (max) {
    return getRandomBetween(0, max - 1);
  };

  window.spliceRandomItem = function (arr) {
    return arr.splice(getRandomIndex(arr.length - 1), 1);
  };

  window.getRandomItem = function (arr) {
    return arr[getRandomIndex(arr.length)];
  };
})();

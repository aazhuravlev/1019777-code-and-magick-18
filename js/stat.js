'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var HIST_WIDTH = 40;
var HIST_HEIGHT = 150;
var HIST_GAP = 50;
var HIST_X = CLOUD_X + HIST_GAP;
var HIST_Y = 240;
var DESC_X = CLOUD_X + HIST_GAP;
var DESC_Y = 260;
var DESC_GAP = 30;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function(arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000';
    var contrastBlue2 = Math.round(Math.random(10, 90) * 100);
    ctx.fillText(names[i], DESC_X + (HIST_WIDTH + HIST_GAP) * i, DESC_Y);
    ctx.fillText(Math.round(times[i]), DESC_X + (HIST_WIDTH + HIST_GAP) * i, DESC_Y - (times[i] / maxTime * HIST_HEIGHT) - DESC_GAP);
    ctx.fillStyle = names[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(240, 100%,' + Math.round(Math.random(30, 70) * 100) + '%)';
    ctx.fillRect(HIST_X + (HIST_WIDTH + HIST_GAP) * i, HIST_Y, HIST_WIDTH, -(times[i] / maxTime * HIST_HEIGHT));
  }
};

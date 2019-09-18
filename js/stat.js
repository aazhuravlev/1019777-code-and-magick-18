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
var TEXT_X = 120;
var TEXT_Y = 40;
var TEXT_HEIGHT = 20;
var TEXT_STYLE = '16px PT Mono';
var COLORS = {
  CLOUD: '#fff',
  CLOUD_SHADOW: 'rgba(0, 0, 0, 0.7)',
  TEXT: '#000',
  YOUR_HIST: 'rgba(255, 0, 0, 1)'
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  return Math.max.apply(null, arr);
};

var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomLightness = function (hue, saturation) {
  var randomLightness = getRandomIntInclusive(15, 80) + '%';
  return 'hsl(' + hue + ', ' + saturation + '%, ' + randomLightness + ')';
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, COLORS.CLOUD_SHADOW);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, COLORS.CLOUD);

  ctx.fillStyle = COLORS.TEXT;
  ctx.font = TEXT_STYLE;
  ctx.fillText('Ура вы победили!', TEXT_X, TEXT_Y);
  ctx.fillText('Список результатов:', TEXT_X, TEXT_Y + TEXT_HEIGHT);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var textXCalculate = DESC_X + (HIST_WIDTH + HIST_GAP) * i;
    var histXCalculate = HIST_X + (HIST_WIDTH + HIST_GAP) * i;
    var histHieghtCalculate = times[i] / maxTime * HIST_HEIGHT;

    ctx.fillStyle = COLORS.TEXT;
    ctx.fillText(names[i], textXCalculate, DESC_Y);
    ctx.fillText(Math.round(times[i]), textXCalculate, DESC_Y - histHieghtCalculate - DESC_GAP);
    ctx.fillStyle = names[i] === 'Вы' ? COLORS.YOUR_HIST : getRandomLightness(240, 100);
    ctx.fillRect(histXCalculate, HIST_Y, HIST_WIDTH, -histHieghtCalculate);
  }
};

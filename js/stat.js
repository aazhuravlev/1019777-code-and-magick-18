'use strict';

var CLOUD = {
  width: 420,
  height: 270,
  x: 100,
  y: 10,
  gap: 10,
  color: '#fff',
  shadowColor: 'rgba(0, 0, 0, 0.7)'
};

var HIST = {
  width: 40,
  height: 150,
  gap: 50,
  y: 240,
  yourColor: 'rgba(255, 0, 0, 1)'
};

HIST.x = CLOUD.x + HIST.gap;

var DESC = {
  x: CLOUD.x + HIST.gap,
  y: 260,
  gap: 30
};

var TEXT = {
  x: 120,
  y: 40,
  height: 20,
  color: '#000',
  style: '16px PT Mono'
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD.width, CLOUD.height);
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
  renderCloud(ctx, CLOUD.x + CLOUD.gap, CLOUD.y + CLOUD.gap, CLOUD.shadowColor);
  renderCloud(ctx, CLOUD.x, CLOUD.y, CLOUD.color);

  ctx.fillStyle = TEXT.color;
  ctx.font = TEXT.style;
  ctx.fillText('Ура вы победили!', TEXT.x, TEXT.y);
  ctx.fillText('Список результатов:', TEXT.x, TEXT.y + TEXT.height);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var textXCalculate = DESC.x + (HIST.width + HIST.gap) * i;
    var histXCalculate = HIST.x + (HIST.width + HIST.gap) * i;
    var histHieghtCalculate = times[i] / maxTime * HIST.height;

    ctx.fillStyle = TEXT.color;
    ctx.fillText(names[i], textXCalculate, DESC.y);
    ctx.fillText(Math.round(times[i]), textXCalculate, DESC.y - histHieghtCalculate - DESC.gap);
    ctx.fillStyle = names[i] === 'Вы' ? HIST.yourColor : getRandomLightness(240, 100);
    ctx.fillRect(histXCalculate, HIST.y, HIST.width, -histHieghtCalculate);
  }
};

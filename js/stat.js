'use strict';

(function () {
  var Cloud = {
    WIDTH: 420,
    HEIGHT: 270,
    X: 100,
    Y: 10,
    GAP: 10,
    COLOR: '#fff',
    CHADOW_COLOR: 'rgba(0, 0, 0, 0.7)'
  };

  var Hist = {
    WIDTH: 40,
    HEIGHT: 150,
    GAP: 50,
    Y: 240,
    YOUR_COLOR: 'rgba(255, 0, 0, 1)'
  };

  Hist.X = Cloud.X + Hist.GAP;

  var Desc = {
    X: Cloud.X + Hist.GAP,
    Y: 260,
    GAP: 30
  };

  var Text = {
    X: 120,
    Y: 40,
    HEIGHT: 20,
    COLOR: '#000',
    STYLE: '16px PT Mono'
  };

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, Cloud.WIDTH, Cloud.HEIGHT);
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
    renderCloud(ctx, Cloud.X + Cloud.GAP, Cloud.Y + Cloud.GAP, Cloud.SHADOW_COLOR);
    renderCloud(ctx, Cloud.X, Cloud.Y, Cloud.COLOR);

    ctx.fillStyle = Text.COLOR;
    ctx.font = Text.STYLE;
    ctx.fillText('Ура вы победили!', Text.X, Text.Y);
    ctx.fillText('Список результатов:', Text.X, Text.Y + Text.HEIGHT);

    var maxTime = getMaxElement(times);

    for (var i = 0; i < names.length; i++) {
      var textXCalculate = Desc.X + (Hist.WIDTH + Hist.GAP) * i;
      var histXCalculate = Hist.X + (Hist.WIDTH + Hist.GAP) * i;
      var histHieghtCalculate = times[i] / maxTime * Hist.HEIGHT;

      ctx.fillStyle = Text.COLOR;
      ctx.fillText(names[i], textXCalculate, Desc.Y);
      ctx.fillText(Math.round(times[i]), textXCalculate, Desc.Y - histHieghtCalculate - Desc.GAP);
      ctx.fillStyle = names[i] === 'Вы' ? Hist.YOUR_COLOR : getRandomLightness(240, 100);
      ctx.fillRect(histXCalculate, Hist.Y, Hist.WIDTH, -histHieghtCalculate);
    }
  };
})();

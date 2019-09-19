'use strict';

var wizards = [];
var wizardsQuantity = 4;
var KEYS = ['name', 'coatColor', 'eyesColor'];
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb (101, 137, 164)', 'rgb (241, 43, 107)', 'rgb (146, 100, 161)', 'rgb (56, 159, 117)', 'rgb (215, 210, 55)', 'rgb (0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomItem = function (arr) {
  return arr.splice(Math.floor(Math.random() * arr.length), 1);
};

var getWizardsNames = function (quantity, names, surnames) {
  var wizardsNamesSurnames = [];

  for (var i = 0; i < quantity; i++) {
    var wizardName = getRandomItem(names) + ' ' + getRandomItem(surnames);
    wizardsNamesSurnames.push(wizardName);
  }
  return wizardsNamesSurnames;
};

var getWizardsColors = function (quantity, colors) {
  var wizardsColors = [];

  for (var i = 0; i < quantity; i++) {
    wizardsColors.push(getRandomItem(colors));
  }
  return wizardsColors;
};

var dataArr = [getWizardsNames(wizardsQuantity, WIZARD_NAMES, WIZARD_SURNAMES), getWizardsColors(wizardsQuantity, COAT_COLORS), getWizardsColors(wizardsQuantity, EYES_COLORS)];

document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

for (var i = 0; i < wizardsQuantity; i++) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  similarListElement.appendChild(wizardElement);
}

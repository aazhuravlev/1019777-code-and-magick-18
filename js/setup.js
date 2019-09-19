'use strict';

var WIZARD = [];
var wizardsQuantity = 4;
var wizardsNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var wizardsSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColor = ['rgb (101, 137, 164)', 'rgb (241, 43, 107)', 'rgb (146, 100, 161)', 'rgb (56, 159, 117)', 'rgb (215, 210, 55)', 'rgb (0, 0, 0)'];
var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getWizardsNames = function (wizards, names, surnames) {
  var wizardsNamesSurnames = [];

  for (var i = 0; i < wizards; i++) {
    var wizardName = names.splice(0, 1) + ' ' + surnames.splice(0, 1);
    wizardsNamesSurnames.push(wizardName);
  }
  return wizardsNamesSurnames;
};

var getWizardsColors = function (wizards, colors) {
  var wizardsColors = [];

  for (var i = 0; i < wizards; i++) {
    wizardsColors.push(getRandomItem(colors));
  }
  return wizardsColors;
};

WIZARD.name = getWizardsNames(wizardsQuantity, wizardsNames, wizardsSurnames);
WIZARD.coatColor = getWizardsColors(wizardsQuantity, coatColor);
WIZARD.eyesColor = getWizardsColors(wizardsQuantity, eyesColor);

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

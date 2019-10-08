'use strict';

var WIZARDS_QUANTITY = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var SELECTORS_DATA = {
  userDialog: '.setup',
  setupUserName: '.setup-user-name',
  openUserDialog: '.setup-open',
  similarWizardTemplate: '#similar-wizard-template',
};

var findNodes = function (obj) {
  var selectors = {};
  var keys = Object.keys(obj);
  keys.forEach(function (key) {
    selectors[key] = document.querySelector(obj[key]);
  });
  selectors.setupClose = selectors.userDialog.querySelector('.setup-close');
  selectors.setupSimilar = selectors.userDialog.querySelector('.setup-similar');
  selectors.setupSimilarList = selectors.userDialog.querySelector('.setup-similar-list');
  selectors.setupSimilarItem = selectors.similarWizardTemplate.content.querySelector('.setup-similar-item');
  selectors.setupFireball = {
    selector: selectors.userDialog.querySelector('.setup-fireball-wrap'),
    color: FIREBALL_COLORS,
    input: selectors.userDialog.querySelector('input[name=fireball-color]'),
    property: 'background-color: '
  };
  selectors.setupCoat = {
    selector: selectors.userDialog.querySelector('.wizard-coat'),
    color: COAT_COLORS,
    input: selectors.userDialog.querySelector('[name=coat-color]'),
    property: 'fill: '
  };
  selectors.setupEyes = {
    selector: selectors.userDialog.querySelector('.wizard-eyes'),
    color: EYES_COLORS,
    input: selectors.userDialog.querySelector('[name=eyes-color]'),
    property: 'fill: '
  };
  return selectors;
};

var NODES = findNodes(SELECTORS_DATA);

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

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

var getWizards = function (quantity) {
  var wizards = [];
  var wizardNames = WIZARD_NAMES.slice(0);
  var wizardSurnames = WIZARD_SURNAMES.slice(0);
  var coatColors = COAT_COLORS.slice(0);
  var eyesColors = EYES_COLORS.slice(0);
  for (var i = 0; i < quantity; i++) {
    wizards.push({
      name: spliceRandomItem(wizardNames) + ' ' + spliceRandomItem(wizardSurnames),
      coatColor: spliceRandomItem(coatColors),
      eyesColor: spliceRandomItem(eyesColors)
    });
  }
  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = NODES.setupSimilarItem.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var getFragment = function (arr) {
  var fragment = document.createDocumentFragment();
  arr.forEach(function (item) {
    fragment.appendChild(renderWizard(item));
  });
  return fragment;
};

var userDialogEscPressHendler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeUserDialog();
  }
};

var openUserDialog = function () {
  NODES.userDialog.classList.remove('hidden');
  NODES.setupSimilar.classList.remove('hidden');
  document.addEventListener('keydown', userDialogEscPressHendler);
};

var closeUserDialog = function () {
  NODES.userDialog.classList.add('hidden');
  NODES.setupSimilar.classList.add('hidden');
  document.removeEventListener('keydown', userDialogEscPressHendler);
};

var openDialogClickHandler = function () {
  openUserDialog();
};

var closeDialogClickHandler = function () {
  closeUserDialog();
};

var openDialogKeydownHandler = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openUserDialog();
  }
};

var closeDialogKeydownHandler = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeUserDialog();
  }
};

var userNameKeydownHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
};

var changeColorHandler = function (obj) {
  return function () {
    var randColor = getRandomItem(obj.color);
    obj.selector.style = obj.property + randColor;
    obj.input.value = randColor;
  };
};

var main = function () {
  NODES.setupSimilarList.appendChild(getFragment(getWizards(WIZARDS_QUANTITY)));

  NODES.openUserDialog.addEventListener('click', openDialogClickHandler);
  NODES.openUserDialog.addEventListener('keydown', openDialogKeydownHandler);
  NODES.setupClose.addEventListener('click', closeDialogClickHandler);
  NODES.setupClose.addEventListener('keydown', closeDialogKeydownHandler);
  NODES.setupUserName.addEventListener('keydown', userNameKeydownHandler);

  NODES.setupFireball.selector.addEventListener('click', changeColorHandler(NODES.setupFireball));
  NODES.setupCoat.selector.addEventListener('click', changeColorHandler(NODES.setupCoat));
  NODES.setupEyes.selector.addEventListener('click', changeColorHandler(NODES.setupEyes));
};

main();

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
  var nodes = {};
  var keys = Object.keys(obj);
  keys.forEach(function (key) {
    nodes[key] = document.querySelector(obj[key]);
  });
  nodes.setupClose = nodes.userDialog.querySelector('.setup-close');
  nodes.setupSimilar = nodes.userDialog.querySelector('.setup-similar');
  nodes.setupSimilarList = nodes.userDialog.querySelector('.setup-similar-list');
  nodes.setupSimilarItem = nodes.similarWizardTemplate.content.querySelector('.setup-similar-item');
  nodes.upload = nodes.userDialog.querySelector('.upload');
  nodes.setupFireball = {
    selector: nodes.userDialog.querySelector('.setup-fireball-wrap'),
    color: FIREBALL_COLORS,
    input: nodes.userDialog.querySelector('input[name=fireball-color]'),
    property: 'background-color: '
  };
  nodes.setupCoat = {
    selector: nodes.userDialog.querySelector('.wizard-coat'),
    color: COAT_COLORS,
    input: nodes.userDialog.querySelector('[name=coat-color]'),
    property: 'fill: '
  };
  nodes.setupEyes = {
    selector: nodes.userDialog.querySelector('.wizard-eyes'),
    color: EYES_COLORS,
    input: nodes.userDialog.querySelector('[name=eyes-color]'),
    property: 'fill: '
  };
  return nodes;
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

var dragHandler = function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragged = false;

  var mouseMoveHandler = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    NODES.userDialog.style.top = (NODES.userDialog.offsetTop - shift.y) + 'px';
    NODES.userDialog.style.left = (NODES.userDialog.offsetLeft - shift.x) + 'px';
  };

  var mouseUpHandler = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);

    if (dragged) {
      var preventDefaultClickHandler = function (preventEvt) {
        preventEvt.preventDefault();
        NODES.upload.removeEventListener('click', preventDefaultClickHandler);
      };
      NODES.upload.addEventListener('click', preventDefaultClickHandler);
    }
  };

  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);
};

var main = function () {
  NODES.setupSimilarList.appendChild(getFragment(getWizards(WIZARDS_QUANTITY)));

  NODES.openUserDialog.addEventListener('click', openDialogClickHandler);
  NODES.openUserDialog.addEventListener('keydown', openDialogKeydownHandler);
  NODES.setupClose.addEventListener('click', closeDialogClickHandler);
  NODES.setupClose.addEventListener('keydown', closeDialogKeydownHandler);
  NODES.setupUserName.addEventListener('keydown', userNameKeydownHandler);
  NODES.upload.addEventListener('mousedown', dragHandler);
  NODES.setupFireball.selector.addEventListener('click', changeColorHandler(NODES.setupFireball));
  NODES.setupCoat.selector.addEventListener('click', changeColorHandler(NODES.setupCoat));
  NODES.setupEyes.selector.addEventListener('click', changeColorHandler(NODES.setupEyes));
};

main();

'use strict';

var WIZARDS_QUANTITY = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var USER_DIALOG = document.querySelector('.setup');
var SETUP_PLAYER = document.querySelector('.setup-player');
var SETUP_USER_NAME = document.querySelector('.setup-user-name');
var SETUP_FIREBALL = document.querySelector('.setup-fireball-wrap');
var SETUP_EYES = document.querySelector('.wizard-eyes');
var SETUP_COAT = document.querySelector('.wizard-coat');
var OPEN_USER_DIALOG = document.querySelector('.setup-open');
var CLOSE_USER_DIALOG = USER_DIALOG.querySelector('.setup-close');
var SIMILAR_LIST_ELEMENT = USER_DIALOG.querySelector('.setup-similar-list');
var SIMILAR_WIZARD_TEMPLATE = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var spliceRandomItem = function (arr) {
  return arr.splice(Math.floor(Math.random() * arr.length), 1);
};

var getRandomArrItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
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
  var wizardElement = SIMILAR_WIZARD_TEMPLATE.cloneNode(true);

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

var onUserDialogEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeUserDialog();
  }
};

var openUserDialog = function () {
  USER_DIALOG.classList.remove('hidden');
  USER_DIALOG.querySelector('.setup-similar').classList.remove('hidden');
  document.addEventListener('keydown', onUserDialogEscPress);
};

var closeUserDialog = function () {
  USER_DIALOG.classList.add('hidden');
  USER_DIALOG.querySelector('.setup-similar').classList.add('hidden');
  document.removeEventListener('keydown', onUserDialogEscPress);
};

var WIZARDS = getWizards(WIZARDS_QUANTITY);
SIMILAR_LIST_ELEMENT.appendChild(getFragment(WIZARDS));

OPEN_USER_DIALOG.addEventListener('click', function () {
  openUserDialog();
});

OPEN_USER_DIALOG.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openUserDialog();
  }
});

CLOSE_USER_DIALOG.addEventListener('click', function () {
  closeUserDialog();
});

CLOSE_USER_DIALOG.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeUserDialog();
  }
});

SETUP_USER_NAME.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
});

SETUP_FIREBALL.addEventListener('click', function () {
  var fireballColor = getRandomArrItem(FIREBALL_COLORS);
  SETUP_FIREBALL.style = 'background-color: ' + fireballColor + '';
  SETUP_FIREBALL.querySelector('input[name=fireball-color').value = fireballColor;
});

SETUP_COAT.addEventListener('click', function () {
  var coatColor = getRandomArrItem(COAT_COLORS);
  SETUP_COAT.style.fill = coatColor;
  SETUP_PLAYER.querySelector('input[name=coat-color]').value = coatColor;
});

SETUP_EYES.addEventListener('click', function () {
  var eyesColor = getRandomArrItem(EYES_COLORS);
  SETUP_EYES.style.fill = eyesColor;
  SETUP_PLAYER.querySelector('input[name=eyes-color]').value = eyesColor;
});

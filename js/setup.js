'use strict';

var WIZARDS_QUANTITY = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var USER_DIALOG = document.querySelector('.setup');
var SETUP_USER_NAME = document.querySelector('.setup-user-name');
var SETUP_SUBMIT = document.querySelector('.setup-submit');
var OPEN_USER_DIALOG = document.querySelector('.setup-open');
var CLOSE_USER_DIALOG = USER_DIALOG.querySelector('.setup-close');
var SIMILAR_LIST_ELEMENT = USER_DIALOG.querySelector('.setup-similar-list');
var SIMILAR_WIZARD_TEMPLATE = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var getRandomItem = function (arr) {
  return arr.splice(Math.floor(Math.random() * arr.length), 1);
};

var getWizards = function (quantity) {
  var wizards = [];
  var wizardNames = WIZARD_NAMES.slice(0);
  var wizardSurnames = WIZARD_SURNAMES.slice(0);
  var coatColors = COAT_COLORS.slice(0);
  var eyesColors = EYES_COLORS.slice(0);
  for (var i = 0; i < quantity; i++) {
    wizards.push({
      name: getRandomItem(wizardNames) + ' ' + getRandomItem(wizardSurnames),
      coatColor: getRandomItem(coatColors),
      eyesColor: getRandomItem(eyesColors)
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
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderWizard(arr[i]));
  }
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

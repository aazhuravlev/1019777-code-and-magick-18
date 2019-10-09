'use strict';

(function () {
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

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
      color: window.COAT_COLORS,
      input: nodes.userDialog.querySelector('[name=coat-color]'),
      property: 'fill: '
    };
    nodes.setupEyes = {
      selector: nodes.userDialog.querySelector('.wizard-eyes'),
      color: window.EYES_COLORS,
      input: nodes.userDialog.querySelector('[name=eyes-color]'),
      property: 'fill: '
    };
    return nodes;
  };

  window.NODES = findNodes(SELECTORS_DATA);

  var renderWizard = function (wizard) {
    var wizardElement = window.NODES.setupSimilarItem.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  window.getFragment = function (arr) {
    var fragment = document.createDocumentFragment();
    arr.forEach(function (item) {
      fragment.appendChild(renderWizard(item));
    });
    return fragment;
  };

  window.userDialogEscPressHendler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeUserDialog();
    }
  };

  var openUserDialog = function () {
    window.NODES.userDialog.classList.remove('hidden');
    window.NODES.setupSimilar.classList.remove('hidden');
    document.addEventListener('keydown', window.userDialogEscPressHendler);
  };

  var closeUserDialog = function () {
    window.NODES.userDialog.classList.add('hidden');
    window.NODES.setupSimilar.classList.add('hidden');
    document.removeEventListener('keydown', window.userDialogEscPressHendler);
  };

  window.openDialogClickHandler = function () {
    openUserDialog();
  };

  window.closeDialogClickHandler = function () {
    closeUserDialog();
  };

  window.openDialogKeydownHandler = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openUserDialog();
    }
  };

  window.closeDialogKeydownHandler = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closeUserDialog();
    }
  };

  window.userNameKeydownHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.stopPropagation();
    }
  };

  window.changeColorHandler = function (obj) {
    return function () {
      var randColor = window.getRandomItem(obj.color);
      obj.selector.style = obj.property + randColor;
      obj.input.value = randColor;
    };
  };

  window.dragHandler = function (evt) {
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

      window.NODES.userDialog.style.top = (window.NODES.userDialog.offsetTop - shift.y) + 'px';
      window.NODES.userDialog.style.left = (window.NODES.userDialog.offsetLeft - shift.x) + 'px';
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      if (dragged) {
        var preventDefaultClickHandler = function (preventEvt) {
          preventEvt.preventDefault();
          window.NODES.upload.removeEventListener('click', preventDefaultClickHandler);
        };
        window.NODES.upload.addEventListener('click', preventDefaultClickHandler);
      }
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };
})();

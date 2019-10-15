'use strict';

(function () {

  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var SELECTORS_DATA = {
    userDialog: '.setup',
    form: '.setup-wizard-form',
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

  var userDialogEscPressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeUserDialog();
    }
  };

  var openUserDialog = function () {
    NODES.userDialog.classList.remove('hidden');
    NODES.setupSimilar.classList.remove('hidden');
    document.addEventListener('keydown', userDialogEscPressHandler);
  };

  var closeUserDialog = function () {
    NODES.userDialog.classList.add('hidden');
    NODES.setupSimilar.classList.add('hidden');
    document.removeEventListener('keydown', userDialogEscPressHandler);
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
      var randColor = window.util.getRandomItem(obj.color);
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

  var submitHandler = function (evt) {
    window.backend.save(new FormData(NODES.form), closeUserDialog, window.backend.errorHandler);
    evt.preventDefault();
  };

  var addHandlers = function () {
    NODES.openUserDialog.addEventListener('click', openDialogClickHandler);
    NODES.openUserDialog.addEventListener('keydown', openDialogKeydownHandler);
    NODES.setupClose.addEventListener('click', closeDialogClickHandler);
    NODES.setupClose.addEventListener('keydown', closeDialogKeydownHandler);
    NODES.setupUserName.addEventListener('keydown', userNameKeydownHandler);
    NODES.upload.addEventListener('mousedown', dragHandler);
    NODES.setupFireball.selector.addEventListener('click', changeColorHandler(NODES.setupFireball));
    NODES.setupCoat.selector.addEventListener('click', changeColorHandler(NODES.setupCoat));
    NODES.setupEyes.selector.addEventListener('click', changeColorHandler(NODES.setupEyes));
    NODES.form.addEventListener('submit', submitHandler);
  };

  window.dom = {
    nodes: NODES,
    addHandlers: addHandlers
  };
})();

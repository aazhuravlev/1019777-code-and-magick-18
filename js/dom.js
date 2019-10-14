'use strict';

(function () {
  var WIZARDS_QUANTITY = 4;

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
      color: window.data.coatColors,
      input: nodes.userDialog.querySelector('[name=coat-color]'),
      property: 'fill: '
    };
    nodes.setupEyes = {
      selector: nodes.userDialog.querySelector('.wizard-eyes'),
      color: window.data.eyesColors,
      input: nodes.userDialog.querySelector('[name=eyes-color]'),
      property: 'fill: '
    };
    return nodes;
  };

  var NODES = findNodes(SELECTORS_DATA);

  var renderWizard = function (wizard) {
    var wizardElement = NODES.setupSimilarItem.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var getWizardFragmentHandler = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARDS_QUANTITY; i++) {
      fragment.appendChild(renderWizard(arr[i]));
    }
    NODES.setupSimilarList.appendChild(fragment);
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
      var randColor = window.utils.getRandomItem(obj.color);
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
    window.backend.save(new FormData(NODES.form), closeUserDialog, window.errorHandler);
    evt.preventDefault();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.dom = {
    nodes: NODES,
    getWizardFragmentHandler: getWizardFragmentHandler,
    openDialogClickHandler: openDialogClickHandler,
    closeDialogClickHandler: closeDialogClickHandler,
    openDialogKeydownHandler: openDialogKeydownHandler,
    closeDialogKeydownHandler: closeDialogKeydownHandler,
    userNameKeydownHandler: userNameKeydownHandler,
    changeColorHandler: changeColorHandler,
    dragHandler: dragHandler,
    submitHandler: submitHandler,
    errorHandler: errorHandler
  };
})();

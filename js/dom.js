'use strict';

(function () {
  var COLOR = {
    coat: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    eyes: ['black', 'red', 'blue', 'yellow', 'green'],
    fireball: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var KEYCODE = {
    esc: 27,
    enter: 13
  };

  var SELECTORS_DATA = {
    userDialog: '.setup',
    form: '.setup-wizard-form',
    setupUserName: '.setup-user-name',
    openUserDialog: '.setup-open',
    similarWizardTemplate: '#similar-wizard-template',
    fileChooser: '.upload input[type=file]',
    preview: '.setup-user-pic',
    openDialogIcon: '.setup-open-icon'
  };

  var Coordinate = function (x, y) {
    this.x = x;
    this.y = y;
  };

  Coordinate.prototype.setX = function (x) {
    this.x = x;
  };

  Coordinate.prototype.setY = function (y) {
    this.y = y;
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
      color: COLOR.fireball,
      input: nodes.userDialog.querySelector('input[name=fireball-color]'),
      property: 'background-color: '
    };
    nodes.setupCoat = {
      selector: nodes.userDialog.querySelector('.wizard-coat'),
      color: COLOR.coat,
      input: nodes.userDialog.querySelector('[name=coat-color]'),
      property: 'fill: '
    };
    nodes.setupEyes = {
      selector: nodes.userDialog.querySelector('.wizard-eyes'),
      color: COLOR.eyes,
      input: nodes.userDialog.querySelector('[name=eyes-color]'),
      property: 'fill: '
    };
    return nodes;
  };

  var NODES = findNodes(SELECTORS_DATA);

  var userDialogEscPressHandler = function (evt) {
    if (evt.keyCode === KEYCODE.esc) {
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
    if (evt.keyCode === KEYCODE.enter) {
      openUserDialog();
    }
  };

  var closeDialogKeydownHandler = function (evt) {
    if (evt.keyCode === KEYCODE.enter) {
      closeUserDialog();
    }
  };

  var userNameKeydownHandler = function (evt) {
    if (evt.keyCode === KEYCODE.esc) {
      evt.stopPropagation();
    }
  };

  var changeColorHandler = function (obj) {
    return function () {
      var randColor = window.util.getRandomItem(obj.color);
      obj.selector.style = obj.property + randColor;
      obj.input.value = randColor;
      window.data.updateWizardsDebounced();
    };
  };

  var dragHandler = function (evt) {
    evt.preventDefault();

    var startCoords = new Coordinate(evt.clientX, evt.clientY);

    var dragged = false;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = new Coordinate(startCoords.x - moveEvt.clientX, startCoords.y - moveEvt.clientY);

      startCoords.setX(moveEvt.clientX);
      startCoords.setY(moveEvt.clientY);

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

  var submitHandler = function (evt) {
    window.backend.save(new FormData(NODES.form), closeUserDialog, errorHandler);
    evt.preventDefault();
  };

  var fileChooserHandler = function () {
    var file = NODES.fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        NODES.preview.src = reader.result;
        NODES.openDialogIcon.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var HANDLERS_DATA = [
    [NODES.openUserDialog, 'click', openDialogClickHandler],
    [NODES.openUserDialog, 'keydown', openDialogKeydownHandler],
    [NODES.setupClose, 'click', closeDialogClickHandler],
    [NODES.setupClose, 'keydown', closeDialogKeydownHandler],
    [NODES.setupUserName, 'keydown', userNameKeydownHandler],
    [NODES.upload, 'mousedown', dragHandler],
    [NODES.setupFireball.selector, 'click', changeColorHandler(NODES.setupFireball)],
    [NODES.setupCoat.selector, 'click', changeColorHandler(NODES.setupCoat)],
    [NODES.setupEyes.selector, 'click', changeColorHandler(NODES.setupEyes)],
    [NODES.form, 'submit', submitHandler],
    [NODES.fileChooser, 'change', fileChooserHandler]
  ];

  var addHandlers = function () {
    window.util.setHandlers(HANDLERS_DATA);
  };

  window.dom = {
    nodes: NODES,
    addHandlers: addHandlers,
    errorHandler: errorHandler
  };
})();

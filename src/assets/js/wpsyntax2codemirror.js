/**
 * Wrapper for the codemirror API
 * Uses JQuery to replace all pre[lang] elements with a javascript CodeMirror
 * Instance.
 */
var wpsyntax2codemirror = (function ($, document, window, CodeMirror) {
  'use strict';

  /**
   * Public interface.
   * @type {{init: init}}
   */
  var wp2cm = {
    init: init
  };

  return wp2cm;

  ///////////////

  /**
   * Main Entrypoint for converting WPSyntax Elements to CodeMirror Elements.
   */
  function init() {
    if (CodeMirror) {
      convertAllWPSyntaxElementsToCodeMirror();
    } else {
      throw new Error('CodeMirror Does Not Exist');
    }
  }

  /**
   * Performs the conversion of all WPSyntaxElements to CodeMirrorElements.
   */
  function convertAllWPSyntaxElementsToCodeMirror() {
    try {
      var wpSyntaxElements = getAllWPSyntaxElements(),
        currentMode,
        currentValue,
        currentElement;

      for (var i = 0, x = wpSyntaxElements.length; i < x; i++) {
        currentElement = wpSyntaxElements[i];
        currentMode = $(currentElement).attr('lang').trim().toLowerCase();
        currentValue = $(currentElement).text();

        swapWithCodeMirror(currentElement, modeConverter(currentMode), currentValue);
      }
    } catch (exception) {
      console.error('wpsyntax2codemirror::', exception);
    }
  }

  /**
   * Since the TypeScript mode is a specialization of the javascript mode,
   * TypeScript mode must be provided as 'text/typescript' not just typescript
   * for CodeMirror to display the correct syntax highlighting.
   * @param currentMode
   * @returns {string}
   */
  function modeConverter(currentMode) {
    try {
      return currentMode === 'typescript' ? 'text/typescript' : currentMode;
    } catch (exception) {
      console.error('wpsyntax2codemirror::', exception);
    }
  }

  /**
   * Handles the DOM Swap of elements. Replaces the pre[lang] with
   * a custom code mirror element.
   * @param element
   * @param mode
   * @param value
   * @returns {*}
   */
  function swapWithCodeMirror(element, mode, value) {
    try {
      return CodeMirror(function (elt) {
        $(element).replaceWith(elt);
      }, {
        value: value,
        mode: mode,
        lineNumbers: true,
        readOnly: 'nocursor',
        viewportMargin: Infinity,
        theme: 'dracula'
      });
    } catch (exception) {
      console.error('wpsyntax2codemirror::', exception);
    }
  }

  /**
   * Returns a list of all target WP Syntax Elements.
   * @returns {*|HTMLElement}
   */
  function getAllWPSyntaxElements() {
    try {
      return $('pre[lang]');
    } catch (exception) {
      console.error('wpsyntax2codemirror::', exception);
    }
  }

})(jQuery, document, window, CodeMirror);

/**
 * Replace all WPSyntax Editors with CodeMirror.
 */
$(document).ready(function () {
  wpsyntax2codemirror.init();
});
(function() {
    'use strict';

    function hotKeyServiceFactory($window, $timeout) {
        var hotKeyService = {};
        hotKeyService.bindKeyCombination = function (keyCombination, callbackFunc) {
            //We need to change the input key combination to Upper case
            //since the keyCode in the Event will be in upper case
            keyCombination = keyCombination.toUpperCase();

            var invokeCallbackFunc = function (event) {
                if (hotKeyService.checkKeyCombination(event, keyCombination)) {
                    // $timeout is required for this to work in Firefox.
                    // If $timeout is not used in Firefox, the event will continue to be propagated
                    // and the browser will pick it up
                    $timeout(function () {
                        callbackFunc(event);
                    }, 1);

                    //Stop event propagation
                    event.cancelBubble = true;
                    event.returnValue = false;
                    event.stopPropagation();
                    event.preventDefault();
                    return false;
                }
            };
            if ($window.document.addEventListener) {
                $window.document.addEventListener('keydown', invokeCallbackFunc, false);
            }
            else if ($window.document.attachEvent) {
                $window.document.attachEvent('onkeydown', invokeCallbackFunc);
            }
            else {
                $window.document.onkeydown = invokeCallbackFunc;
            }
        };

        hotKeyService.checkKeyCombination = function (event, keyCombination) {
            var keyCodePressed;
            if (event.keyCode) {//For IE, Chrome and Opera
                keyCodePressed = event.keyCode;
            }
            else if (event.which) {//For Firefox
                keyCodePressed = event.which;
            }
            else if (event.charCode) {//Fallback if nothing else works
                keyCodePressed = event.charCode;
            }

            var keyArray = keyCombination.split('+');

            var ctrlKeyRequired = false;
            var shiftKeyRequired = false;
            var altKeyRequired = false;
            var keyMatchRequired = false;

            var keyCodeToMatch;

            for (var i = 0; i < keyArray.length; i++) {
                if (keyArray[i].length === 1) {
                    keyMatchRequired = true;
                    keyCodeToMatch = keyArray[i].charCodeAt(0);
                }
                else if (keyArray[i] === 'ENTER') {
                    keyMatchRequired = true;
                    keyCodeToMatch = 13;
                }
                else if (keyArray[i] === 'HOME') {
                    keyMatchRequired = true;
                    keyCodeToMatch = 36;
                }
                else if (keyArray[i] === 'CTRL') {
                    ctrlKeyRequired = true;
                }
                else if (keyArray[i] === 'SHIFT') {
                    shiftKeyRequired = true;
                }
                else if (keyArray[i] === 'ALT') {
                    altKeyRequired = true;
                }
            }

            var ctrlKeyPressed = event.ctrlKey;
            var shiftKeyPressed = event.shiftKey;
            var altKeyPressed = event.altKey;
            var keyMatched = (keyCodePressed === keyCodeToMatch);

            var match = ctrlKeyRequired === ctrlKeyPressed &&
                            shiftKeyRequired === shiftKeyPressed &&
                            altKeyRequired === altKeyPressed &&
                            keyMatchRequired === keyMatched;

            return match;
        };
        return hotKeyService;
    }
    angular.module('services.hotkey', [])
        .factory('hotKeyService', hotKeyServiceFactory);
})();
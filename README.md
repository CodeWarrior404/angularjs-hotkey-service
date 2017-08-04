# AngularJS Hot Key Service

This is a simple Hot Key Service for AngularJS applications.

## Demo

[Click here](https://plnkr.co/edit/cs6j5knbMAsLamyab9pu?p=preview) for demo.

## How to use

Here is a sample snippet for attaching a hot key handler.

     hotKeyService.bindKeyCombination('Ctrl+H', callbackFunc);
 
     function callbackFunc () {
       vm.showInfoAlert('Alert:', 'Callback handler invoked');
     }

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:8000/`.

#!/usr/bin/env node

function Cat(name) {
    this._name = name;
}

Cat.prototype.getName = function () {
    return this._name;
};

Cat.prototype.setName = function (n) {
    this._name = n;
};

var meows = new Cat('meows');

console.log('I am a cat named ' + meows.getName());

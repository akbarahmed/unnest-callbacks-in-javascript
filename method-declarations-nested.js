#!/usr/bin/env node

function Cat(name) {
    this.getName = function () {
        return name;
    };
    this.setName = function (n) {
        name = n;
    };
}

var meows = new Cat('meows');

console.log('I am a cat named ' + meows.getName());


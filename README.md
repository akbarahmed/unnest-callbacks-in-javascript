# unnest-callbacks-in-javascript

## Overview

This project contains some sample code that I wrote for a lightening talk I gave at [BayNode](http://www.meetup.com/BayNode) on March 5, 2014. The sample code highlights a few approaches to unnesting callbacks in JavaScript to both improve code readability and to increase performance. 

The performance tuning aspects are 100% from [Trevor Norris](https://twitter.com/trevnorris) who's talk on [Performance Sins of our Abstractions](http://exponential.io/blog/nodeday-2014-performance-sins-of-our-abstractions) at NodeDay validated the benefits of an unnested approach and served as the inspiration for this talk. If you're really into high performance Node development, then Trevor is someone you should follow.


## Usage

Run the following commands to clone the repo and to install the necessary dependencies.

```bash
git clone git@github.com:akbarahmed/unnest-callbacks-in-javascript.git

cd unnest-callbacks-in-javascript

npm install
```


## Nested callbacks

The initial source, `concat-files-nested.js`, uses nested callbacks.

Nested callbacks can be used effectively. However, as the nesting gets deeper our code moves further and further to the right, which when taken too far, contributes to a condition known as **callback hell**. 

```bash
node concat-files-nested.js
```

> Response time is 290 ms.


### Nested callbacks with error

```bash
node concat-files-nested-with-error.js
```

When we run `concat-files-nested-with-error.js` the error message displayed in the console is:

```bash
/home/akbar/repos/unnest-callbacks-in-javascript/concat-files-nested-with-error.js:13
            if (errWrong) throw err;
                ^
ReferenceError: errWrong is not defined
    at /home/akbar/repos/unnest-callbacks-in-javascript/concat-files-nested-with-error.js:13:8
    at Object.oncomplete (fs.js:107:15)
```

Notice how we get an error message that shows the exact line number where the error occurs. However, there is no information about which callback function the error occurred in as we're using anonymous functions for our callback. 

Importantly, we'll see how using named functions results in improved error messages below.


## Unnest a series of callbacks

Unnested callbacks yield a better response time.

> Response time is 114 ms.

### Pass data via file globals

The first example shows unnested callbacks where data is passed by using file globals (basically variables that are defined outside of function scope). To unnest we made the following changes to the original `concat-files-nested.js` source:

- Create 3 file global variables: file1Contents, file2Contents, file3Contents
- Name each callback function
- Unnest the callback
- Set the value of each file global with the appropriate `data` within each function that reads a file's contents

```bash
node concat-files-unnested-pass-via-globals.js
```

### Pass data via properties

In this example we'll pass the return values by attaching prior return values as properties on functions that will be called further down our file. 

```bash
node concat-files-unnested-pass-via-properties.js
```

The advantage of this approach is that we avoid the use of any global variables in our file.


### Alternative approaches to passing data

There are additional methods to pass data from one callback to another including the use of closures. However, I am not going to cover this alternatives in this repo.


### Unnested callbacks with error

```bash
node concat-files-unnested-pass-via-properties-with-error.js
```

When we run `concat-files-unnested-pass-via-properties-with-error.js` the error message displayed in the console is:

```bash
/home/akbar/repos/unnest-callbacks-in-javascript/concat-files-unnested-pass-via-properties-with-error.js:31
    if (errWrong) throw err;
        ^
ReferenceError: errWrong is not defined
    at writeFile3 (/home/akbar/repos/unnest-callbacks-in-javascript/concat-files-unnested-pass-via-properties-with-error.js:31:6)
    at Object.oncomplete (fs.js:107:15)
```

By using named functions we've given additional information to Node which helps it give us a better error message. Notice how Node is able to report the line number where the error occurred `31` and the exact error `ReferenceError: errWrong is not defined`, and it also reports the exact function that contains the error `at writeFile3`.


## Unnest method declarations

> The original of this approach is from Trevor Norris. You can view his original slides at [http://trevnorris.github.io/NodeDay/#/13](http://trevnorris.github.io/NodeDay/#/13).

```bash
function Cat(name) {
    this.getName = function () {
        return name;
    };
    this.setName = function (n) {
        name = n;
    };
}

var meows = new Cat('meows');

console.log(meows.getName());
```

> Instantiates in 280 ns (that's nano seconds).

```bash
function Cat(name) {
    this._name = name;
}

PrototypeColor.prototype.getName = function () {
    return this._name;
};

PrototypeColor.prototype.setName = function (n) {
    this._name = n;
};

var meows = new Cat('meows');

console.log(meows.getName());
```

> Instantiates in 7 ns (that's nano seconds).


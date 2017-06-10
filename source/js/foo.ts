var bar = require('./bar');

module.exports = function (n:number) {
    return n * bar(n);
};

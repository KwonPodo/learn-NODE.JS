let count = 0;

function increase() {
  count++;
}

function decrease() {
  count--;
}

function getCount() {
  return count;
}

module.exports.getCount = getCount;
module.exports.increase = increase;
module.exports.decrease = decrease;

console.log(module);

// this: references the object that is executing the current function
// method of a Class -> obj
// function -> global (window, global)
// global scope -> module.exports

const fs = require("fs");

function hello() {
  console.log(this);
  console.log(this === global); // true
}
hello();

class A {
  constructor(num) {
    this.num = num;
  }
  memberFunction() {
    console.log("----------- class -----------");
    console.log(this);
    console.log(this === global); // false : It refers to Class A
  }
}

const a = new A(1);
a.memberFunction();

console.log("------ global scope -------");
console.log(this);
console.log(this === module.exports); // true

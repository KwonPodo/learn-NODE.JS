// JS 자체적으로 제공하는 import, export 기능.
//import * as counter from './counter.js';
import { increase, getCount, decrease } from "./counter.js";

increase();
increase();
decrease();
console.log(getCount());

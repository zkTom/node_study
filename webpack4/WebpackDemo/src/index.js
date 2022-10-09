import add, { addMore } from "./add.js"
import { minus } from "./minus.js";

const sum = add(1,2);
const division = minus(2,1);
const sumMore = addMore(1,2,3);

console.log(`两数之和：${sum}`);
console.log(`两数之差：${division}`);
console.log(`三数之和：${sumMore}`)
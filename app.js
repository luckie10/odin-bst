import Tree from "./bst.js";

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const bst = Tree(array);
const bstRoot = bst.root;
bst.prettyPrint(bstRoot);

import Tree from "./bst.js";

const generateRandomNumber = () => Math.floor(Math.random() * 100);

const generateRandomArray = (size) =>
  Array.from({ length: size }, generateRandomNumber);

const tree = Tree(generateRandomArray(25));

console.log("Balanced: ", tree.isBalanced());

console.log("Level order:", tree.levelOrder());
console.log("Pre order:", tree.preorder());
console.log("Post order:", tree.postorder());
console.log("In order:", tree.inorder());

for (let i = 0; i < 5; i++) {
  tree.insert(generateRandomNumber());
}

console.log("Balanced: ", tree.isBalanced());

console.log("Rebalance", tree.rebalance());

console.log("Balanced: ", tree.isBalanced());

console.log("Level order:", tree.levelOrder());
console.log("Pre order:", tree.preorder());
console.log("Post order:", tree.postorder());
console.log("In order:", tree.inorder());

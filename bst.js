const Node = (data, left = null, right = null) => {
  return { data, left, right };
};

const Tree = (array) => {
  // Unique and sort array
  const unqArray = [...new Set(array.sort((a, b) => a - b))];

  const buildTree = (array, start = 0, end = array.length - 1) => {
    if (start > end) return null;

    const mid = parseInt((start + end) / 2);
    const root = Node(array[mid]);

    root.left = buildTree(array, start, mid - 1);
    root.right = buildTree(array, mid + 1, end);

    return root;
  };

  const root = buildTree(unqArray);

  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }

    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }

    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  const insert = (root, value) => {
    if (root === null) return Node(value);

    if (value < root.data) root.left = insert(root.left, value);
    else if (value > root.data) root.right = insert(root.right, value);

    return root;
  };

  const deleteNode = (root, value) => {
    if (root === null) return root;

    if (value < root.data) {
      root.left = deleteNode(root.left, value);
      return root;
    } else if (value > root.data) {
      root.right = deleteNode(root.right, value);
      return root;
    }

    // delete if one/both children are empty
    // by returning the opposite child from what we test for
    if (root.left === null) return root.right;
    else if (root.right === null) return root.left;
    // delete if both children exist
    else {
      // climb down the left side of the right branch
      // to find lowest number in branch as successor
      let successorParent = root;
      let successor = root.right;
      while (successor.left !== null) {
        successorParent = successor;
        successor = successor.left;
      }

      // The successor can only have a right child, therefore if it exist
      // we will replace the successor with its child.
      if (successor === root) successorParent.right = successor.right;
      else successorParent.left = successor.right;

      // Replace the value of the node we are deleting with the successor value
      root.data = successor.data;
    }

    return root;
  };

  const find = (root, value) => {
    if (root === null) return root;

    if (value < root.data) {
      root.left = find(root.left, value);
      return root;
    } else if (value > root.data) {
      root.right = find(root.right, value);
      return root;
    }

    return root;
  };

  return {
    root,
    prettyPrint,
    insert,
    delete: deleteNode,
    find,
  };
};

export { Tree as default };

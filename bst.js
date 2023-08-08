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

  const insert = (node, value) => {
    if (node === null) return Node(value);

    if (value < node.data) node.left = insert(node.left, value);
    else if (value > node.data) node.right = insert(node.right, value);

    return node;
  };

  const deleteNode = (node, value) => {
    if (node === null) return node;

    if (value < node.data) {
      node.left = deleteNode(node.left, value);
      return node;
    } else if (value > node.data) {
      node.right = deleteNode(node.right, value);
      return node;
    }

    // delete if one/both children are empty
    // by returning the opposite child from what we test for
    if (node.left === null) return node.right;
    else if (node.right === null) return node.left;
    // delete if both children exist
    else {
      // climb down the left side of the right branch
      // to find lowest number in branch as successor
      let successorParent = node;
      let successor = node.right;
      while (successor.left !== null) {
        successorParent = successor;
        successor = successor.left;
      }

      // The successor can only have a right child, therefore if it exist
      // we will replace the successor with its child.
      if (successor === node) successorParent.right = successor.right;
      else successorParent.left = successor.right;

      // Replace the value of the node we are deleting with the successor value
      node.data = successor.data;
    }

    return node;
  };

  const find = (node, value) => {
    if (node === null || node.data === value) return node;

    if (value < node.data) {
      return find(node.left, value);
    } else if (value > node.data) {
      return find(node.right, value);
    }
  };

  const levelOrder = (node, callback = null) => {
    return levelOrderIterative(node, callback);
    // return levelOrderRecursive(node, callback);
  };

  const levelOrderIterative = (node, callback = null) => {
    if (!node) return;

    let queue = [];
    let array = [];

    queue.push(node);

    while (queue.length) {
      let firstNode = queue.shift();
      callback ? callback(firstNode.data) : array.push(firstNode.data);
      if (firstNode.left) queue.push(firstNode.left);
      if (firstNode.right) queue.push(firstNode.right);
    }

    if (array.length > 0) return array;
  };

  const levelOrderRecursive = (node, callback = null) => {
    if (!node) return;

    let array = [];

    const height = (node) => {
      if (!node) return 0;

      const lHeight = height(node.left);
      const rHeight = height(node.right);

      if (lHeight > rHeight) return lHeight + 1;
      else return rHeight + 1;
    };

    const currentLevel = (node, level) => {
      if (!node) return;
      if (level === 1) {
        callback ? callback(node.data) : array.push(node.data);
      } else if (level > 1) {
        currentLevel(node.left, level - 1);
        currentLevel(node.right, level - 1);
      }
    };

    const h = height(node);
    for (let i = 1; i <= h; i++) {
      currentLevel(node, i);
    }

    if (array.length > 0) return array;
  };

  // Inorder - left, root, right
  const inorder = (node, callback = null, result = []) => {
    if (!node) return;
    if (node.left) inorder(node.left, callback, result);
    callback ? callback(node) : result.push(node.data);
    if (node.right) inorder(node.right, callback, result);
    if (result.length > 0) return result;
  };

  // Preorder - root, left, right
  // PostOrder - left, right, root

  return {
    root,
    prettyPrint,
    insert,
    delete: deleteNode,
    find,
    levelOrder,
    inorder,
  };
};

export { Tree as default };

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

  const prettyPrint = (node = root, prefix = "", isLeft = true) => {
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

  const insert = (value, node = root) => {
    if (node === null) return Node(value);

    if (value < node.data) node.left = insert(node.left, value);
    else if (value > node.data) node.right = insert(node.right, value);

    return node;
  };

  const deleteNode = (value, node = root) => {
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

  const find = (value, node = root) => {
    if (node === null || node.data === value) return node;

    if (value < node.data) {
      return find(node.left, value);
    } else if (value > node.data) {
      return find(node.right, value);
    }
  };

  const levelOrder = (node = root, callback = null) => {
    // return levelOrderIterative(node, callback);
    return levelOrderRecursive(node, callback);
  };

  const levelOrderIterative = (node = root, callback = null) => {
    if (!node) return;

    let queue = [];
    let result = [];

    queue.push(node);

    while (queue.length) {
      let firstNode = queue.shift();
      callback ? callback(firstNode) : result.push(firstNode.data);
      if (firstNode.left) queue.push(firstNode.left);
      if (firstNode.right) queue.push(firstNode.right);
    }

    if (result.length) return result;
  };

  const levelOrderRecursive = (node = root, callback = null) => {
    if (!node) return;

    let array = [];

    const currentLevel = (node, level) => {
      if (!node) return;
      if (level === 1) {
        callback ? callback(node) : array.push(node.data);
      } else if (level > 1) {
        currentLevel(node.left, level - 1);
        currentLevel(node.right, level - 1);
      }
    };

    const h = height(node) + 1;
    for (let i = 1; i <= h; i++) {
      currentLevel(node, i);
    }

    if (array.length > 0) return array;
  };

  // Inorder - left, root, right
  const inorder = (node = root, callback = null, result = []) => {
    // return inorderRecursive(node, callback, result)
    return inorderItterative(node, callback, result);
  };

  const inorderRecursive = (node = root, callback = null, result = []) => {
    if (!node) return;
    if (node.left) inorder(node.left, callback, result);
    callback ? callback(node) : result.push(node.data);
    if (node.right) inorder(node.right, callback, result);
    if (result.length) return result;
  };

  const inorderItterative = (node = root, callback = null, result = []) => {
    if (!node) return;

    let stack = [];
    let currNode = node;

    while (stack.length || currNode) {
      if (currNode) {
        stack.push(currNode);
        currNode = currNode.left;
      } else {
        currNode = stack.pop();
        callback ? callback(currNode) : result.push(currNode.data);
        currNode = currNode.right;
      }
    }

    if (result.length) return result;
  };

  // Preorder - root, left, right
  const preorder = (node = root, callback = null, result = []) => {
    // return preorderRecursive(node, callback, result)
    return preorderItterative(node, callback, result);
  };

  const preorderRecursive = (node = root, callback = null, result = []) => {
    if (!node) return;
    callback ? callback(node) : result.push(node.data);
    if (node.left) preorder(node.left, callback, result);
    if (node.right) preorder(node.right, callback, result);
    if (result.length) return result;
  };

  const preorderItterative = (node = root, callback = null, result = []) => {
    if (!node) return;

    let stack = [];

    stack.push(node);
    while (stack.length) {
      let currNode = stack.pop();
      callback ? callback(currNode) : result.push(currNode.data);
      if (currNode.right) stack.push(currNode.right);
      if (currNode.left) stack.push(currNode.left);
    }
  };

  // PostOrder - left, right, root
  const postorder = (node = root, callback = null, result = []) => {
    return postorderRecursive(node, callback, result);
    // return postorderItterative(node, callback, result)
  };

  const postorderRecursive = (node = root, callback = null, result = []) => {
    if (!node) return;
    if (node.left) postorderRecursive(node.left, callback, result);
    if (node.right) postorderRecursive(node.right, callback, result);
    callback ? callback(node) : result.push(node.data);
    if (result.length) return result;
  };

  const postorderItterative = (node = root, callback = null, result = []) => {
    if (!node) return;

    let stack = [];
    let prev = null;

    stack.push(node);

    while (stack.length) {
      let currNode = stack.at(-1);
      if (
        (!currNode.left && !currNode.right) || // if currNode is a leaf
        // or if the prev poped nodes were branches of currNode
        currNode.right === prev ||
        currNode.left === prev
      ) {
        callback ? callback(currNode) : result.push(currNode.data);
        prev = currNode;
        stack.pop();
      } else {
        if (currNode.right) stack.push(currNode.right);
        if (currNode.left) stack.push(currNode.left);
      }
    }

    if (result.length) return result;
  };

  const height = (node = root) => {
    if (!node) return -1;
    return Math.max(height(node.left), height(node.right)) + 1;
  };

  const depth = (node, rootNode = root, level = 0) => {
    if (!rootNode) return 0;
    if (!node) return;
    if (rootNode.data === node.data) return level;

    return node.data < rootNode.data
      ? depth(rootNode.left, node, level + 1)
      : depth(rootNode.right, node, level + 1);
  };

  const isBalanced = (node = root) => {
    if (!node) return true;

    const lHeight = height(node.left);
    const rHeight = height(node.right);

    if (
      Math.abs(lHeight - rHeight) <= 1 &&
      isBalanced(node.left) &&
      isBalanced(node.right)
    )
      return true;

    return false;
  };

  const rebalance = (node = root) =>
    isBalanced(node) ? node : buildTree(inorder());

  return {
    root,
    prettyPrint,
    insert,
    delete: deleteNode,
    find,
    levelOrder,
    inorder,
    preorder,
    postorder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
};

export { Tree as default };

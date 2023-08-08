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
    if (root === null || root.data === value) return root;

    if (value < root.data) {
      return find(root.left, value);
    } else if (value > root.data) {
      return find(root.right, value);
    }
  };

  const levelOrder = (root, fn = null) => {
    return levelOrderIterative(root, fn);
    // return levelOrderRecursive(root, fn);
  };

  const levelOrderIterative = (root, fn = null) => {
    if (!root) return;

    let queue = [];
    let array = [];

    queue.push(root);

    while (queue.length > 0) {
      let first = queue.shift();

      if (fn) fn(first.data);
      else array.push(first.data);

      if (first.left) queue.push(first.left);
      if (first.right) queue.push(first.right);
    }

    if (array.length > 0) return array;
  };

  const levelOrderRecursive = (root, fn = null) => {
    if (!root) return;

    let array = [];

    const height = (root) => {
      if (!root) return 0;

      const lHeight = height(root.left);
      const rHeight = height(root.right);

      if (lHeight > rHeight) return lHeight + 1;
      else return rHeight + 1;
    };

    const currentLevel = (root, level) => {
      if (!root) return;
      if (level === 1) {
        if (fn) fn(root.data);
        else array.push(root.data);
      } else if (level > 1) {
        currentLevel(root.left, level - 1);
        currentLevel(root.right, level - 1);
      }
    };

    const h = height(root);
    for (let i = 1; i <= h; i++) {
      currentLevel(root, i);
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

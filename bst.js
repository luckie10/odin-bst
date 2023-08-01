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

  return {
    root,
    prettyPrint,
    insert,
  };
};

export { Tree as default };

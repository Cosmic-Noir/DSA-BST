class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if (this.key == null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    } else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    if (this.key == key) {
      return this.value;
    } else if (key < this.key && this.left) {
      return this.left.find(key);
    } else if (key > this.key && this.right) {
      return this.right.find(key);
    } else {
      throw new Error("Key Error");
    }
  }

  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = succesor.key;
        this.value = succesor.value;
        successor.remove(successor.key);
      } else if (this.left) {
        this._replaceWith(this.left);
      } else if (this.right) {
        this._replaceWith(this.right);
      } else {
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error("Key error");
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      } else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}

const myTree = new BinarySearchTree();

myTree.insert(3);
myTree.insert(1);
myTree.insert(4);
myTree.insert(6);
myTree.insert(9);
myTree.insert(2);
myTree.insert(5);
myTree.insert(7);

// console.log(myTree);

const altTree = new BinarySearchTree();

altTree.insert("E");
altTree.insert("A");
altTree.insert("S");
altTree.insert("Y");
altTree.insert("Q");
altTree.insert("U");
altTree.insert("E");
altTree.insert("S");
altTree.insert("T");
altTree.insert("I");
altTree.insert("O");
altTree.insert("N");

// console.log(altTree);

// What does this program do?

function tree(t) {
  if (!t) {
    return 0;
  }
  return tree(t.left) + t.value + tree(t.right);
}

// I think this function first checks if the tree exists, if it doens't returns 0, otherwise, it seems to be recursively adding the values of the tree?

// console.log(tree(myTree));

// Time complexity best case would be O(log(n)), worst case would be O(n) if heavily left or right.
const heightFinder = (root, num) => {
  if (root == null) {
    return 0;
  }

  if (root.right == null && root.left == null) {
    return num;
  }

  if (root.right && root.left) {
    return Math.max(
      heightFinder(root.right, num + 1),
      heightFinder(root.left, num + 1)
    );
  } else if (root.right != null) {
    return heightFinder(root.right, num + 1);
  } else {
    return heightFinder(root.left, num + 1);
  }
};

console.log(heightFinder(myTree, 1));

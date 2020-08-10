class Node {
  constructor(val) {
    this.val = val
    this.right = null
    this.left = null
  }
}

class BST {
  constructor() {
    this.root = null
  }

  createNode(val) {
    const newNode = new Node(val)
    if (!this.root) {
      this.root = newNode
      return this
    }
    let current = this.root

    const addSide = side => {
      if (!current[side]) {
        current[side] = newNode
        return this
      }
      current = current[side]
    }

    while (true) {
      if (val === current.val) return this
      if (val < current.val) addSide("left")
      else addSide("right")
    }
  }

  inOrder() {
    let current = this.root

    let traverse = node => {
      if (node.left) traverse(node.left)
      console.log(node.val)
      if (node.right) traverse(node.right)
    }

    traverse(current)
  }
}

const tree = new BST()

tree.createNode(10)
tree.createNode(15)
tree.createNode(5)
tree.createNode(50)
tree.createNode(3)
tree.createNode(7)
tree.createNode(12)

tree.inOrder()

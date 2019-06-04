class Node {
  constructor() {
    this.value = null;
    this.children = {
      /* Char: Node */
    };
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(key, value = null) {
    const length = key.length;
    let node = this.root;
    for (let i = 0; i < length; i++) {
      const char = key.charAt(i);
      if (!node.children[char]) {
        node.children[char] = new Node();
      }
      node = node.children[char];
    }
    node.value = value;
    node.isWord = true;
  }

  find(key) {
    const length = key.length;
    let node = this.root;
    for (let i = 0; i < length; i++) {
      const char = key.charAt(i);
      if (node.children[char]) {
        node = node.children[char];
      } else {
        return null;
      }
    }
    return node;
  }

  keysWithPrefix(prefix) {
    const node = this.find(prefix);
    if (!node) {
      return [];
    }
    const result = [];
    traverse(node, prefix.split(""), result);
    return result.sort();
  }
}

function traverse(node, prefixStack, result) {
  if (node.isWord) {
    result.push(prefixStack.join(""));
  }
  for (const char in node.children) {
    const child = node.children[char];
    prefixStack.push(char);
    traverse(child, prefixStack, result);
    prefixStack.pop();
  }
}

module.exports = Trie;

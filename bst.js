class Node{
    constructor(data){
        this.left = null
        this.right = null
        this.data = data
    }
}

class Tree{
    constructor(){
        this.root = null

    }

    buildTree(array){
        array = [...new Set(array)].sort((a,b)=> a - b)
        this.root = this.buildNode(array)
    }
    
    buildNode(array){
        if (array.length == 0) return null
        let mid = Math.floor(array.length/2)
        let newNode = new Node(array[mid])

        newNode.left = this.buildNode(array.slice(0,mid))
        newNode.right = this.buildNode(array.slice(mid+1))
        return newNode 
    }

    insertItem(data,root = this.root){
        if(root.data == null){
            this.root = new Node(data)
            return
        }

        if(data < root.data){
            if(root.left == null){
                root.left = new Node(data)
            }else{
                this.insertItem(data,root.left)
            }
        }else if(data > root.data){
            if(root.right == null){
                root.right = new Node(data)
            }else{
                this.insertItem(data,root.right)
            }
        }else{
            return 'duplicate Item'
        }
    }

    deleteItem(data,root = this.root){
        if(root == null){
            return null
        }

        if(root.data > data){
            root.left = this.deleteItem(data,root.left)
        }else if(root.data < data){
            root.right = this.deleteItem(data,root.right)
        }else{
            if(root.right == null & root.left == null){
                return null
            }

            if(root.left == null){
                return root.right
            }else if(root.right == null){
                return root.left
            }

            let minRight = this.findMin(root.right)
            root.data = minRight.data
            root.right = this.deleteItem(minRight.data,root.right)

        }
        return root
    }

    findMin(node){
        while(node.left != null){
            node = node.left
        }
        return node
    }

    findValue(data,root = this.root){
        if(root == null){
            return null
        }

        if(data < root.data){
            return this.findValue(data,root.left)
        }else if(data > root.data){
            return this.findValue(data,root.right)
        }else{
            return root
        }
    }

    levelOrder(callback,root = this.root){
        if(typeof callback != 'function'){
            throw new Error('Callback Required')
        }
        if(root == null) return

        let queue = [root]

        while(queue.length > 0){
            let current = queue.shift()
            callback(current)

            if(current.left) queue.push(current.left)
            if(current.right ) queue.push(current.right)
        } 

    }
    printTree(){
        prettyPrint(this.root)
    }
  
}
const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

const test = new Tree()
test.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
test.levelOrder(node=>console.log(node.data))
  
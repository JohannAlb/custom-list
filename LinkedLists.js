let ram = new Array();

class List {
  constructor() {
    this.next = null;
  }

  potentiallyFillRamWithJunk() {
    if (Math.random() > 0.5) {
      ram.push("junk");
      console.log("added junk to ram");
    }
  }

  showAll() {
    this.potentiallyFillRamWithJunk();

    console.log("=== Start of List ===");
    let currentPointer = this.next;
    while (true) {
      console.log(ram[currentPointer].data);
      currentPointer = ram[currentPointer].next;
      if (currentPointer === null) {
        console.log("=== End of List ===");
        break;
      }
    }
  }

  addFirst(node) {
    this.potentiallyFillRamWithJunk();

    let node2 = this.next; // temporarily save the pointer to the previous first node
    ram.push(node); // Add new node to memory
    this.next = ram.length - 1; // Sets the next pointer of the list to the newly allocted nodes memory address

    if (node2 != null) {
      ram[this.next].next = node2; // sets the next pointer of the newly added node to point to the previous first node
      ram[node2].prev = this.next; // sets the prev pointer of the previous first node to point to the newly added node
    }

    // console.log("this.next: " + this.next + "\nValue: " + ramSimulator[this.next].data);
    // console.log(ramSimulator[this.next])
  }

  deleteFirst() {
    this.potentiallyFillRamWithJunk();

    this.next = ram[this.next].next;
    ram[this.next].prev = null;
  }

  findLast() {
    let curr = this.next;
    while (ram[curr].next != null) {
      curr = ram[curr].next;
    }
    return curr;
  }

  addLast(node) {
    this.potentiallyFillRamWithJunk();

    if (this.next === null) {
      ram.push(node);
      this.next = ram.length - 1;
      return;
    }

    const currLast = this.findLast();
    ram.push(node);
    ram[currLast].next = ram.length - 1;
    ram[this.findLast()].prev = currLast;
  }

  deleteLast() {
    this.potentiallyFillRamWithJunk();

    ram[ram[this.findLast()].prev].next = null;
  }

  length() {
    if (this.next === null) {
      return 0;
    }

    let curr = this.next;
    let counter = 1;

    while (ram[curr].next != null) {
      curr = ram[curr].next;
      counter++;
    }

    return counter;
  }

  generate(num) {
    for (let i = 0; i < num; i++) {
      this.addLast(new Node(Math.floor(Math.random() * 999 - 499))); // -500 < n < 500
    }
  }

  findSmallestNode() {
    if (this.next === null) {
      return null;
    }

    var currMin = this.next;
    let curr = this.next;

    while (ram[curr].next != null) {
      if (ram[currMin].data > ram[ram[curr].next].data) {
        currMin = ram[curr].next;
      }
      curr = ram[curr].next;
    }

    return currMin;
  }

  sort() {
    // make a new list
    // find the smallest node
    // add to the new list
    // remove from the old list
    // repeat
    // replace old list ith new list (update list pointer)

    let newList = new List();
    while (this.length() > 0) {
      let currMin = this.findSmallestNode();
      newList.addLast(new Node(ram[currMin].data));

      if (this.length() == 1) {
        this.next = null;
      } else if (ram[currMin].prev === null) {
        this.next = ram[currMin].next;
        ram[ram[currMin].next].prev = null;
      } else if (ram[currMin].next === null) {
        ram[ram[currMin].prev].next = null;
      } else {
        ram[ram[currMin].prev].next = ram[currMin].next;
        ram[ram[currMin].next].prev = ram[currMin].prev;
      }
    }

    this.next = newList.next;
  }
}

class Node {
  constructor(data) {
    this.next = null;
    this.prev = null;
    this.data = data;
  }
}

let myList = new List();

myList.addFirst(new Node(80));
myList.addFirst(new Node(70));
myList.addFirst(new Node(60));
myList.addFirst(new Node(50));

myList.deleteFirst();

myList.addLast(new Node(101));
myList.addLast(new Node(102));
myList.addLast(new Node(103));
myList.addLast(new Node(104));

myList.deleteLast();
myList.deleteLast();

myList.showAll();
console.log("length: " + myList.length());

myList.generate(10);

myList.showAll();
console.log("length: " + myList.length());

myList.sort();

myList.showAll();
console.log("length: " + myList.length());

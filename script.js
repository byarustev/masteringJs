// Closures
// prototype
// scope
// inheritace


// INHERITANCE - 14TH NOV 2024

function Animal(name) {
    this.name = name
}

Animal.prototype.speak = function () {
    console.log(`${this.name} make noise`)
}

function Dog(name) {
    //make it inherite animal contructor, by passing it the context and the required params
    Animal.call(this, name)
}

// Here, Dog inherits from Animal. Using Object.create, 
// we set up inheritance, and 
Dog.prototype = Object.create(Animal.prototype)
// above line changes the Dog constructor to be animal so reassign it back to Dog
Dog.prototype.constructor = Dog

// Test 
const dog1 = new Dog("Mikie")
dog1.speak()


// Alternatively using the class keyword
class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        console.log(`${this.name} makes a noise.`);
    }
}

class Dog extends Animal {
    speak() {
        console.log(`${this.name} barks.`);
    }
}

const myDog = new Dog("Buddy");
myDog.speak(); // Output: Buddy barks.


// Recap

// Closures allow a function to access variables outside its scope.
// Prototypes enable efficient method sharing among instances.
// Scope determines the visibility and lifetime of variables.
// Inheritance allows objects to share properties and methods, enabling code reuse.
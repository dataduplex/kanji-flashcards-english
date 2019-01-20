class MyClass {

    constructor () {
        this.prop1 = "Lot of value";
    }

    func1() {
        console.log("Value of prop1 is: "+this.prop1);
    }
}

myObj = new MyClass();
myObj.func1();


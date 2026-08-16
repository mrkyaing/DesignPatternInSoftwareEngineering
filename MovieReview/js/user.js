class User{
    constructor(name, password){
        this.name = name
        this.password  =password
    }
    //print fucntion
    printName(){
        console.log("user information");
        console.log("name:",this.name);
        console.log("pwd:",this.password);
    }
}

class Admin extends User{
    constructor(name, password, course){
        super(name, password)
        this.course = course
    }

    Stats(){
        console.log("Stats");
    }

    printName(){
        console.log("Child class " + this.name)
        super.printName();
    }
}

const aAdmin = new Admin("MG", 123456, "JavaScript")
aAdmin.printName()
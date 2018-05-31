

let obj = {
    x : 1,
    y: 2,
    add : function() {
        let that = this
        function sayHello() {
            console.log(that.x)
        }
        sayHello()
        return this.x + this.y
    }
}


let Obj2 = function(x, y){
    this.x = x
    this.y = y
    this.add = function() {
        return this.x + this.y
    }

    function sub() {
        return this.x - this.y
    }
}

let obj2 = new Obj2(1, 2)
console.log(obj2.add())


let obj3 = new Obj2(4, 5)
console.log(obj3.add())

obj3.sub()
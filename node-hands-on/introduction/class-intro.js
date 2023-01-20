
class Foo {
    #privateField = 1
    publicField = 2
    static #staticPrivateField = 3
    static staticPublicField = 4

    constructor(parameter){
        this.fieldInitializedInConstructor = parameter
        console.log('Foo constructor')
    }

    get #computed(){
        return this.publicField * 2
    }

    get computed(){
        return this.#computed
    }

    set #computed(value){
        this.publicField = value / 2
    }

    set computed(value){
        this.#computed = value
    }

    #privateMethod(){
        return this.#privateField
    }

    publicMethod(){
        return this.#privateMethod
    }

    static #staticPrivateMethod(){
        return this.#staticPrivateField
    }
}

class Bar extends Foo{
    constructor(parameter){
        super(parameter)
        this.subClassPublicField = 100
        console.log('bar constructor')
    }
}
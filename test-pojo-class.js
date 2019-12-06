class User {
    _name;
    _lastName;

    constructor(name, lastName) {
        this._name = name;
        this._lastName = lastName;
    }

    getName() {
        return `${this._name} ${this._lastName}`;
    }
}

const user = new User('juan', 'valdez');

const copy = { ...user };

console.log(user.getName(), copy.getName);
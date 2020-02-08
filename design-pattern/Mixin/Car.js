class Car {
    constructor(setting) {
        this.model = setting.model || 'no model';
        this.color = setting.color || 'no color';
    }
    driveSideways() {
        console.log(`${this.model}:driveSideways`);
    }
}
module.exports = Car;
export default class UserDTO {
    constructor(user) {
        this.fullname = user.first_name + " " + user.last_name,
        this.age = user.age,
        this.country = user.country,
        this.roll = user.admin
    }
}
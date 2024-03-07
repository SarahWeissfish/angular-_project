export class User {
    code?: number;
    name?: string;
    address?: string;
    email?: string;
    password?: string;
    lecturer?: boolean;
    constructor() {
       this.code= undefined
       this.name=""
       this.address =""
       this.email=""
       this.password=""
       this.lecturer= false

    }
}
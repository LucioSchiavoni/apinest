
export class User {
    constructor(
        public readonly id: string,
        public readonly username: string,
        public readonly email: string,
        private password: string,
        public phone?: string,
        private address?: string,
        public fullName?: string,
        public image?: string
    ){}

    public getPassword(): string {
        return this.password;
    }

    public getAddress(): string {
        return this.address ?? '';
    }

    updatePassword(newPassword: string): void {
        if(newPassword.length < 6) {
            throw new Error("Password must be at least 6 characters long.");
        }
        this.password = newPassword;
    }


}
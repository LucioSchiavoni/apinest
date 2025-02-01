//Le enviamos este dto como objecto para crear un usuario

export class CreateUserDto {
    username: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    fullName: string;
    image: string;
}

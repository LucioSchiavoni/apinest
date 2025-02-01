//Se definen el nombre de las funciones a utilizar con sus respectivos parametros a usar
import { User } from "../entities/user.entity";
export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface UserRepository {
    save(user: User): Promise<User>;
    findByUsername(username:string): Promise<User | null>;
    findAllUsers(): Promise<User[]>;
}
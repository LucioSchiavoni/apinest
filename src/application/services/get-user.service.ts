import { Injectable, Inject } from "@nestjs/common";
import { User } from "src/domain/entities/user.entity";
import { USER_REPOSITORY, UserRepository } from "src/domain/interfaces/user.repository";




@Injectable()
export class GetUserService{
    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: UserRepository){}
    
    async execute(): Promise<User[]>{

        const users = await this.userRepository.findAllUsers() || [];

        return Array.isArray(users) ? users : [];
    
    }
}
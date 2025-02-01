//Aqui es donde se crean las funciones para exportarlo directamente al controlador se importa aqui el userRepository que es el que contiene las consultas(usando prisma) admeas de utilizar el dto
//se importa el userRepository llamando a la funcion especifica y pasandole como parametro el dto a utilizar
//Tambien se trae la clase user con los datos a utilizar
import { Inject, Injectable } from "@nestjs/common";
import { User } from "src/domain/entities/user.entity";
import { USER_REPOSITORY, UserRepository } from "src/domain/interfaces/user.repository";
import { CreateUserDto } from "src/application/dto/create-user.dto";
import { FileStorage } from "src/domain/interfaces/file.storage.interface";


@Injectable()
export class CreateUserService {
    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject('Filestorage') private readonly fileStorage: FileStorage
){}

    async execute(dto: CreateUserDto, image?: Express.Multer.File): Promise<User>{
        const existingUser = await this.userRepository.findByUsername(dto.username)

        if(existingUser){
            throw new Error("Username already taken.");
        }

        const imageUrl = image ? await this.fileStorage.uploadFile(image) : '';
        const user = new User(
            dto.username,
            dto.email,
            dto.password,
            dto.phone ?? '',
            dto.address ?? '',
            dto.fullName,
            imageUrl
        );
        
        return await this.userRepository.save(user);
    }
}

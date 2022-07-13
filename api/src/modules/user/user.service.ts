import { UserModule } from "./user.module";


export async function createUser(user) {
    return UserModule.create(user)
}
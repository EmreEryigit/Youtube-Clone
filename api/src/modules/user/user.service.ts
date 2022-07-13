import { User, UserModule } from "./user.model";


export async function createUser(user: Omit<User,"comparePassword">) {
    return UserModule.create(user)
}

export async function findUserByEmail(email: User["email"]) {
    return UserModule.findOne({email})
}
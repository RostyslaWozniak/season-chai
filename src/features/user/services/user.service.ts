import { UserRepository } from "../repositories/user.repository";
import { CreateUserSchema } from "../schemas/create-user.schema";
import { UpdateUserSchema } from "../schemas/update-user.schema";
import { User } from "../types/user.types";

export class UserService {
  public static getAll() {}
  public static create(user: CreateUserSchema): Promise<User> {
    return UserRepository.create(user);
  }
  public static getById(id: string): Promise<User | undefined> {
    return UserRepository.findById(id);
  }
  public static getByEmail(email: string): Promise<User | undefined> {
    return UserRepository.findByEmail(email);
  }
  public static async getByIdOrThrow(id: string): Promise<User> {
    const user = await this.getById(id);
    if (user == null) {
      throw new Error("User not found");
    }
    return user;
  }
  public static async getByEmailOrThrow(email: string): Promise<User> {
    const user = await this.getByEmail(email);
    if (user == null) {
      throw new Error("User not found");
    }
    return user;
  }
  public static update(user: UpdateUserSchema) {
    return UserRepository.update(user);
  }

  public static delete() {}
}

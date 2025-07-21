import { User } from "./user.interface";

export interface AuthLoginRes {
    user:  User;
    token: string;
}

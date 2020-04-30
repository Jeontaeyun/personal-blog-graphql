import { Service, Inject, Container } from "typedi";

import { UserStatic } from "models/mysql/user";
import { ILoginInput, PLATFORM } from "types/services/User";
import database from "models/mysql";

interface IUserService {
    signUp?: (strategy: string) => void;

    login: () => Promise<void>;
    logout: () => void;

    updateProfile?: () => void;
    updateUserPassword?: (password: string, newPassword: string) => Promise<boolean>;
}

@Service()
class UserService implements IUserService {
    @Inject() private _userModel: UserStatic;

    constructor(_userModel: UserStatic) {
        this._userModel = _userModel;
    }
}
Container.set(UserService, new UserService(database.User));
export default UserService;

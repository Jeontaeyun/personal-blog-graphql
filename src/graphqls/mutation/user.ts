import { ResolverContextType, IUser, ILocalSignUpInput, ILoginInput } from "types/services/User";
import Container from "typedi";
import { PassportService, UserService } from "services";

const userService = Container.get(UserService);
const passportService = Container.get(PassportService);

const signUpWithLocal = async (_: any, userInput: ILocalSignUpInput, context: ResolverContextType, info: any) => {
    try {
        const createdUser = await passportService.signUpLocal(userInput);
        return createdUser;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

const login = async (_: any, userInput: ILoginInput, context: ResolverContextType, info: any) => {
    try {
        const { user: exUser, req } = context;
        if (!exUser) {
            const loginedUser = await passportService.authenticateLocal(userInput);
            req.login(loginedUser, (loginError: any) => {
                if (loginError) {
                    throw new Error(loginError);
                }
                return loginedUser;
            });

            return loginedUser;
        } else {
            throw new Error("이미 로그인 하였습니다. 로그아웃 해주세요");
        }
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

const logout = (_: any, args: any, context: ResolverContextType, info: any) => {
    const { user, req } = context;
    try {
        if (user) {
            const logoutedUser = user;
            req.logout();
            return logoutedUser;
        } else {
            throw new Error("로그인 된 유저가 없습니다.");
        }
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

export default {
    signUpWithLocal,
    login,
    logout
};

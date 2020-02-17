import { IUser, USER_GRANT_ENUM } from "types/services/User";
import { AuthenticationError } from "apollo-server";
import { Service } from "typedi";

interface IServiceUtils {
    pagination: ({
        page,
        pageSize
    }: {
        page: number;
        pageSize: number;
    }) => {
        offset: number;
        limit: number;
    };
}
@Service()
class ServiceUtils implements IServiceUtils {
    public pagination = ({ page, pageSize }: { page: number; pageSize: number }) => {
        const offset = page * pageSize;
        const limit = offset + pageSize;
        return {
            offset,
            limit
        };
    };

    public checkLogined = (user: IUser) => {
        if (!user) {
            throw new Error("로그인이 필요합니다.");
        }
    };

    public checkAdmin = (user: IUser) => {
        if (!user) {
            throw new Error("로그인이 필요합니다.");
        } else if (user.grant !== USER_GRANT_ENUM.ADMIN) {
            throw new AuthenticationError("must be ADMIN");
        }
    };
}

export default ServiceUtils;

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

class ServiceUtils implements IServiceUtils {
    public pagination = ({ page, pageSize }: { page: number; pageSize: number }) => {
        const offset = page * pageSize;
        const limit = offset + pageSize;
        return {
            offset,
            limit
        };
    };
}

export default ServiceUtils;

import { Service, Inject, Container } from "typedi";
import { UserInputError } from "apollo-server";
//@ts-ignore
import bcrypt from "bcrypt-nodejs";

import { ILocalSignUpInput, USER_GRANT_ENUM, IUser, ILoginInput } from "types/services/User";
import database from "models/mysql";
import { CategoryStatic, ICategoryModel } from "models/mysql/category";

interface ICategoryService {
    getCategorys: () => Promise<ICategoryModel[]>;
    updateCategory: (id: string, name: string) => Promise<boolean>;
    deleteCategory: (id: string) => Promise<boolean>;
}

@Service()
class CategoryService implements ICategoryService {
    @Inject() private _categoryModel: CategoryStatic;
    constructor(_categoryModel: CategoryStatic) {
        this._categoryModel = _categoryModel;
    }

    public getCategorys = async () => {
        try {
            const categorys = await this._categoryModel.findAll();
            if (categorys.length) {
                return categorys;
            } else {
                throw new Error("There is no category");
            }
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    };

    public createCategory = async (name: string) => {
        try {
            const exCategory = await database.Category.findOne({ where: { name } });
            if (exCategory) {
                throw new Error("중복된 카테고리입니다.");
            }
            const newCategory = await this._categoryModel.create({ name });
            return newCategory.toJSON();
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    };

    public updateCategory = async (id: string, name: string) => {
        try {
            const exCategory = await this._categoryModel.findOne({ where: { id } });
            if (!exCategory) {
                throw new Error("존재하지 않는 카테고리입니다.");
            }
            const [isUpdated] = await this._categoryModel.update({ name }, { where: { id } });
            return !!isUpdated;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    };

    public deleteCategory = async (id: string) => {
        try {
            const exCategory = await this._categoryModel.findOne({ where: { id } });
            if (!exCategory) {
                throw new Error("존재하지 않는 카테고리입니다.");
            }
            const isDeleted = await this._categoryModel.destroy({ where: { id } });
            return !!isDeleted;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    };
}

Container.set(CategoryService, new CategoryService(database.Category));

export default CategoryService;

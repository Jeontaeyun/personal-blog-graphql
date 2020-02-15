"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class PostService {
    constructor(postModel) {
        this.getPostById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this._postModel.findOne({
                    where: { id }
                });
                if (result) {
                    return result;
                }
                else {
                    throw Error("There is no Post");
                }
            }
            catch (error) {
                console.error(error);
                throw Error(error);
            }
        });
        this._postModel = postModel;
    }
}
//# sourceMappingURL=index.js.map
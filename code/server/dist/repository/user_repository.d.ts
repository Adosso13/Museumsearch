import type User from "../model/user.js";
declare class UserRepository {
    private table;
    selectAll: () => Promise<User[] | unknown>;
}
export default UserRepository;
//# sourceMappingURL=user_repository.d.ts.map
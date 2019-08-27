import Roles from "../constants/roles";
import StorageHelper from "./storage-helper";

export function checkForAdminRoute() {
    const user = StorageHelper.getUserFromToken();
    return user.role === Roles.ADMIN ? "admin." : "";
}

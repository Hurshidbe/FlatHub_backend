import { SetMetadata } from "@nestjs/common"
import { roles } from "src/enums/user.enums"

export const ROLES_KEY = 'roles'
export const Roles = (...roles : roles[])=>SetMetadata(ROLES_KEY, roles)
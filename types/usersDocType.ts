import { AuthRole } from "./tokenPayloadType"

export interface UserDoc {
    username: string
    role: AuthRole
    refresh_token: string
    password: string
}
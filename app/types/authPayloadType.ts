import { AuthRole } from "./tokenPayloadType"

export interface AuthPayload {
    username: string
    role: AuthRole
    refresh_token: string
}

export interface UserAuthentication {
    email: string
    password: string
}
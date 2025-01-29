export interface TokenPayload {
    userId: string
    username: string
    role: AuthRole
}

export enum AuthRole {
    USER = "user",
    SYSADMIN = "SysAdmin"
}
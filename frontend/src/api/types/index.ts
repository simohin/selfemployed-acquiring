import {UUID} from "crypto";

export type Credentials = {
    login: string,
    password: string,
}
export type TokenResponse = {
    token: string
}
export type AuthoritiesWrapper = {
    authority: UserRole
}
export type MeResponse = {
    id: UUID,
    username: string,
    authorities: AuthoritiesWrapper[]
}
export enum UserRole {
    ROLE_USER = 'ROLE_USER',
    ROLE_ADMIN = 'ROLE_ADMIN',
    ROLE_MERCHANT = 'ROLE_MERCHANT',
}

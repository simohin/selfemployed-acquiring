import {UUID} from "crypto";

export type Credentials = {
    login: string,
    password: string,
}
export type TokenResponse = {
    token: string
}
export type ProfileResponse = {
    username: string
    roles: UserRole[]
}
export type MerchantsResponse = {
    username: string
    roles: UserRole[]
}

export enum UserRole {
    ROLE_USER = 'ROLE_USER',
    ROLE_ADMIN = 'ROLE_ADMIN',
    ROLE_MERCHANT = 'ROLE_MERCHANT'
}

export namespace UserRole {
    export const toUserString = (role: UserRole) => role.toString().split("_")[1]
}

export type Merchant = {
    id: UUID,
    name: string,
    owners: UUID[]
}

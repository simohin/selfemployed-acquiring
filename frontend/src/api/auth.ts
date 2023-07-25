import {baseClient, secureClient} from "./client";
import {Credentials, MeResponse, TokenResponse} from "./types";
import {store} from "../store/models";

export const getToken = async (credentials: Credentials) => {
    return baseClient.post('/auth/tokens', credentials)
        .then(r => r.data as TokenResponse)
        .then(r => store.dispatch.auth.setToken(r.token))
}
export const register = async (credentials: Credentials) => {
    return baseClient.post('/auth/users', credentials)
        .then(() => getToken(credentials))
}
export const loadUserInfo = async () => {
    return secureClient.get('/auth/me')
        .then(r => r.data as MeResponse)
        .then(r => store.dispatch.auth.setUserInfo({
            username: r.username,
            roles: r.authorities.map(it => it.authority)
        }))
}
export const logout = async () => {
    return store.dispatch.auth.logout()
}

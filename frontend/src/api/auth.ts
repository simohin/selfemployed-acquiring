import {baseClient} from "./client";
import {Credentials, TokenResponse} from "./types";
import {store} from "../store/models";
import {loadProfile} from "./profile";

export const getToken = async (credentials: Credentials) => {
    return baseClient.post('/auth/tokens', credentials)
        .then(r => r.data as TokenResponse)
        .then(r => store.dispatch.auth.setToken(r.token))
        .then(() => loadProfile())
}
export const register = async (credentials: Credentials) => {
    return baseClient.post('/auth/users', credentials)
        .then(() => getToken(credentials))
}
export const logout = async () => {
    return store.dispatch.auth.logout()
}

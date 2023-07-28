import {secureClient} from "./client";
import {ProfileResponse} from "./types";
import {store} from "../store/models";

export const loadProfile = async () => {
    return secureClient.get('/profile')
        .then(r => r.data as ProfileResponse)
        .then(r => store.dispatch.auth.setUserInfo({
            username: r.username,
            roles: r.roles
        }))
}

import {createModel} from "@rematch/core";
import {RootModel} from "./models";
import {UserRole} from "../api/types";

type UserInfo = {
    username: string,
    roles: UserRole[]
}

type AuthState = {
    isLoggedIn: boolean,
    token: string | undefined,
    userInfo: UserInfo | undefined,
}

export const auth = createModel<RootModel>()({
    state: {
        isLoggedIn: false,
        token: undefined,
        userInfo: undefined,
    } as AuthState,
    reducers: {
        set(state, payload) {
            return {...state, ...payload}
        }
    },
    effects: (dispatch) => ({
        setUserInfo(userInfo: UserInfo) {
            dispatch.auth.set({userInfo: userInfo})
        },
        setToken(token: string) {
            dispatch.auth.set({
                token: token,
                isLoggedIn: true
            })
        },
        logout() {
            dispatch({ type: 'RESET_APP' });
        }
    })
})

import {createModel} from "@rematch/core";
import {RootModel} from "./models";
import {Merchant} from "../api/types";

type MerchantsState = {
    items: Merchant[]
}

export const merchants = createModel<RootModel>()({
    state: {
        items: [],
    } as MerchantsState,
    reducers: {
        set(state, payload) {
            return {...state, ...payload}
        }
    },
    effects: (dispatch) => ({

        setMerchants(merchants: Merchant[]) {
            dispatch.merchants.set({items: merchants})
        },
    })
})

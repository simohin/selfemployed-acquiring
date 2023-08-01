import {secureClient} from "./client";
import {Merchant} from "./types";
import {store} from "../store/models";

export const loadMerchants = async () => {
    return secureClient.get('/merchants')
        .then(r => r.data as Merchant[])
        .then(store.dispatch.merchants.setMerchants)
}

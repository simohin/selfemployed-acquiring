import {init, Models, RematchDispatch, RematchRootState} from "@rematch/core";
import {ExtraModelsFromLoading} from '@rematch/loading'
import persistPlugin from "@rematch/persist";
import storage from "redux-persist/lib/storage";
import {auth} from "./auth";
import {merchants} from "./merchants";

export interface RootModel extends Models<RootModel> {
    auth: typeof auth,
    merchants: typeof merchants
}

const models: RootModel = {auth, merchants}

const persistConfig = {
    key: "root",
    storage,
};
export const store = init<RootModel, ExtraModelsFromLoading<RootModel>>({
    models,
    redux: {
        rootReducers: {RESET_APP: () => undefined}
    },
    plugins: [persistPlugin(persistConfig)]
})

export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel>

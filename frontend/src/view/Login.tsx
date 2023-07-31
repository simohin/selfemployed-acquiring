import {getToken} from "../api/auth";
import React from "react";
import {CredentialsInputForm} from "../component/common/form/CredentialsInputForm";
import {ViewContainer} from "../component/common/container/ViewContainer";

type Props = {
    onSuccess: () => void
}

export const Login: React.FC<Props> = (props) => (
    <ViewContainer>
        <CredentialsInputForm
            titleText={'Добро пожаловать!'}
            buttonText={'Войти'}
            onSubmit={getToken}
            onSuccess={props.onSuccess}
            inputIdPrefix={'login'}
        />
    </ViewContainer>
)

import {register} from "../api/auth";
import React from "react";
import {CredentialsInputForm} from "../component/common/form/CredentialsInputForm";
import {ViewContainer} from "../component/common/container/ViewContainer";

type Props = {
    onSuccess: () => void
}

export const Register: React.FC<Props> = (props) => (
    <ViewContainer>
        <CredentialsInputForm
            titleText={'Создайте пользователя'}
            buttonText={'Зарегистрироваться'}
            onSubmit={register}
            onSuccess={props.onSuccess}
            inputIdPrefix={'register'}
        />
    </ViewContainer>
)

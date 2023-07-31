import {Divider, Typography} from "@mui/material";
import React from "react";
import {ViewContainer} from "../component/common/container/ViewContainer";

export const Merchant = () => {
    return (
        <ViewContainer>
            <Typography variant={'h1'}>Мерчанты</Typography>
            <Divider/>
        </ViewContainer>
    )
}

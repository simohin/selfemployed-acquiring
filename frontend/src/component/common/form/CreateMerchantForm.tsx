import {Box, TextField} from "@mui/material";
import React from "react";

export const CreateMerchantForm = () => (
    <Box
        sx={{m: '16px'}}
        component="form"
        noValidate
        autoComplete="off"
    >
        <TextField id="name" label="Имя торговой точки"/>
    </Box>
)

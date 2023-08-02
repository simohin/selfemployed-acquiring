import {ButtonProps, IconButton, styled} from "@mui/material";
import {ShadowProperties} from "./Shadow";

export const CreateIconButton = styled(IconButton)<ButtonProps>(({theme}) => ({
    ...ShadowProperties,
    color: theme.palette.getContrastText(theme.palette.success.main),
    backgroundColor: theme.palette.success.main,
    '&:hover': {
        backgroundColor: theme.palette.success.dark,
    },
}));

import {ButtonProps, IconButton, styled} from "@mui/material";
import {ShadowProperties} from "./Shadow";


export const CloseIconButton = styled(IconButton)<ButtonProps>(({theme}) => ({
    ...ShadowProperties,
    color: theme.palette.getContrastText(theme.palette.error.main),
    backgroundColor: theme.palette.error.main,
    '&:hover': {
        backgroundColor: theme.palette.error.dark,
    },
}));

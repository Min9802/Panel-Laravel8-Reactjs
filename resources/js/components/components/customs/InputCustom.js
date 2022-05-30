import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import { Button, IconButton } from "@material-ui/core";
/**
 *
 * Properties:
 *
 * - iconStart: iconStart
 * - iconEnd: iconEnd
 * - InputProps: InputProps
 * - props: props
 *
 */
const InputCustom = ({
    iconStart,
    handleFunc,
    iconEnd,
    InputProps,
    ...props
}) => {
    return (
        <TextField
            {...props}
            InputProps={{
                ...InputProps,
                startAdornment: iconStart ? (
                    <InputAdornment position="start">
                        {iconStart}
                    </InputAdornment>
                ) : null,
                endAdornment: iconEnd ? (
                    <IconButton onClick={handleFunc}>
                        <InputAdornment position="end">
                            {iconEnd}
                        </InputAdornment>
                    </IconButton>
                ) : null,
            }}
        />
    );
};

export default InputCustom;

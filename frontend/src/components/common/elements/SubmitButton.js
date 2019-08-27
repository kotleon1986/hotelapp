import React from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import classnames from 'classnames';

const SubmitButton = (props) => (
    <Button
        type="submit"
        variant="contained"
        fullWidth={!props.size}
        size={props.size || 'medium'}
        color={props.color || 'primary'}
        className={classnames('submit-button', {...props.className || ''})}
        onClick={props.submit}
        disabled={props.loader}
        style={{margin: "1em 0"}}
    >
        {props.icon || ''}
        {!props.loader && <span>{props.text}</span>}
        {props.loader && <CircularProgress color={'inherit'} size={24} />}
    </Button>
);

export default SubmitButton;
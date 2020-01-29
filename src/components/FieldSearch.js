import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";

const useStyles = theme => ({
    root: {
        padding: theme.spacing(1),
        display: 'flex',
    },
    input: {
        margin: theme.spacing(1),
    },
    iconButton: {
        padding: theme.spacing(1),
    }
});

class FieldSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: ''
        };
    }

    handleChange = e => {
        this.setState({searchValue: e.target.value});
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.onSearchChange(this.state.searchValue);
    };

    render() {
        const {classes, searchPlaceholder} = this.props;
        return (
            <Paper component={'form'} onSubmit={this.handleSubmit} className={classes.root}>
                <Input
                    value={this.state.searchValue}
                    onChangeCapture={this.handleChange}
                    className={classes.input}
                    placeholder={searchPlaceholder}
                    disableUnderline
                    fullWidth
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton onClick={this.handleSubmit} className={classes.iconButton} aria-label="search">
                                <SearchIcon/>
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </Paper>
        )
    }
}

FieldSearch.propTypes = {
    searchPlaceholder: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired
};

export default withStyles(useStyles)(FieldSearch);
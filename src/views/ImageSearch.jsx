import React from 'react';
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FieldSearch from "../components/FieldSearch";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import {Redirect, withRouter} from "react-router-dom";
import {inject, observer} from "mobx-react";


const useStyles = theme => ({
    root: {
        margin: theme.spacing(2)
    }
});

@inject("imageStore")
@observer
class ImageSearch extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            filter: ''
        };
    }

    handleFilter = (searchValue) => {
        this.setState({filter: searchValue, isLoading: true}, this.handleSearch);
    };

    handleSearch = () => {
        this.props.imageStore.filter = this.state.filter;
        return (<Redirect to='/search-results' />)
    };

    onClickAlert = (isOpen) => {
        this.setState({errorOpen: isOpen});
    };


    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Grid container justify="space-around" spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h3" gutterBottom>
                            {this.props.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FieldSearch searchPlaceholder="Search Images..." onSearchChange={this.handleFilter}/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

ImageSearch.propTypes = {
    title: PropTypes.string.isRequired
};

export default withRouter(withStyles(useStyles)(ImageSearch));
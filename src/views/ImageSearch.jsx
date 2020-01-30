import React from 'react';
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FieldSearch from "../components/FieldSearch";
import Typography from "@material-ui/core/Typography";
import {withRouter} from "react-router-dom";

const useStyles = theme => ({
    root: {
        margin: theme.spacing(2)
    }
});

class ImageSearch extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
    }

    handleFilter = (searchValue) => {
        this.setState({filter: searchValue, isLoading: true}, this.handleSearch);
    };

    handleSearch = () => {
        this.props.history.push({ pathname: "/search-results", search: "?page=1&&q=" + this.state.filter });
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Grid container justify="space-around" spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h3" gutterBottom>
                            NASA Image Library
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

export default withRouter(withStyles(useStyles)(ImageSearch));
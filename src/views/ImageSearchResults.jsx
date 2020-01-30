import React from 'react';
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import Alert from "@material-ui/lab/Alert";
import FieldSearch from "../components/FieldSearch";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {inject, observer} from "mobx-react";
import ImageGrid from "../components/ImageGrid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import {ScrollTop} from "../components/ScrollTop";
import queryString from 'query-string';
import {withRouter} from "react-router-dom";


const useStyles = theme => ({
    root: {
        margin: theme.spacing(4)
    },
    toolbar: {
        backgroundColor: '#282c34',
        marginBottom: theme.spacing(4)
    },
    buttonRight: {
        textAlign: 'right'
    },
    buttonLeft: {
        textAlign: 'left'
    },
    buttonCenter: {
        textAlign: 'center'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: 'white',
    },
});

@inject("imageStore")
@observer
class ImageSearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorOpen: false,
            isLoading: false,
        };
    }

    componentDidUpdate(){
        window.onpopstate  = () => {
            const values = queryString.parse(this.props.location.search);
            this.props.imageStore.filter = values.q;
            this.props.imageStore.page = parseInt(values.page);
            this.setState({isLoading: true}, this.handleSearch);
        }

    }

    componentDidMount() {
        const values = queryString.parse(this.props.location.search);
        this.props.imageStore.filter = values.q;
        this.props.imageStore.page = parseInt(values.page);
        this.setState({isLoading: true}, this.handleSearch);
    }

    handleFilter = (searchValue) => {
        this.props.imageStore.reset();
        this.props.imageStore.filter = searchValue;
        this.updateUrlParams();
        this.setState({isLoading: true}, this.handleSearch);
    };

    handleSearch = async () => {

        await this.props.imageStore.getImages();
        this.setState({isLoading: false});
    };

    handleNext = async () => {
        this.props.imageStore.nextPage();
        this.updateUrlParams();
        this.setState({isLoading: true}, this.handleSearch);
    };

    handlePrev = async () => {
        this.props.imageStore.prevPage();
        this.updateUrlParams();
        this.setState({isLoading: true}, this.handleSearch);
    };

    updateUrlParams = () => {
        this.props.history.push({ pathname: "/search-results", search: "?page=" + this.props.imageStore.page + "&&q=" + this.props.imageStore.filter });
    };

    onClickAlert = (isOpen) => {
        this.setState({errorOpen: isOpen});
    };

    render() {
        const {isLoading, errorOpen} = this.state;
        const {classes, imageStore} = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.toolbar}>
                    <Toolbar id="back-to-top-anchor" >
                        <Typography variant="h6" className={classes.title}>
                            NASA Image Library
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid container justify="space-around" spacing={3}>
                    <Grid item xs={12}>
                        <FieldSearch searchPlaceholder="Search Images..." onSearchChange={this.handleFilter}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Backdrop className={classes.backdrop} open={isLoading}>
                            <CircularProgress color="inherit"/>
                        </Backdrop>
                    </Grid>
                    {!isLoading && <Grid item xs={12}>
                        <Typography
                            color={"textSecondary"}>{imageStore.startDisplayCount}-{imageStore.endDisplayCount} of {imageStore.totalHits} for "{imageStore.filter}"</Typography>
                    </Grid>}
                    {imageStore.imagesLength > 0 && <Grid item xs={12}>
                        <Grid container justify="space-around" spacing={3}>
                            <Grid item xs={12}><ImageGrid images={imageStore.images}/></Grid>
                            <Grid item xs className={classes.buttonRight}>
                                <Button onClick={this.handlePrev} variant="contained" disabled={!imageStore.hasPrev}>
                                    Prev
                                </Button>

                            </Grid>
                            <Grid item className={classes.buttonCenter}>
                                <ScrollTop>
                                    <Fab color="primary" size="small" aria-label="scroll back to top">
                                        <KeyboardArrowUpIcon />
                                    </Fab>
                                </ScrollTop>
                            </Grid>
                            <Grid item xs className={classes.buttonLeft}>
                                <Button onClick={this.handleNext} variant="contained" disabled={!imageStore.hasNext}>
                                    Next
                                </Button>

                            </Grid>
                        </Grid>

                    </Grid>}
                    {!isLoading && imageStore.imagesLength === 0 && imageStore.status === 'success' && <Grid item xs={12}>
                        <Alert severity="info">
                            Based on your selections, no results were found.
                        </Alert>
                    </Grid>}
                    {imageStore.status === 'error' && errorOpen && <Grid item xs={12}>
                        <Alert
                            severity="error"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        this.onClickAlert(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit"/>
                                </IconButton>
                            }
                        >
                            Something went wrong. Please contact your admin.
                        </Alert>
                    </Grid>}

                </Grid>

            </div>
        );
    }
}

export default withRouter(withStyles(useStyles)(ImageSearchResults));
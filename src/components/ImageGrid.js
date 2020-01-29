import React from 'react';
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import InfoIcon from '@material-ui/icons/Info';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Chip from "@material-ui/core/Chip";

const useStyles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    icon: {
        color: 'white',
    },
    date: {
        fontStyle: 'italic'
    },
    keywords: {
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1)
    }
});

class ImageGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imageInfo: null,
            openDialog: false
        };
    }

    handleClickOpen = (e, image) => {
        this.setState({imageInfo: image, openDialog: true});
    };

    handleClose = () => {
        this.setState({openDialog: false});
    };

    render() {
        const {classes, images} = this.props;
        const {imageInfo, openDialog} = this.state;
        return (
            <div className={classes.root}>
                <Grid container justify="space-around" spacing={3}>

                    {images.map(image => (
                        <Grid item key={image.id} xs={6} sm={4} md={3} lg={2} xl={1}>
                            <Card>
                                <CardActionArea>
                                    <CardMedia component="img"
                                               alt={image.title}
                                               image={image.thumbnail}
                                               title={image.title}
                                    />
                                    <GridListTileBar
                                        title={image.title}
                                        subtitle={<span>{image.description}</span>}
                                        onClick={(e) => {this.handleClickOpen(e, image)}}
                                        actionIcon={<span className={classes.icon}> <InfoIcon /></span>}
                                    />
                                </CardActionArea>
                            </Card>

                        </Grid>
                    ))}
                    {openDialog && <Dialog
                        maxWidth={"sm"}
                        open={openDialog}
                        onClose={this.handleClose}
                    >
                        <DialogTitle id="alert-dialog-title">{imageInfo.title}</DialogTitle>
                        <DialogContent>
                            <Grid container justify="space-around" spacing={3}>
                                <Grid item xs={12}>
                                    <CardMedia
                                        component="img"
                                        alt={imageInfo.title}
                                        image={imageInfo.thumbnail}
                                        title={imageInfo.title}
                                    />
                                </Grid>
                                {imageInfo.keywords.length > 0 && <Grid item xs={12}>
                                    {imageInfo.keywords.map(keyword => (
                                        <Chip  key={keyword} className={classes.keywords} variant="outlined" color="primary" label={keyword}/>))}
                                </Grid>}
                                <Grid item xs={12}>
                                    <Typography gutterBottom
                                                variant={'subtitle1'}>{imageInfo.description}</Typography>
                                    <Typography variant="caption" className={classes.date} gutterBottom>
                                        Date Created: {imageInfo.createdDate}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </DialogContent>
                    </Dialog>}
                </Grid>
            </div>


        );
    }

}

ImageGrid.propTypes = {
    images: PropTypes.array.isRequired
};

export default withStyles(useStyles)(ImageGrid);
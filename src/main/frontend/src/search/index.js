import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
        width: '100%',
        maxWidth: '100px',
        marginTop: theme.spacing.unit * 2
    }
})

class Stats extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            loading: false
        }
    }

    onKeyPress = (target) => {
        if(this.props.loading) {
            return;
        }

        if(target.charCode === 13) {
            this.onClickSearch();
        }
    }

    onChangeName = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    onClickSearch = () => {
        this.props.getUserInfo(this.state.name);
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container direction="column" justify="flex-start" alignItems="center" style={{marginTop: 30}}>
                    <Grid item xs={12}>
                        <Typography color="textPrimary" variant="h1">
                            Search
                        </Typography>
                    </Grid>
                    <Grid container justify="center" spacing={16}>
                        <Grid item xs={7} sm={6} md={5} lg={4}>
                            <TextField
                                id="filled-name-input"
                                label="Nickname"
                                type="text"
                                name="nickname"
                                fullWidth={true}
                                value={this.state.name}
                                onChange={this.onChangeName}
                                onKeyPress={this.onKeyPress}
                                margin="none"
                            />
                        </Grid>
                        <Grid item xs={2} sm={1} md={1} lg={1}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                onClick={this.onClickSearch}
                                disabled={this.props.loading}>
                                {!this.props.loading
                                    ? <FontAwesomeIcon icon='search' size="2x"/>
                                    : <FontAwesomeIcon className="loading" icon="spinner" size="2x"/>
                                }
                            </Button>
                        </Grid>
                </Grid>
            </Grid>
        );
    }
};

export default withStyles(styles)(Stats);
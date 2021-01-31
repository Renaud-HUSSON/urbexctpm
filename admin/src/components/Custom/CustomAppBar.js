import { AppBar } from 'react-admin';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import '../../styles/font.css'

const useStyles = makeStyles({
    title: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        cursor: 'pointer',
        fontFamily: 'Shadows into light',
        fontSize: '1.5rem'
    },
    spacer: {
        flex: 1,
    }
});

const CustomAppBar = props => {
    const classes = useStyles();

    const handleClick = () => {
      window.location = '/'
    }
    
    return (
        <AppBar {...props} className={classes.appBar}>
            <Typography className={classes.title} onClick={handleClick}>urbexctpm</Typography>
            <span className={classes.spacer} />
        </AppBar>
    );
};

export default CustomAppBar;
import { useState, useContext } from 'react'
import Appbar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import RateReviewIcon from '@material-ui/icons/RateReview';
import { Badge, Menu, MenuItem, Modal, Backdrop, Fade, Select, Divider } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import fire from '../functions/FirebaseInitialize';
import {AuthContext} from '../functions/AuthContext';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    menuItem: {
        [theme.breakpoints.down('md')]: {
            marginRight: 7
        },
        [theme.breakpoints.up('md')]: {
            marginRight: 20
        }
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },

}));

function Navbar({ user, themev, changeTheme }) {
    const {currentUser} = useContext(AuthContext);
    const history = useHistory();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const isMenuOpen = Boolean(anchorEl);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
        console.log(isMenuOpen);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        console.log('ssssssssssssssssssssssss')
        fire.auth().signOut();
        handleMenuClose();
        history.push('/');

    }
    const handleModalOpen = () => {
        setIsOpen(true);
        handleMenuClose();
    }
    const handleModalClose = () => {
        setIsOpen(false);
        handleMenuClose();
    }
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            
            <MenuItem onClick={handleMenuClose} component={Link} to='/profile/12'>My Profile</MenuItem>
            <MenuItem onClick={handleModalOpen}>Settings</MenuItem>
            <Divider />
            {currentUser ? <MenuItem onClick={handleLogout}>Logout</MenuItem>
                : <MenuItem onClick={handleMenuClose} component={Link} to='/Login'>Login</MenuItem>
            }
        </Menu>
    );
    return (
        <div className={classes.root}>
            <Appbar position='static'>
                <Toolbar>

                    <Typography variant='h6' className={classes.title}>
                        iWatchedit
                    </Typography>

                    <div >
                        <IconButton eedge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                            className={classes.menuItem}>
                            <AccountCircle />
                        </IconButton>
                        <IconButton edge='end' component={Link} to='/' color='inherit' className={classes.menuItem}>
                            <WhatshotIcon />
                        </IconButton>
                        <IconButton edge='end' component={Link} to='/reviews' color='inherit' className={classes.menuItem}>
                            <Badge badgeContent={11} color='secondary'>
                                <RateReviewIcon />
                            </Badge>
                        </IconButton>
                    </div>
                    {renderMenu}
                </Toolbar>
            </Appbar>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={isOpen}
                onClose={handleModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isOpen}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Settings</h2>
                        <p id="transition-modal-description">Theme:  
                        
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={themev}
          onChange={(e)=>changeTheme(e.target.value)}
        >
          <MenuItem value={'dark'}>Dark</MenuItem>
          <MenuItem value={'light'}>Light</MenuItem>
        </Select>

                        </p>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default Navbar

//import logo from './logo.svg';
import './App.css';
import React,{Component} from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Container from '@material-ui/core/Container';
import { fade, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SvgIcon from '@material-ui/core/SvgIcon';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ComputerIcon from '@material-ui/icons/Computer';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

const useStyles3 = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
//   root: {
//     '&:focus': {
//       backgroundColor: theme.palette.primary.main,
//       '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
//         color: theme.palette.common.black,
//       },
//     },
//   },
 }))(MenuItem);

const drawerWidth = 240;
const useStyles1 = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const useStyles2 = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    //flexGrow: 1,
    marginLeft: "250px",
    padding: theme.spacing(3),
  },


  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

//const classes = useStyles();


export default function PrimarySearchAppBar() {
  const classes3 = useStyles3();
  const bull = <span className={classes3.bullet}>•</span>;

  const [uploadFile, setUploadFile] = React.useState();
  const [superHero, setSuperHero] = React.useState();

  const classes2 = useStyles1();

  const submitForm = (event) => {
    event.preventDefault();

    const dataArray = new FormData();
    dataArray.append("superHeroName", superHero);
    dataArray.append("uploadFile", uploadFile);

    axios
      .post("api_url_here", dataArray, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then((response) => {
        // successfully uploaded response
      })
      .catch((error) => {
        // error response
      });
  };

  const [anchorEl1, setAnchorEl1] = React.useState(null);

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  const classes = useStyles();
  const classes1 = useStyles1();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton >
          <Badge color="secondary">
            <SettingsIcon />
          </Badge>
        </IconButton>
        {/* <p>Messages</p> */}
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" >
          <Badge color="secondary">
            <HelpOutlineIcon />
          </Badge>
        </IconButton>
        {/* <p>Notifications</p> */}
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          // color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <main>
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appBar} color="default">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            // color="inherit"
            aria-label="open drawer"
          >
            <SvgIcon>
            <svg>
              <path d="M7.71,3.5L1.15,15L4.58,21L11.13,9.5M9.73,15L6.3,21H19.42L22.85,15M22.28,14L15.42,2H8.58L8.57,2L15.43,14H22.28Z" />
            </svg>
            </SvgIcon>
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Drive
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" >
              <Badge color="secondary">
                <HelpOutlineIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" >
              <Badge color="secondary">
                <SettingsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              // color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              // color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
    {/* <Container> */}
    <div className={classes.grow}>
      {/* <CssBaseline /> */}
      
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <div>
        <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="outlined"
        // color="inherit"
        className={classes1.button}
        startIcon={<AddIcon />}
        onClick={handleClick1}
      >
        New
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl1}
        keepMounted
        open={Boolean(anchorEl1)}
        onClose={handleClose1}
      >
        <StyledMenuItem>
         {/* type="file" onChange={(e) => setUploadFile(e.target.files)}> */}
          <ListItemIcon>
            
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <div id="max">
      <form onSubmit={submitForm}>
        {/* <input
          type="text"
          onChange={(e) => setSuperHero(e.target.value)}
          placeholder={"Superhero Name"}
        />
        <br /> */}
        <input type="file" onChange={(e) => setUploadFile(e.target.files)}
        // style={{visibility:"Collapse"}} 
        />
        {/* <br /> */}
        {/* <input type="submit" /> */}
      </form>
    </div>
          
          <ListItemText primary="Folder" />
        </StyledMenuItem>
        <Divider />
        <StyledMenuItem>
          <ListItemIcon>
            <DraftsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="File Upload" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <InboxIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Folder Upload" />
        </StyledMenuItem>
      </StyledMenu>
      </div>

          <List>
            {/* {['My Drive', 'Computers', 'Shared with me', 'Recent'].map((text, index) => ( */}
              <ListItem button >
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="My Drive" />
                </ListItem>
                <ListItem button >
                <ListItemIcon>
                  <ComputerIcon />
                </ListItemIcon>
                <ListItemText primary="Computers" />
                </ListItem>
                <ListItem button >
                <ListItemIcon>
                  <SupervisorAccountIcon />
                </ListItemIcon>
                <ListItemText primary="Shared with me" />
                </ListItem>
                <ListItem button >
                <ListItemIcon>
                  <AccessTimeIcon />
                </ListItemIcon>
                <ListItemText primary="Recent" />
                </ListItem>
                <ListItem button >
                <ListItemIcon>
                  <StarOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Starred" />
                </ListItem>
                <ListItem button >
                <ListItemIcon>
                  <DeleteOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Trash" />
                </ListItem>
                {/* <ListItemIcon>
                  <ComputerIcon />
                  <Typography>Computers</Typography>
                </ListItemIcon>
                <ListItemIcon>
                  <InboxIcon />
                  <Typography>Shared with me</Typography>
                </ListItemIcon>
                <ListItemIcon>
                  <InboxIcon />
                  <Typography>Recent</Typography>
                </ListItemIcon>
                
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <ComputerIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem> */}
            {/* ))} */}
          </List>
          <Divider />
          <List>
              <ListItem button>
                <ListItemIcon>
                  <CloudQueueIcon /> 
                </ListItemIcon>
              <ListItemText primary="Storage" />
              </ListItem>
           
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
       
        <Typography paragraph>
        <Grid container spacing={5}>
        <Grid item lg={4}>
        <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
         
        </Typography>
        <Typography variant="h5" component="h2">
         PDF
        </Typography>
        <br />
        <Divider />
        <Typography className={classes.pos} color="textSecondary">
          Rules to adhere
        </Typography>
        <Typography variant="body2" component="p">
          you uploaded it past year.
          <br />
          {/* {'"a benevolent smile"'} */}
        </Typography>
      </CardContent>
      
    </Card>
    </Grid>

    <Grid item lg={4}>
        <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
         
        </Typography>
        <Typography variant="h5" component="h2">
         Word
        </Typography>
        <br />
        <Divider />
        <Typography className={classes.pos} color="textSecondary">
          Resume
        </Typography>
        <Typography variant="body2" component="p">
          you opened it yesterday.
          <br />
          {/* {'"a benevolent smile"'} */}
        </Typography>
      </CardContent>
      
    </Card>
    </Grid>

    <Grid item lg={4}>
        <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
         
        </Typography>
        <Typography variant="h5" component="h2">
         Power Point
        </Typography>
        <br />
        <Divider />
        <Typography className={classes.pos} color="textSecondary">
          React Lifecycle and Forms
        </Typography>
        <Typography variant="body2" component="p">
          Edited in the past month.
          <br />
          {/* {'"a benevolent smile"'} */}
        </Typography>
      </CardContent>
      
    </Card>
    </Grid>

    </Grid>
              
              
        </Typography>

<br />
<Divider />
<br />
<br />
        <Typography paragraph>
        <div className={classes2.root}>
      <Paper elevation={12} >
      <form onSubmit={submitForm}>
        {/* <input
          type="text"
          onChange={(e) => setSuperHero(e.target.value)}
          placeholder={"Superhero Name"}
        />
        <br /> */}
        <input type="file" onChange={(e) => setUploadFile(e.target.files)}
        // style={{visibility:"Collapse"}} 
        />
        {/* <br /> */}
        {/* <input type="submit" /> */}
      </form>
        </Paper>
    </div>
        </Typography>
      </main>
    </div>
    {/* </Container> */}
    </main>
  );
}

//export default App;

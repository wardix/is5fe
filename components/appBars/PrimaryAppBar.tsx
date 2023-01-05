import { FeedbackOutlined } from '@mui/icons-material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HelpOutline from '@mui/icons-material/HelpOutline';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {
  Avatar,
  Divider,
  Fade,
  List,
  ListItemButton,
  ListItemText,
  Popper,
  Tooltip,
  useScrollTrigger,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import { grey } from '@mui/material/colors';
import Link from 'next/link';
import { Fragment, cloneElement, useState } from 'react';
import FeedbackDialog from '../dialogs/FeedbackDialog';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children?: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return cloneElement(children || <></>, {
    elevation: trigger ? 4 : 0,
  });
}

export default function PrimaryAppBar(props: Props) {
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [notificationAnchorEl, setNotificationAnchorEl] =
    useState<null | HTMLElement>(null);
  const [feedbackOpen, setFeedbackOpen] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const sampleData = Array.from(Array(10));
  const isProfileMenuOpen = Boolean(profileAnchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuToggle = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setNotificationAnchorEl(event.currentTarget);
    setIsNotificationOpen((prev) => !prev);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleFeedbackClose = () => {
    setFeedbackOpen(false);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-account-menu';
  const renderProfileMenu = (
    <Menu
      anchorEl={profileAnchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isProfileMenuOpen}
      onClose={handleProfileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleProfileMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="send user feedback"
          color="inherit"
        >
          <FeedbackOutlined />
        </IconButton>
        <p>Send Feedback</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="open help menu" color="inherit">
          <HelpOutline />
        </IconButton>
        <p>Help</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={sampleData.length} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const renderNotificationList = (
    <Popper
      open={isNotificationOpen}
      anchorEl={notificationAnchorEl}
      placement="bottom-end"
      sx={{ zIndex: 1100 }}
      transition
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Box
            sx={{
              width: 320,
              maxHeight: 400,
              overflowY: 'auto',
              border: '1px solid #d3d4d5',
              bgcolor: 'background.paper',
              borderRadius: '4px',
            }}
          >
            <List
              sx={{ position: 'relative', bgcolor: 'background.paper' }}
              onClick={handleNotificationMenuClose}
            >
              {sampleData.map((data, idx) => {
                return (
                  <Fragment key={idx}>
                    <ListItemButton>
                      <Avatar>IS</Avatar>
                      <Box ml={2}>
                        <h5>This is Judul OK?</h5>
                        <ListItemText>{Math.random()}</ListItemText>
                      </Box>
                    </ListItemButton>
                    <Divider />
                  </Fragment>
                );
              })}
              <ListItemButton
                sx={[
                  {
                    position: 'sticky',
                    bottom: 0,
                    bgcolor: 'background.paper',
                    borderTop: '1px solid' + grey[300],
                  },
                  { '&:hover': { bgcolor: grey[200] } },
                ]}
              >
                <ListItemText
                  sx={{
                    textAlign: 'center',
                    fontStyle: 'italic',
                  }}
                >
                  <Link href="/">Show all notifications</Link>
                </ListItemText>
              </ListItemButton>
            </List>
          </Box>
        </Fade>
      )}
    </Popper>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1, height: '100%', mb: 8 }}>
        <ElevationScroll {...props}>
          <AppBar variant="elevation" color="primary">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Tooltip title="Feedback">
                  <IconButton
                    size="large"
                    aria-label="send user feedback"
                    color="inherit"
                    onClick={() => setFeedbackOpen(true)}
                  >
                    <FeedbackOutlined />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Help">
                  <IconButton
                    size="large"
                    aria-label="open help menu"
                    color="inherit"
                  >
                    <HelpOutline />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Notification">
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                    onClick={handleNotificationMenuToggle}
                  >
                    <Badge badgeContent={sampleData.length} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
        {renderMobileMenu}
        {renderProfileMenu}
        {renderNotificationList}
      </Box>
      <FeedbackDialog
        open={feedbackOpen}
        onClose={handleFeedbackClose}
      ></FeedbackDialog>
    </>
  );
}

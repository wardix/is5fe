import { navItemsAtom } from '@/store/GlobalStore';
import { NavChild, NavParent } from '@/types/GlobalType';
import { useIsomorphicLayoutEffect } from '@/utils/index';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Collapse } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { CSSObject, Theme, styled, useTheme } from '@mui/material/styles';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

interface PrimaryDrawerProps {
  open: boolean;
  children?: React.ReactNode;
  setDrawerOpen?: (status: boolean) => void;
}

export default function PrimaryDrawer({
  setDrawerOpen,
  open,
  children,
}: PrimaryDrawerProps) {
  const theme = useTheme();
  const router = useRouter();
  const [navItems, setNavItems] = useAtom(navItemsAtom);
  const [openedNavParents, setOpenedNavParents] = useState<string[]>([]);

  useIsomorphicLayoutEffect(() => {
    const splittedRoutePath = router.asPath.split('/');
    for (let nav of navItems) {
      if (nav.path === `/${splittedRoutePath[1]}`) {
        setOpenedNavParents([...openedNavParents, nav.path]);
        break;
      }
    }
  }, [router]);

  const handleDrawerClose = () => {
    setDrawerOpen && setDrawerOpen(false);
  };

  const handleClickNavItem = (navItem: NavParent | NavChild) => {
    if (!navItem.isParent) return router.push(navItem.path);
    setDrawerOpen && setDrawerOpen(true);
    let newOpenedNavParents = openedNavParents;
    if (openedNavParents.includes(navItem.path))
      newOpenedNavParents = openedNavParents.filter(
        (path) => path !== navItem.path
      );
    else newOpenedNavParents = [...openedNavParents, navItem.path];
    setOpenedNavParents(newOpenedNavParents);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              p: 2,
              mx: 2,
            }}
          >
            <Image src="/next.svg" alt="Brand Logo" fill />
          </Box>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navItems.map((navItem, index) => (
            <ListItem
              key={navItem.path}
              disablePadding
              sx={{ display: 'block' }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                selected={router.asPath === navItem.path}
                onClick={() => {
                  handleClickNavItem(navItem);
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {/* fixme: Icon component for font-icon  */}
                  {/* <Icon>{navItem.icon}</Icon> */}
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={navItem.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
                {open && navItem.isParent && navItem.children?.length ? (
                  open && openedNavParents.includes(navItem.path) ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )
                ) : null}
              </ListItemButton>
              {navItem.isParent && navItem.children?.length
                ? navItem.children.map((child) => (
                    <Collapse
                      key={`nav_${child.path}`}
                      in={openedNavParents.includes(navItem.path) && open}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        <ListItemButton
                          selected={router.asPath === child.path}
                          sx={{ pl: 8 }}
                          onClick={() => handleClickNavItem(child)}
                        >
                          <ListItemText
                            primary={child.name}
                            sx={{ fontSize: theme.typography.body2 }}
                          />
                        </ListItemButton>
                      </List>
                    </Collapse>
                  ))
                : null}
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box sx={{ p: 4 }}>{children}</Box>
    </Box>
  );
}

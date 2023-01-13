import {
  helpContentsAtom,
  isOpenHelpDrawerAtom,
  selectedHelpContentAtom,
} from '@/store/GlobalStore';
import theme from '@/utils/theme';
import { ArrowBack, Close, ExpandMore } from '@mui/icons-material';
import {
  Box,
  Button,
  Collapse,
  Drawer,
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import { useAtom } from 'jotai';
import { useCallback, useState } from 'react';

const drawerWidth = { sm: '100vw', md: 360 };

const HelpDrawer: React.FC = () => {
  const [open, setOpen] = useAtom(isOpenHelpDrawerAtom);
  const [helpContents, setHelpContents] = useAtom(helpContentsAtom);
  const [openedHelpItems, setOpenedHelpItems] = useState<string[]>([]);
  const [selectedHelpContent, setSelectedHelpContent] = useAtom(
    selectedHelpContentAtom
  );

  const handleClickHelpItem = useCallback(
    (id: string) => {
      if (!openedHelpItems.includes(id))
        return setOpenedHelpItems([...openedHelpItems, id]);
      return setOpenedHelpItems(openedHelpItems.filter((item) => item !== id));
    },
    [openedHelpItems]
  );

  const ListHelp = (
    <List>
      {helpContents.map((helpItem, index) => (
        <ListItem
          key={helpItem.id}
          disablePadding
          sx={{ display: 'block', borderRadius: 1 }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
            onClick={() => handleClickHelpItem(helpItem.id)}
          >
            <ListItemText
              primary={helpItem.label}
              sx={{ opacity: open ? 1 : 0 }}
            />
            <ExpandMore
              sx={{
                transform: `rotate(${
                  openedHelpItems.includes(helpItem.id) ? 180 : 0
                }deg)`,
                transition: theme.transitions.create('transform', {
                  delay: 0.2,
                }),
              }}
            />
          </ListItemButton>
          {helpItem.contents?.length
            ? helpItem.contents.map((content) => (
                <Collapse
                  key={`help_content_${content.embeddedLink}`}
                  in={openedHelpItems.includes(helpItem.id)}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    <ListItemButton
                      sx={{ pl: 2 }}
                      onClick={() =>
                        setSelectedHelpContent(content.embeddedLink)
                      }
                    >
                      <ListItemText
                        primary={content.label}
                        sx={{
                          fontSize: theme.typography.body2,
                          color: theme.palette.primary.main,
                        }}
                      />
                    </ListItemButton>
                  </List>
                </Collapse>
              ))
            : null}
        </ListItem>
      ))}
    </List>
  );

  // const handleClickHelpContent = (content)=>{

  // }

  const handleCloseHelpDrawer = () => {
    setOpenedHelpItems([]);
    setSelectedHelpContent(null);
    setOpen(false);
  };

  return (
    <>
      <Drawer
        open={open}
        anchor="right"
        variant="persistent"
        hideBackdrop
        elevation={8}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 2,
            py: 2,
          }}
        >
          <Typography variant="h5" component="h2" fontWeight={600}>
            Help
          </Typography>
          <div>
            <IconButton
              aria-label="close help drawer"
              color="inherit"
              onClick={handleCloseHelpDrawer}
            >
              <Close fontWeight={600} />
            </IconButton>
          </div>
        </Box>
        <Divider />
        <Box sx={{ overflow: 'auto', px: 2 }}>
          <Fade
            in={!selectedHelpContent}
            style={{ display: !selectedHelpContent ? 'block' : 'none' }}
          >
            {ListHelp}
          </Fade>
          <Fade
            in={selectedHelpContent ? true : false}
            style={{ display: selectedHelpContent ? 'block' : 'none' }}
          >
            <Box sx={{ py: 2 }}>
              <Button
                variant="text"
                color="inherit"
                aria-label="Back"
                onClick={() => setSelectedHelpContent(null)}
              >
                <ArrowBack sx={{ mr: 1 }} /> Back
              </Button>
              <iframe
                width="100%"
                style={{ height: 'calc(70vh)' }}
                src={selectedHelpContent || ''}
              />
            </Box>
          </Fade>
        </Box>
      </Drawer>
    </>
  );
};

export default HelpDrawer;

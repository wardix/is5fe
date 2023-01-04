import { HelpRounded } from '@mui/icons-material';
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import { Fragment } from 'react';

type NotificationType = {
  name: string;
  date: string;
};

type NotificationListType = {
  notifications: Array<NotificationType>;
};

const NotificationList = ({ notifications }: NotificationListType) => {
  return (
    <>
      <List sx={{ px: 2 }}>
        <ListItemText>
          <Typography
            variant="h5"
            component="h2"
            fontWeight={600}
            color="primary"
          >
            Today
          </Typography>
        </ListItemText>
        <ListItem sx={{ px: 0 }}>
          <List
            sx={{
              width: { xs: '100%', md: 500 },
              border: '1px solid ' + grey[300],
              borderRadius: 1,
              py: 0,
            }}
          >
            {notifications.map((notification) => {
              return (
                <Fragment key={notification.name}>
                  <ListItemButton>
                    <HelpRounded fontSize="large" color="primary" />
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="h6" component="h6" fontWeight={500}>
                        Ini toh yang namanya judul {notification.name}
                      </Typography>
                      <ListItemText sx={{ my: 0 }}>
                        {notification.name} {notification.date}
                      </ListItemText>
                    </Box>
                  </ListItemButton>
                  <Divider />
                </Fragment>
              );
            })}
          </List>
        </ListItem>
      </List>
    </>
  );
};

export default NotificationList;

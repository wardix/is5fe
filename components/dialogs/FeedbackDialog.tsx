import { Close } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';
import { SetStateAction, useState } from 'react';
import theme from '../../utils/theme';

interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    [theme.breakpoints.up('xs')]: {
      margin: theme.spacing(0),
      maxHeight: '100%',
      height: '100%',
    },
    [theme.breakpoints.up('md')]: {
      height: 'auto',
      maxHeight: 'calc(100% - 64px)',
    },
    // margin: theme.spacing(2),
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

type FeedbackDialogPropType = {
  open: boolean;
  onClose: () => void;
};

const FeedbackDialog = ({
  open,
  onClose: handleClose,
}: FeedbackDialogPropType) => {
  let currentUrl = '';
  if (typeof window !== 'undefined') {
    currentUrl = window.location.href;
  }
  const handleSubmit = () => {
    handleClose();
  };

  const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  const [feedbackCategory, setFeedbackCategory] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const handleChangeFeedbackCategory = (
    event: React.MouseEvent<HTMLElement>,
    newFeedbackCategory: string | null
  ) => {
    setFeedbackCategory(newFeedbackCategory);
  };

  const handleUpdateFeedbackMessage = (event: {
    target: { value: SetStateAction<string | null> };
  }) => {
    setFeedbackMessage(event.target.value);
  };

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Send Feedback
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            We are improving Prospect to be useful for all of you. Thank you for
            your feedback.
          </Typography>
          <Link href={currentUrl} target="_blank">
            {currentUrl}
          </Link>
          <Grid container sx={{ mt: 0 }} spacing={2}>
            <Grid item md={10} xs={9} position="relative">
              <Box
                sx={{
                  p: 1,
                  borderRadius: 1,
                  border: '1px solid ' + grey[300],
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                }}
              >
                <Image
                  style={{ padding: '0.375rem' }}
                  src="../../next.svg"
                  alt="Feedback image preview"
                  fill
                />
              </Box>
            </Grid>
            <Grid item xs={'auto'}>
              <Grid container spacing={2} direction={'column'}>
                <Grid item>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      border: '1px solid ' + grey[300],
                      position: 'relative',
                      width: '4rem',
                      height: '4rem',
                    }}
                  >
                    <Image
                      style={{ padding: '0.375rem' }}
                      src="../../next.svg"
                      alt="Feedback image preview"
                      fill
                    />
                  </Box>
                </Grid>
                <Grid item>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      border: '1px solid ' + grey[300],
                      position: 'relative',
                      width: '4rem',
                      height: '4rem',
                    }}
                  >
                    <Image
                      style={{ padding: '0.375rem' }}
                      src="../../next.svg"
                      alt="Feedback image preview"
                      fill
                    />
                  </Box>
                </Grid>
                <Grid item>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      border: '1px solid ' + grey[300],
                      position: 'relative',
                      width: '4rem',
                      height: '4rem',
                    }}
                  >
                    <Image
                      style={{ padding: '0.375rem' }}
                      src="../../next.svg"
                      alt="Feedback image preview"
                      fill
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Typography sx={{ mt: 2 }}>
            Please select your feedback category below
            <Typography
              sx={{ color: theme.palette.error.main }}
              variant="overline"
            >
              *
            </Typography>
          </Typography>
          <ToggleButtonGroup
            color="primary"
            value={feedbackCategory}
            fullWidth
            exclusive
            onChange={handleChangeFeedbackCategory}
            aria-label="Platform"
          >
            <ToggleButton value="suggestion">Suggestion</ToggleButton>
            <ToggleButton value="complaint">Complaint</ToggleButton>
            <ToggleButton value="appreciation">Appreciation</ToggleButton>
          </ToggleButtonGroup>
          <TextField
            sx={{ mt: 3 }}
            multiline
            rows={3}
            maxRows={5}
            label={
              <span>
                Your Feedback{' '}
                <Typography color={theme.palette.error.main} variant="overline">
                  *
                </Typography>
              </span>
            }
            fullWidth
            value={feedbackMessage}
            onChange={handleUpdateFeedbackMessage}
          />
        </DialogContent>
        <DialogActions sx={{ my: 1 }}>
          <Button
            color="primary"
            variant="contained"
            autoFocus
            onClick={handleSubmit}
          >
            Send Feedback
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};

export default FeedbackDialog;

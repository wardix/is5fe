import { Close } from '@mui/icons-material';
import {
  Breakpoint,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import { memo, useState } from 'react';
const FeedbackDialog = dynamic(() => import('./FeedbackDialog'), {
  ssr: false,
});

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

type MainDialogPropType = {
  open: boolean;
  title: string;
  size?: Breakpoint;
  submitLabel?: string;
  cancelLabel?: string;
  noFeedback?: boolean;
  children?: React.ReactNode;
  modalHeader?: React.ReactNode;
  modalFooter?: React.ReactNode;
  onSubmit?: () => void;
  onClose: () => void;
};

const MainDialog: React.FC<MainDialogPropType> = ({
  children,
  open,
  size,
  noFeedback = false,
  submitLabel,
  cancelLabel,
  title,
  modalHeader,
  modalFooter,
  onClose: handleClose,
  onSubmit,
  ...otherMainProps
}) => {
  const BootstrapDialogTitle: React.FC<DialogTitleProps> = (props) => {
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

  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [hideDialog, setHideDialog] = useState(false);

  const handleClickFeedbackButton = () => {
    setFeedbackOpen(true);
    setTimeout(() => {
      setHideDialog(true);
    }, 250);
  };

  const handleCloseFeedbackDialog = () => {
    setFeedbackOpen(false);
    setHideDialog(false);
  };

  return (
    <>
      {!noFeedback && open && !feedbackOpen ? (
        <Button
          variant="contained"
          color="inherit"
          sx={{
            zIndex: 1400,
            top: '50%',
            right: 0,
            position: 'fixed',
            textOrientation: 'sideways',
            transform: `rotate(-90deg) translateY(30px)`,
          }}
          onClick={handleClickFeedbackButton}
        >
          Feedback
        </Button>
      ) : undefined}
      <BootstrapDialog
        open={open && !hideDialog}
        aria-labelledby="customized-dialog-title"
        disableEnforceFocus
        {...otherMainProps}
        maxWidth={size}
        onClose={handleClose}
      >
        {!modalHeader ? (
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            {title}
          </BootstrapDialogTitle>
        ) : undefined}
        <DialogContent dividers>{children}</DialogContent>
        {!modalFooter ? (
          <DialogActions sx={{ my: 1 }}>
            <Button
              color="primary"
              variant="contained"
              autoFocus
              onClick={onSubmit}
            >
              {submitLabel || 'Confirm'}
            </Button>
            <Button
              color="primary"
              variant="contained"
              autoFocus
              onClick={handleClose}
            >
              {cancelLabel || 'Cancel'}
            </Button>
          </DialogActions>
        ) : undefined}
      </BootstrapDialog>
      <FeedbackDialog open={feedbackOpen} onClose={handleCloseFeedbackDialog} />
    </>
  );
};

export default memo(MainDialog);

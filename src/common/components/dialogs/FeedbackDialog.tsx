import { dataURItoBlob, useIsomorphicLayoutEffect } from '@/utils/index';
import theme from '@/utils/theme';
import { AddCircleOutline, Close, Delete } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
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
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SetStateAction, createRef, useState } from 'react';
import { useMutation } from 'react-query';

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

type FeedbackErrorMessagesType = {
  feedbackCategory: string;
  feedbackDescription: string;
};

const FeedbackDialog = ({
  open,
  onClose: handleClose,
}: FeedbackDialogPropType) => {
  const router = useRouter();

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
  const [feedbackDescription, setfeedbackDescription] = useState<string>('');
  const [loadingTakeScreenshot, setLoadingTakeScreenshot] = useState(false);
  const [fileImage, setFileImage] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [urlName, setUrlName] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<FeedbackErrorMessagesType>({
    feedbackCategory: '',
    feedbackDescription: '',
  });
  const chooseImage = createRef<HTMLInputElement>();

  const handleChangeFeedbackCategory = (
    event: React.MouseEvent<HTMLElement>,
    newFeedbackCategory: string | null
  ) => {
    if (newFeedbackCategory !== null) {
      setErrorMessage({ ...errorMessage, feedbackCategory: '' });
      setFeedbackCategory(newFeedbackCategory);
    }
  };

  const handleUpdatefeedbackDescription = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setfeedbackDescription(event.target.value);
  };

  const handleUploadImage = (evt: any) => {
    const file = evt.target?.files[0];
    if (file) {
      setFileImage([...fileImage, file]);
      // this.img = URL.createObjectURL(file);
      setPreviewImages([...previewImages, URL.createObjectURL(file)]);
      setSelectedImage(selectedImage + 1);
      if (chooseImage.current) chooseImage.current.value = '';
    }
  };

  const submitFeedback = async () => {
    if (!feedbackCategory) {
      setErrorMessage({
        ...errorMessage,
        feedbackCategory: 'Please select a category',
      });
      throw new Error('Please select a category');
    }
    // const version = browserOSVersion();
    let os = `${'version.os'} ${'version.osVersion'}`;
    // if (version.type) {
    //   os += `- ${version.type}`;
    // }
    let formData = new FormData();
    var message = `\nURL :\n ${urlName}\n\nCategory :\n ${feedbackCategory}\n\nDescription :\n ${feedbackDescription}\n\nFrom :\n ${'userProfile?.user?.user_uuid'} / ${'userProfile?.user?.display_name ?? userProfile?.user?.name'}\n\nDomain API :\n${'currentCompany'}\n\nCompany:\n${'companyName'}\n\nBrowser :\n ${
      // version.browser
      'test'
    }\n\nVersion :\n ${'version.browserVersion'}\n\nOperating System:\n ${os}
    `;
    const body = {
      content: 'Kirim feedback dari web',
      tts: false,
      embed: {
        title: 'Feedback WEB',
        description: message,
      },
    };
    formData.append('payload_json', JSON.stringify(body));
    for (const idx in fileImage) {
      formData.append(`files[${idx}]`, fileImage[idx]);
    }
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return axios.post(`${process.env.NEXT_PUBLIC_FEEDBACK}`, formData, config);
  };

  const resetFeedbackForm = () => {
    setFileImage([]);
    setSelectedImage(0);
    setPreviewImages([]);
    setfeedbackDescription('');
    setFeedbackCategory(null);
    errorMessage.feedbackCategory = '';
    handleClose();
  };

  const { mutate: handleSubmitFeedback } = useMutation(submitFeedback, {
    onSuccess: () => {
      resetFeedbackForm();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleRemoveImage = (index: number) => {
    setFileImage([...fileImage.slice(0, index), ...fileImage.slice(index + 1)]);
    setPreviewImages([
      ...previewImages.slice(0, index),
      ...previewImages.slice(index + 1),
    ]);
    setSelectedImage(0);
  };

  useIsomorphicLayoutEffect(() => {
    async function handleTakeScreenshot() {
      setPreviewImages([]);
      setFileImage([]);
      setLoadingTakeScreenshot(true);
      const base = window.location.origin;
      const route = router.asPath;
      const d = new Date();
      const time = d.getTime();
      const scrollY = window.scrollY;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const options = {
        width: windowWidth,
        height: windowHeight,
        windowWidth: windowWidth,
        windowHeight: windowHeight,
        logging: false,
        y: scrollY,
        useCORS: true,
        allowTaint: true,
        imageTimeout: 10000,
        backgroundColor: '#f8f8f8',
        scrollY,
      };
      const mainLayout = document.body;

      import('html2canvas').then((html2canvas) => {
        html2canvas.default(mainLayout, options).then((canvas) => {
          const img = canvas.toDataURL();
          setPreviewImages([img]);
          const blob = dataURItoBlob(img);
          const file = new File([blob], time + '.png', { type: 'image/png' });
          setFileImage([file]);
          setLoadingTakeScreenshot(false);
        });
      });
      setUrlName(`${base}${route}`);
    }
    if (open) {
      handleTakeScreenshot();
      setSelectedImage(0);
    }
  }, [open, router.asPath]);

  return (
    <>
      <BootstrapDialog
        onClose={() => {
          resetFeedbackForm();
          handleClose();
        }}
        aria-labelledby="customized-dialog-title"
        disableEnforceFocus
        open={open && !loadingTakeScreenshot ? true : false}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={() => {
            resetFeedbackForm();
            handleClose();
          }}
        >
          Send Feedback
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            We are improving Prospect to be useful for all of you. Thank you for
            your feedback.
          </Typography>
          <Link href={urlName} target="_blank">
            {urlName}
          </Link>
          <Grid container sx={{ mt: 0 }} spacing={2}>
            <Grid item md={10} xs={9} position="relative">
              <Box
                sx={{
                  p: 1,
                  borderRadius: 1,
                  border: '1px solid ' + grey[300],
                  position: 'relative',
                  minHeight: 224,
                  width: '100%',
                  height: '100%',
                }}
              >
                {!loadingTakeScreenshot && previewImages[selectedImage] ? (
                  <Image
                    style={{ padding: '0.375rem', objectFit: 'contain' }}
                    src={previewImages[selectedImage]}
                    alt="Feedback image preview"
                    fill
                  />
                ) : (
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CircularProgress color="inherit" size={72} />
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={'auto'}>
              <Grid container spacing={2} direction={'column'}>
                {previewImages.map((image, index) => (
                  <Grid
                    item
                    key={`preview_feedback_image_${index}`}
                    sx={{ position: 'relative' }}
                  >
                    <Button
                      variant="text"
                      sx={{
                        p: 1,
                        borderRadius: 1,
                        border: '1px solid ' + grey[300],
                        position: 'relative',
                        width: '4rem',
                        height: '4rem',
                      }}
                      onClick={() => setSelectedImage(index)}
                    >
                      {image ? (
                        <Image
                          style={{ padding: '0.375rem', objectFit: 'cover' }}
                          src={image}
                          alt={`Feedback image thumbnail ${index}`}
                          fill
                        />
                      ) : null}
                    </Button>
                    {index !== 0 ? (
                      <IconButton
                        sx={{ position: 'absolute', top: '45%', right: -24 }}
                        size="small"
                        color="error"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    ) : null}
                  </Grid>
                ))}
                {previewImages.length < 3 ? (
                  <Grid item>
                    <input
                      id="file-upload"
                      ref={chooseImage}
                      type="file"
                      style={{ display: 'none' }}
                      accept="image/*"
                      onChange={handleUploadImage}
                    />
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: 1,
                        border: '1px solid ' + grey[300],
                        position: 'relative',
                        width: '4rem',
                        height: '4rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <IconButton onClick={() => chooseImage?.current?.click()}>
                        <AddCircleOutline />
                      </IconButton>
                    </Box>
                  </Grid>
                ) : null}
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
          <Typography
            sx={{
              display: errorMessage.feedbackCategory ? 'inline-block' : 'none',
            }}
            variant="body2"
            color="error"
          >
            Category must be selected
          </Typography>
          <TextField
            sx={{ mt: 3 }}
            multiline
            rows={4}
            label={
              <span>
                Your Feedback{' '}
                <Typography
                  color={theme.palette.error.main}
                  variant="overline"
                  fontSize={13}
                >
                  *
                </Typography>
              </span>
            }
            fullWidth
            value={feedbackDescription}
            onChange={handleUpdatefeedbackDescription}
          />
        </DialogContent>
        <DialogActions sx={{ my: 1 }}>
          <Button
            color="primary"
            variant="contained"
            disabled={loadingTakeScreenshot}
            autoFocus
            onClick={() => handleSubmitFeedback()}
          >
            Send Feedback
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};

export default FeedbackDialog;

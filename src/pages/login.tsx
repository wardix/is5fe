import HeadSeo from '@/components/utilities/HeadSeo';
import fetchLogin from '@/services/login.service';
import { Alert, Snackbar } from '@mui/material';
import { Box } from '@mui/system';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMutation } from 'react-query';

const LoginCard = dynamic(() => import('@/components/cards/LoginCard'), {
  ssr: false,
});

export default function SignIn() {
  const router = useRouter();
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [errorLoginMsg, setErrorLoginMsg] = useState({ message: '' });
  const { mutate: mutateLogin } = useMutation(fetchLogin, {
    onSuccess({ data }) {
      handleLoginSucceed(data);
      router.push('/');
    },
    onError({ response }) {
      setErrorLoginMsg(response.data);
      setIsOpenSnackbar(true);
    },
  });
  const handleClose = () => {
    setIsOpenSnackbar(false);
  };
  return (
    <>
      <HeadSeo
        title="IS-5 Login"
        description="Masuk ke IS-5 untuk kebutuhan Anda"
        key="login"
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Snackbar
          open={isOpenSnackbar}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}
          >
            {errorLoginMsg.message}
          </Alert>
        </Snackbar>
        <LoginCard onSubmit={mutateLogin}></LoginCard>
      </Box>
    </>
  );
}

type LoginResponseType = {
  created: string;
  expired: string;
  token: string;
};

const handleLoginSucceed = (data: LoginResponseType) => {
  localStorage.setItem('token', data.token);
};

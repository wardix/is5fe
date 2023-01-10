import HeadSeo from '@/components/utilities/HeadSeo';
import { fetchLogin } from '@/services/login.service';
import { Alert, Snackbar } from '@mui/material';
import { Box } from '@mui/system';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { userProfileAtom } from '../common/store/AuthStore';

const LoginCard = dynamic(() => import('@/components/cards/LoginCard'), {
  ssr: false,
});

type LoginResponseType = {
  created: string;
  expired: string;
  token: string;
};

export default function SignIn() {
  const router = useRouter();
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [errorLoginMsg, setErrorLoginMsg] = useState({ message: '' });
  const { mutate: handleLogin } = useMutation(fetchLogin, {
    onSuccess({ data }) {
      handleLoginSucceed(data);
    },
    onError({ response }) {
      setErrorLoginMsg(response.data);
      setIsOpenSnackbar(true);
    },
  });
  const [userProfile, setUserProfile] = useAtom(userProfileAtom);
  const handleClose = () => {
    setIsOpenSnackbar(false);
  };

  const handleLoginSucceed = (data: LoginResponseType) => {
    localStorage.setItem('token', data.token);
    const returnUrl: string = router.query.returnUrl?.toString() || '/';
    router.push(returnUrl);
  };

  useEffect(() => {
    // redirect to home if already logged in
    const token =
      typeof window !== 'undefined' && localStorage.getItem('token');
    if (userProfile && token) {
      router.push('/dashboard');
    }
  }, [userProfile, router]);

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
        <LoginCard onSubmit={handleLogin}></LoginCard>
      </Box>
    </>
  );
}

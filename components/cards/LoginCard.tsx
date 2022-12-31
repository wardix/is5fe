import {
  Button,
  Card,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { LoginInfo } from '../../types/UserType';

type UserLoginType = {
  onSubmit: ({ username, password }: LoginInfo) => void;
};

const LoginCard = ({ onSubmit }: UserLoginType) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          onSubmit({ username, password });
        }}
      >
        <Card
          variant="outlined"
          sx={{ width: { xs: '300px', md: '500px' }, p: 3 }}
        >
          <Box textAlign="center" mb={3}>
            <h2>Login</h2>
          </Box>
          <Box display="flex" flexDirection="column">
            <TextField
              label="Username"
              size="small"
              sx={{ mb: 2 }}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <FormControl size="small" variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <Button onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? 'Show' : 'Hide'}
                    </Button>
                  </InputAdornment>
                }
                label="Password"
                onChange={(evt) => setPassword(evt.target.value)}
              />
            </FormControl>
          </Box>
          <Button
            sx={{ display: 'block', width: '100%', mt: 3 }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Login
          </Button>
        </Card>
      </form>
    </>
  );
};
export default LoginCard;

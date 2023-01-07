import { LoginInfo } from '@/types/UserType';
import { HTTP } from '@/utils/httpCommon';

const fetchLogin = async (body: LoginInfo) => {
  return await HTTP.post('/auth/login', body);
};

export default fetchLogin;

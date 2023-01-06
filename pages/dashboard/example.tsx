import DashboardLayout from '@/components/layouts/DashboardLayout';
import { NextPageWithLayout } from '../page';
const Example: NextPageWithLayout = () => {
  return <>Example</>;
};

Example.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Example;

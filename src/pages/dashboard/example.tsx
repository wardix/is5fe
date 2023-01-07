import dynamic from 'next/dynamic';
import { NextPageWithLayout } from '../page';

const DashboardLayout = dynamic(
  () => import('@/components/layouts/DashboardLayout'),
  { ssr: false }
);

const Example: NextPageWithLayout = () => {
  return <>Example</>;
};

Example.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Example;

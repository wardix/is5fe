import HeadSeo from '@/common/components/utilities/HeadSeo';
import dynamic from 'next/dynamic';
import { NextPageWithLayout } from '../page';

const DashboardLayout = dynamic(
  () => import('@/components/layouts/DashboardLayout'),
  { ssr: false }
);

const Dashboard: NextPageWithLayout = () => {
  return (
    <>
      <HeadSeo
        description="Halaman dashboard, user bisa melihat rangkuman pekerjaannya"
        title="IS-5 Dashboard"
        key={'dashboard'}
      />
      <h1>Dashboard 2</h1>
    </>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;

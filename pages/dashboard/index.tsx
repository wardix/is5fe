import DashboardLayout from '../../components/layouts/DashboardLayout';
import HeadSeo from '../../components/utilities/HeadSeo';
import { NextPageWithLayout } from '../page';

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

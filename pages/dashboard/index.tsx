import DashboardLayout from '../../components/layouts/DashboardLayout';
import { NextPageWithLayout } from '../page';

const Dashboard: NextPageWithLayout = () => {
  return (
    <>
      <h1>Dashboard 2</h1>
    </>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;

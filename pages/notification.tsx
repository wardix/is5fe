import DashboardLayout from '../components/layouts/DashboardLayout';
import NotificationList from '../components/lists/NotificationList';
import HeadSeo from '../components/utilities/HeadSeo';
import { NextPageWithLayout } from './page';

const Notification: NextPageWithLayout = () => {
  const notificationData = Array.from(Array(10).keys()).map((i) => ({
    name: 'name ' + i,
    date: new Date().toISOString(),
  }));
  return (
    <>
      <HeadSeo
        description="Halaman Notification, user bisa melihat informasi yang pernah masuk sebelumnya"
        title="IS-5 Notificaiton"
        key={'notification'}
      />
      <h1>Notification</h1>
      <NotificationList notifications={notificationData} />
    </>
  );
};

Notification.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Notification;

import DashboardLayout from '@/components/layouts/DashboardLayout';
import HeadSeo from '@/components/utilities/HeadSeo';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { NextPageWithLayout } from './page';

const NotificationList = dynamic(
  () => import('@/components/lists/NotificationList'),
  { ssr: false }
);

type NotificationType = {
  name: string;
  date: string;
};

const Notification: NextPageWithLayout = () => {
  const [notificationData, setNotificationData] = useState<NotificationType[]>(
    []
  );
  useEffect(() => {
    const currentDate = new Date().toISOString();
    const sampleData = Array.from(Array(10).keys()).map((i) => ({
      name: 'name ' + i,
      date: currentDate,
    }));
    setNotificationData(sampleData);
  }, []);
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

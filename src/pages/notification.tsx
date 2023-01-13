import DashboardLayout from '@/components/layouts/DashboardLayout';
import { NotificationType } from '@/components/lists/NotificationList';
import { useIsomorphicLayoutEffect } from '@/utils/index';
import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import { NextPageWithLayout } from './page';

const NotificationList = dynamic(
  () => import('@/components/lists/NotificationList'),
  { ssr: false }
);

const HeadSeo = dynamic(() => import('@/components/utilities/HeadSeo'), {
  ssr: false,
});

const Notification: NextPageWithLayout = () => {
  const [notificationData, setNotificationData] = useState<NotificationType[]>(
    []
  );

  const handleClickNotificationItem = useCallback(
    (notification: NotificationType) => {
      console.log(notification);
    },
    []
  );

  useIsomorphicLayoutEffect(() => {
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
      <NotificationList
        notifications={notificationData}
        onItemClick={handleClickNotificationItem}
      />
    </>
  );
};

Notification.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Notification;

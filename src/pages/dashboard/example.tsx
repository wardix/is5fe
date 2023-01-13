import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Button } from '@mui/material';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { NextPageWithLayout } from '../page';

const HeadSeo = dynamic(() => import('@/components/utilities/HeadSeo'), {
  ssr: false,
});

const MainDialog = dynamic(() => import('@/components/dialogs/MainDialog'), {
  ssr: false,
});

const Example: NextPageWithLayout = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleCloseDialog = () => setOpenModal(false);
  const handleOpenDialog = () => setOpenModal(true);

  return (
    <>
      <HeadSeo
        description="Halaman contoh, ada modal feedback didalamnya"
        title="IS-5 Dashboard Example"
        key={'dashboard-example'}
      />
      <MainDialog
        open={openModal}
        title="Ini coba"
        size="lg"
        onClose={handleCloseDialog}
      >
        testdda d dasda daskdasjdaksjd akljdakl jdaklsdj akjdakljd{' '}
        <address>ad askdjaskdakdadkla jdlkadaskdaslkdja</address>
      </MainDialog>
      <Button aria-label="Open Modal" onClick={handleOpenDialog}>
        Open Modal
      </Button>
      Example
    </>
  );
};

Example.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Example;

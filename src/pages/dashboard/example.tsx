import MainDialog from '@/components/dialogs/MainDialog';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Button } from '@mui/material';
import { useState } from 'react';
import { NextPageWithLayout } from '../page';

const Example: NextPageWithLayout = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <MainDialog
        open={openModal}
        title="Ini coba"
        size="lg"
        onClose={() => setOpenModal(false)}
      >
        testdda d dasda daskdasjdaksjd akljdakl jdaklsdj akjdakljd{' '}
        <address>ad askdjaskdakdadkla jdlkadaskdaslkdja</address>
      </MainDialog>
      <Button aria-label="Open Modal" onClick={() => setOpenModal(true)}>
        Open Modal
      </Button>
      Example
    </>
  );
};

Example.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Example;

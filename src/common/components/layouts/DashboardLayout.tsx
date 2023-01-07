import dynamic from 'next/dynamic';
import { useState } from 'react';

const PrimaryAppBar = dynamic(() => import('../appBars/PrimaryAppBar'), {
  ssr: false,
});
const PrimaryDrawer = dynamic(() => import('../drawers/PrimaryDrawer'), {
  ssr: false,
});

export interface IDashboardLayout
  extends React.ComponentPropsWithoutRef<'div'> {}

const DashboardLayout: React.FC<IDashboardLayout> = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState(true);
  return (
    <>
      <PrimaryAppBar
        openDrawer={openDrawer}
        onDrawerOpen={(status) => setOpenDrawer(status)}
      />
      <PrimaryDrawer
        open={openDrawer}
        setDrawerOpen={(status) => setOpenDrawer(status)}
      >
        {children}
      </PrimaryDrawer>
    </>
  );
};

export default DashboardLayout;

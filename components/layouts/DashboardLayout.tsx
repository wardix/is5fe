import { useState } from 'react';
import PrimaryAppBar from '../appBars/PrimaryAppBar';
import PrimaryDrawer from '../drawers/PrimaryDrawer';

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

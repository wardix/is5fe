import Box from '@mui/material/Box';
import PrimaryAppBar from '../appBars/PrimaryAppBar';

export interface IDashboardLayout
  extends React.ComponentPropsWithoutRef<'div'> {}

const DashboardLayout: React.FC<IDashboardLayout> = ({ children }) => {
  return (
    <>
      <PrimaryAppBar />

      <Box aria-label="content" p={3}>
        {children}
      </Box>
    </>
  );
};

export default DashboardLayout;

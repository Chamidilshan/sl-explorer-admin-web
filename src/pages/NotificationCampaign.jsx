import React from 'react'
import PermanentDrawerLeft from '../components/drawer'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export const NotificationCampaign = () => {
  return (
    <> 
     <Box sx={{ display: 'flex' }}>
     <PermanentDrawerLeft />
      <h1 className='text-cyan-900'>Notification Campaign</h1>
     </Box>
     
    </>
  )
}

import React from 'react'
import PermanentDrawerLeft from '../components/drawer'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export const RoundTrips = () => {
  return (
    <> 
     <Box sx={{ display: 'flex' }}>
     <PermanentDrawerLeft />
      <h1 className='text-cyan-900'>Round Trips</h1>
     </Box>
     
    </>
  )
}

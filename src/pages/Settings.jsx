import React from 'react'
import PermanentDrawerLeft from '../components/drawer'
import Box from '@mui/material/Box';

export const Settings = () => {
  return (
    <>
    <Box sx={{ display: 'flex' }}>
    <PermanentDrawerLeft />
     <h1 className='text-cyan-900'>Settings</h1>
    </Box>
    
   </>
  )
}


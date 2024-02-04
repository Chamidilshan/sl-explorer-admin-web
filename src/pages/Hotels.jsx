import React from 'react'
import PermanentDrawerLeft from '../components/drawer'
import Box from '@mui/material/Box';


export const Hotels = () => {
  return (
    <>
    <Box sx={{ display: 'flex' }}>
    <PermanentDrawerLeft />
     <h1 className='text-cyan-900'>Hotels</h1>
    </Box>
     
   </>
  )
}

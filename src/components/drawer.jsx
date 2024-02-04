import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import MailIcon from '@mui/icons-material/Mail';
import { JoinLeft, JoinRight, Message, NotificationAdd, Settings, Weekend } from '@mui/icons-material';

const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState('');

  const handleItemClick = (route) => {
    setSelectedItem(route);
  };

  useEffect(() => {
    if (selectedItem) {
      navigate(selectedItem);
    }
  }, [selectedItem, navigate]);

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent" 
      anchor="left"
    >
      <Toolbar />
      <List sx={{ color: '#737791' }}> 
        {[
          { route: '/', text: 'Dashboard(Home)', icon: <DashboardIcon /> },
          { route: '/cruise-ships', text: 'Cruise Ships', icon: <DirectionsBoatIcon /> },
          { route: '/round-trips', text: 'Round Trips', icon: <JoinLeft /> },
          { route: '/day-trips', text: 'Day Trips', icon: <JoinRight /> },
          { route: '/hotels', text: 'Hotels', icon: <Weekend /> },
          { route: '/notification-campaign', text: 'Notification Campaign', icon: <NotificationAdd /> },
          { route: '/messages', text: 'Messages', icon: <Message /> },
          { route: '/settings', text: 'Settings', icon: <Settings /> },
        ].map(({ route, text, icon }) => (
          <ListItem
            key={route} 
            button
            onClick={() => handleItemClick(route)}
            sx={{
              backgroundColor: selectedItem === route ? '#FFA412' : 'inherit',
              '&:hover': {
                backgroundColor: '#FFA412',
              },
            }}
          >  
        
              <ListItemIcon>
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ color: selectedItem === route ? 'white' : 'inherit' }} />
        
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import { Menu} from '@mui/icons-material';
import './drawer.css'

export default function AnchorTemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['New Group', 'New Channel', 'Contacts', 'Calls', 'Saved Messages', 'Settings','Night mode'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
            {index===0 &&  <ListItemIcon>
               <PeopleOutlinedIcon style={{color:"white"}} />
               
              </ListItemIcon> }
              {index===1 &&  <ListItemIcon>
               <CampaignOutlinedIcon style={{color:"white"}} />
               
              </ListItemIcon> }
              {index===2 &&  <ListItemIcon>
               <AccountCircleOutlinedIcon style={{color:"white"}} />
               
              </ListItemIcon> }
              {index===3 &&  <ListItemIcon>
               <CallOutlinedIcon style={{color:"white"}} />
               
              </ListItemIcon> }
              {index===4 &&  <ListItemIcon>
               <BookmarkBorderOutlinedIcon style={{color:"white"}} />
               
              </ListItemIcon> }
              {index===5 &&  <ListItemIcon>
               <SettingsOutlinedIcon style={{color:"white"}} />
               
              </ListItemIcon> }
              {index===6 &&  <ListItemIcon>
               <BedtimeOutlinedIcon style={{color:"white"}} />
               
              </ListItemIcon> }
             
              
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
    </Box>
  );

  return (
    <div className='drawer-content'>
      {/* {['left', 'right', 'top', 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          
        </React.Fragment> 
        
      ))}*/}
      <React.Fragment>
            <Menu onClick={toggleDrawer("left",true)}/>
        </React.Fragment>
        <Drawer
           PaperProps={{
            sx: {
              backgroundColor: "rgb(33,33,33)",
              color: "white",
              
            }
          }}
           
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
    </div>
  );
}
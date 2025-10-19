import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const drawerWidth = 240;
const navItems = ['Bantuan', 'Masuk', 'Daftar'];

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MyData
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText
                primary={item}
                slotProps={{
                  primary: {
                    sx:
                      item === 'Daftar'
                      ? {
                        backgroundColor: '#1976d2',
                        color: '#fff',
                        borderRadius: 1,
                        px: 2,
                        py: 0.5,
                        fontWeight: 'bold',
                      }
                    : { color: '#000' },
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 100,
          right: 100,
          zIndex: 1200,
        }}
      >
      <AppBar
        component="nav"
        position="static"
        sx={{
          backgroundColor: '#fff',
          color: '#000',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'block' },
              fontWeight: 600,
            }}
          >
            MyData
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) =>
              item === 'Daftar' ? (
                <Button
                  key={item}
                  variant="contained"
                  sx={{
                    ml: 1,
                    backgroundColor: '#1976d2',
                    color: '#fff',
                    borderRadius: 2,
                    px: 2.5,
                    '&:hover': { backgroundColor: '#1565c0' },
                    boxShadow: '0px 2px 6px rgba(0,0,0,0.15)',
                  }}
                >
                  {item}
                </Button>
              ) : (
                <Button key={item} sx={{ color: '#000', fontWeight: 500 }}>
                  {item}
                </Button>
              )
            )}
          </Box>
        </Toolbar>
      </AppBar>
      </Box>

      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default Navbar;

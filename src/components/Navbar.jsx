import * as React from "react";
import AppBar from "@mui/material/AppBar"; 
import Box from "@mui/material/Box"; 
import CssBaseline from "@mui/material/CssBaseline"; 
import Divider from "@mui/material/Divider"; 
import Drawer from "@mui/material/Drawer"; 
import IconButton from "@mui/material/IconButton"; 
import List from "@mui/material/List"; 
import ListItem from "@mui/material/ListItem"; 
import ListItemButton from "@mui/material/ListItemButton"; 
import ListItemText from "@mui/material/ListItemText"; 
import MenuIcon from "@mui/icons-material/Menu"; 
import Toolbar from "@mui/material/Toolbar"; 
import Typography from "@mui/material/Typography"; 
import Button from "@mui/material/Button";
import Auth from "../pages/Auth.jsx";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;
const navItems = ["Riwayat"];

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { user, logout, openAuth, setOpenAuth, authTab, showAuth, login } = useAuth();

  const handleDrawerToggle = () => setMobileOpen((prevState) => !prevState);
  const container = window !== undefined ? () => window().document.body : undefined;

  const navigate = useNavigate();

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
          <img 
            src="/src/assets/images/logo.png" 
            alt="MyInternet Logo" 
            style={{ width: "120px", height: "auto", objectFit: "contain" }} 
          />
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => {
          if (item === "Riwayat" && !user) return null;
          return (
            <ListItem key={item} disablePadding>
              <ListItemButton sx={{ textAlign: "left" }}>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          );
        })}

        {!user ? (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => showAuth(1)}>
                <ListItemText primary="Masuk" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => showAuth(0)}>
                <ListItemText primary="Daftar" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <ListItem disablePadding>
            <ListItemButton onClick={logout}>
              <ListItemText primary="Keluar" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Box
          sx={{
            position: "fixed",
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
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(10px)", 
              color: "#000",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
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
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>

              <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
                <img 
                  src="src/assets/images/Logo.png"  
                  alt="Logo MyInternet" 
                  style={{ height: 40, cursor: "pointer" }} 
                  onClick={() => navigate("/")} 
                />
              </Box>

              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                {navItems.map((item) => {
                  if (item === "Riwayat" && !user) return null;
                    return (
                      <Button
                        key={item}
                        sx={{ color: "#000", fontWeight: 500 }}
                        onClick={() => navigate("/riwayat")}
                      >
                        {item}
                      </Button>
                    );
                })}
                {!user ? (
                  <>
                    <Button sx={{ color: "#000", fontWeight: 500 }} onClick={() => showAuth(1)}>
                      Masuk
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        ml: 1,
                        backgroundColor: "#1976d2",
                        color: "#fff",
                        borderRadius: 2,
                        px: 2.5,
                        "&:hover": { backgroundColor: "#1565c0" },
                        boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
                      }}
                      onClick={() => showAuth(0)}
                    >
                      Daftar
                    </Button>
                  </>
                ) : (
                  <Button
                    sx={{ 
                      ml: 2,
                      px: 2,
                      borderRadius: 2,
                      bgcolor: "#EE0000",
                      color: "#fff",
                      fontWeight: 500,
                    }}
                    onClick={logout}
                  >
                    Keluar
                  </Button>
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
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>

      <Auth
        open={openAuth}
        handleClose={() => setOpenAuth(false)}
        defaultTab={authTab}
        onLoginSuccess={login}
      />
    </>
  );
}

export default Navbar;

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

const drawerWidth = 240;
const navItems = ["Bantuan"];

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openAuth, setOpenAuth] = React.useState(false);
  const [authTab, setAuthTab] = React.useState(1);
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const handleDrawerToggle = () => setMobileOpen((prevState) => !prevState);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleLoginSuccess = (loggedUser) => {
    localStorage.setItem("user", JSON.stringify(loggedUser));
    setUser(loggedUser);
    setOpenAuth(false);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MyData
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}

        {!user ? (
          <>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  setAuthTab(1);
                  setOpenAuth(true);
                }}
              >
                <ListItemText primary="Masuk" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  setAuthTab(0);
                  setOpenAuth(true);
                }}
              >
                <ListItemText primary="Daftar" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
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
              backgroundColor: "#fff",
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

              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", sm: "block" },
                  fontWeight: 600,
                }}
              >
                MyData
              </Typography>

              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                {navItems.map((item) => (
                  <Button key={item} sx={{ color: "#000", fontWeight: 500 }}>
                    {item}
                  </Button>
                ))}

                {!user ? (
                  <>
                    <Button
                      sx={{ color: "#000", fontWeight: 500 }}
                      onClick={() => {
                        setAuthTab(1);
                        setOpenAuth(true);
                      }}
                    >
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
                      onClick={() => {
                        setAuthTab(0);
                        setOpenAuth(true);
                      }}
                    >
                      Daftar
                    </Button>
                  </>
                ) : (
                  <Button
                    color="error"
                    variant="outlined"
                    sx={{ ml: 2, borderRadius: 2 }}
                    onClick={handleLogout}
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
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}

export default Navbar;

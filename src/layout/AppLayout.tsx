import { Box, styled, Typography } from "@mui/material";
import { NavLink, Outlet } from "react-router";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryHead from "./components/LibraryHead";
import Library from "./components/Library";
import NavBar from "./components/NavBar";

const Layout = styled("div")(({ theme }) => ({
  display: "flex",
  height: "100vh",
  padding: "8px",
  backgroundColor: theme.palette.background.default, // #000
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    padding: 0,
  },
}));

const Sidebar = styled("aside")(({ theme }) => ({
  width: "331px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  marginRight: "8px",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper, // #121212
  width: "100%",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    borderRadius: 0,
    marginBottom: "64px",
  },
}));

const NavSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: "8px",
  padding: "16px 24px",
}));

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "20px",
  height: "48px",
  color: theme.palette.text.secondary,
  transition: "color 0.2s",
  "&:hover, &.active": {
    color: theme.palette.text.primary,
  },
}));

// 모바일 전용 하단 탭바
const MobileBottomNav = styled("nav")(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    position: "fixed",
    bottom: 0,
    width: "100%",
    height: "64px",
    backgroundColor: "rgba(0,0,0,0.9)",
    backdropFilter: "blur(10px)",
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 10,
  },
}));

const AppLayout = () => {
  return (
    <Layout>
      <Sidebar>
        <NavSection>
          <StyledNavLink to="/">
            <HomeIcon fontSize="large" />
            <Typography variant="h2" fontWeight={700}>
              Home
            </Typography>
          </StyledNavLink>
          <StyledNavLink to="/search">
            <SearchIcon fontSize="large" />
            <Typography variant="h2" fontWeight={700}>
              Search
            </Typography>
          </StyledNavLink>
        </NavSection>

        <Box
          sx={{
            bgcolor: "background.paper",
            borderRadius: "8px",
            flexGrow: 1,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <LibraryHead />
          <Library />
        </Box>
      </Sidebar>

      <ContentBox>
        <NavBar />
        <Box sx={{ p: "0 24px 24px 24px" }}>
          <Outlet />
        </Box>
      </ContentBox>

      <MobileBottomNav>
        <StyledNavLink to="/">
          <HomeIcon /> <Typography variant="subtitle1">Home</Typography>
        </StyledNavLink>
        <StyledNavLink to="/search">
          <SearchIcon /> <Typography variant="subtitle1">Search</Typography>
        </StyledNavLink>
      </MobileBottomNav>
    </Layout>
  );
};

export default AppLayout;

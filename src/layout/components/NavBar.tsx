import { Avatar, Badge, Box, styled } from "@mui/material";
import LoginButton from "../../common/components/LoginButton";
import useGetCurrentProfile from "../../hooks/useGetCurrentUserProfile";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const NavBar = () => {
  // user profile이 있으면 가져오기
  const { data: userProfile } = useGetCurrentProfile();
  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center" height="64px">
      {userProfile ? (
        <StyledBadge overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot">
          <Avatar />
        </StyledBadge>
      ) : (
        <LoginButton />
      )}
    </Box>
  );
};

export default NavBar;

import { Avatar, Badge, Box, IconButton, Menu, MenuItem, styled } from "@mui/material";
import LoginButton from "../../common/components/LoginButton";
import useGetCurrentProfile from "../../hooks/useGetCurrentUserProfile";
import { useState } from "react";
import { logout } from "../../utils/auth";

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // 프로필(Avatar) 클릭했을 때 메뉴 열기
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // 메뉴 닫기
  const handleClose = () => {
    setAnchorEl(null);
  };

  // 로그아웃
  const handleLogout = () => {
    handleClose();
    logout();
  };

  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center" height="64px">
      {userProfile ? (
        <>
          <IconButton onClick={handleClick} sx={{ p: 0 }}>
            <StyledBadge overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "left" }} variant="dot">
              <Avatar src={userProfile.images[0]?.url} />
            </StyledBadge>
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} transformOrigin={{ vertical: "top", horizontal: "right" }}>
            <MenuItem disabled>{userProfile.display_name}</MenuItem>
            <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
          </Menu>
        </>
      ) : (
        <LoginButton />
      )}
    </Box>
  );
};

export default NavBar;

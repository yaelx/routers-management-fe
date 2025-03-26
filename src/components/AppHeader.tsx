import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";

const pages = [
  { name: "routers", link: "/" },
  { name: "create router", link: "/create-router" },
];

const AppHeader = () => {
  const theme = useTheme();
  return (
    <AppBar
      position="static"
      component={"nav"}
      sx={{ backgroundColor: theme.palette.primary.main }}
    >
      <Container sx={{ height: "60px" }} maxWidth="xl">
        <Toolbar disableGutters sx={{ height: "100%" }}>
          <Typography
            variant="h6"
            component={"a"}
            href="/"
            sx={{
              mr: 2,
              display: "flex",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Routers
          </Typography>

          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row" }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                LinkComponent={"a"}
                href={page.link}
                sx={{
                  my: 1,
                  color: "white",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppHeader;

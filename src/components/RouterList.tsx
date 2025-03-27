import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Skeleton,
  Typography,
} from "@mui/material";
import { useFetchData } from "../apiService/useFetchData";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

const numberOfItemsOnPage = 10;

const FakeRows = () => {
  return (
    <div>
      {Array.from(new Array(numberOfItemsOnPage)).map((item, idx) => (
        <Box key={idx} sx={{ width: "80%", my: 2 }}>
          <Skeleton />
          <Skeleton width={"60%"} />
          <Skeleton width={"60%"} />
        </Box>
      ))}
    </div>
  );
};

const RouterList = () => {
  const { fetchData, routers, loading, error } = useFetchData();
  const [filter, setFilter] = useState<string>("all");
  const [sort, setSort] = useState<string>("name");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const navigate = useNavigate();

  const filterRoutes = useMemo(() => {
    return routers.filter((router) => {
      return filter === "all" || router.type === filter;
    });
  }, [filter, routers]);

  const sortRoutes = [...filterRoutes].sort((x, y) => {
    if (sort === "name") {
      return x.name.localeCompare(y.name);
    }
    if (sort === "type") {
      return x.type.localeCompare(y.type);
    }
    if (sort === "updatedAt") {
      const xDate = new Date(x.updatedAt);
      const yDate = new Date(y.updatedAt);
      return xDate.getTime() - yDate.getTime();
    }
    return 0;
  });

  const numOfPages = useMemo(() => {
    // we need an int here
    return Math.ceil(filterRoutes.length / numberOfItemsOnPage);
  }, [filterRoutes.length]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPageNumber(page);
  };

  const subRoutesList = useMemo(() => {
    return sortRoutes.slice(
      numberOfItemsOnPage * (pageNumber - 1),
      pageNumber * numberOfItemsOnPage - 1
    );
  }, [pageNumber, sortRoutes]);

  if (error) {
    return (
      <Box>
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        pl: 20,
      }}
    >
      <Box
        id="filters-list"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#b8b8b8",
          py: 2,
          pr: 2,
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", pl: 1 }}>
          <label>Filter type:</label>
          <select
            value={filter}
            disabled={loading || !!error}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value={"all"}>all</option>
            <option value={"wifi"}>wifi</option>
            <option value={"home"}>home</option>
            <option value={"enterprise"}>enterprise</option>
          </select>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", ml: 2 }}>
          <label>Sort by: </label>
          <select
            value={sort}
            disabled={loading || !!error}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value={"name"}>name</option>
            <option value={"type"}>type</option>
            <option value={"updatedAt"}>updatedAt</option>
          </select>
        </Box>
      </Box>
      <List sx={{ width: "90%", bgcolor: "background.paper" }}>
        {loading ? (
          <FakeRows />
        ) : (
          subRoutesList.map((router) => (
            <ListItem
              key={router.id}
              className="router-row"
              alignItems="flex-start"
              secondaryAction={
                <IconButton>
                  <EditIcon
                    onClick={() => navigate("/edit-router/" + router.id)}
                  />
                </IconButton>
              }
            >
              <ListItemText
                sx={{ my: 0 }}
                slotProps={{
                  primary: {
                    fontSize: 20,
                    color: "primary",
                  },
                }}
                primary={<Link to={`/router/${router.id}`}>{router.name}</Link>}
                secondary={
                  <>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.primary", display: "flex" }}
                    >
                      Type: {router.type}
                    </Typography>
                    <Typography>
                      updated at: {new Date(router.updatedAt).toLocaleString()}
                    </Typography>
                  </>
                }
              >
                <Typography>{router.name}</Typography>
              </ListItemText>
            </ListItem>
          ))
        )}
      </List>

      <Divider />
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Pagination
          disabled={loading || !!error}
          count={numOfPages}
          page={pageNumber}
          defaultPage={1}
          onChange={handlePageChange}
          color="primary"
          sx={{ justifyContent: "center", padding: "10px" }}
        />
      </Box>
    </Box>
  );
};

export default RouterList;

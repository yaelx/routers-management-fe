import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Router } from "../types/router";
import { useParams } from "react-router-dom";
import { fetchRouter } from "../apiService/api";

const RouterInfo = () => {
  const { id } = useParams();
  const [router, setRouter] = useState<Router | null>(null);

  useEffect(() => {
    const getData = async (id: string) => {
      const router = await fetchRouter(id);
      setRouter(router);
    };

    id && getData(id);
  }, [id]);

  if (!router) return <p>No router was found</p>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        pl: 20,
        pt: 5,
      }}
    >
      <Typography variant="h5">{router.name}</Typography>
      <Typography variant="body1">
        Type: {router.type.toLocaleUpperCase()}
      </Typography>
      <Typography variant="body1">
        Created: {new Date(router.createdAt).toLocaleString()}
      </Typography>

      <Typography variant="body1">
        coordinates: {router.coordinates.latitude} ,{" "}
        {router.coordinates.longitude}
      </Typography>

      {router.type === "wifi" && (
        <>
          <Typography variant="body1">
            Wifi Channels: {router.wifiChannels.join("; ")}
          </Typography>
          <Typography variant="body1">
            Supports DualBand:{" "}
            {router.supportsDualBand ? "supports" : "not support"}
          </Typography>
        </>
      )}

      {router.type === "home" && (
        <>
          <Typography variant="body1">
            Connected Devices: {router.connectedDevices}
          </Typography>
          <Typography variant="body1">
            Parental Controls Enabled:{" "}
            {router.parentalControlsEnabled ? "Enabled" : "Not enabled"}
          </Typography>
          <Typography variant="body1">
            Max BandwidthMbps: {router.maxBandwidthMbps} Mbps
          </Typography>
        </>
      )}

      {router.type === "enterprise" && (
        <>
          <Typography variant="body1">Ports: {router.portCount}</Typography>
          <Typography variant="body1">
            Supported Protocols: {router.supportedProtocols.join("; ")}
          </Typography>
          <Typography variant="body1">
            ThroughputGbps: {router.throughputGbps} Gbps
          </Typography>
        </>
      )}
    </Box>
  );
};

export default RouterInfo;

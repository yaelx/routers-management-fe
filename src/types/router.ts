interface Coordinates {
  latitude: number;
  longitude: number;
}

export type RouterType = "wifi" | "enterprise" | "home";

export interface BasicRouter {
    id: string;
    name: string;
    type: RouterType;
    createdAt: string;
    updatedAt: string;
    coordinates: Coordinates;
}

export interface WifiRouter extends BasicRouter {
    type: "wifi";
    wifiChannels: number[];
    supportsDualBand: boolean;
}

export interface EnterpriseRouter extends BasicRouter {
    type: "enterprise";
    portCount: number;
    supportedProtocols: string[];
    throughputGbps: number;
}

export interface HomeRouter extends BasicRouter {
    type: "home";
    connectedDevices: number;
    parentalControlsEnabled: boolean;
    maxBandwidthMbps: number;
}

export type Router = HomeRouter | WifiRouter | EnterpriseRouter;

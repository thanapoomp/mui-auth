export const APP_INFO = {
  name: "Smile SSO",
  version: "0.3.0",
  since: "2020",
  description: "Siam smile",
  contactUrl: "https://www.siamsmile.co.th",
};

//update token in 10 - 30 minutes (random to avoid multipages call api in the same time )
export const RENEW_TOKEN_MS = {
  min: 600000,
  max: 1800000,
};

export const CHECKVERSION_EVERY_MINUTE = 10;

export const API_URL =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "https://auth.devsiamsmile.com/api" //dev
    : // :  "https://api.thanapoom.cc/api" //dev
      "https://auth.devsiamsmile.com/api"; // Production

export const VERSIONCHECK_URL =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "https://api.thanapoom.cc/api/ClientVersion/GetLastClientVersion" //dev
    : "https://api.thanapoom.cc/api/ClientVersion/GetLastClientVersion"; // Production

export const SSO_URL_LOGOUT =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:3000/#/logout" //dev
    : "https://auth.thanapoom.cc/#/logout"; // Production

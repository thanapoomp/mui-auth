export const APP_INFO = {
  name: 'Smile SSO (UAT)',
  version: '0.1',
  since: '2020',
  description: 'Siam smile',
  contactUrl: 'https://www.siamsmile.co.th'
}

export const API_URL =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "https://auth.devsiamsmile.com/api" //dev
    // ? "https://api.thanapoom.cc/api" //dev
    // ? "https://localhost:44388/api" // local
    : // ?  "http://localhost:54821/api" //dev
    "https://api.thanapoom.cc/api"; // Production

export const SSO_URL_LOGOUT =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    // ? "https://auth.thanapoom.cc/#/logout" //dev
    ? "http://localhost:3000/#/logout" //dev
    : "http://localhost:3000/#/logout"; // Production

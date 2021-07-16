/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import axios from "axios";
import * as CONST from "../../../../Constant";
import * as swal from "../../Common/components/SweetAlert";

function VersionChecker(props) {
    const checkVersionLoop = 6000 * CONST.CHECKVERSION_EVERY_MINUTE;

  const emptyCache = () => {
    if ("caches" in window) {
      caches.keys().then((names) => {
        // Delete all the cache files
        names.forEach((name) => {
          caches.delete(name);
        });
      });
      // Makes sure the page reloads. Changes are only visible after you refresh.
      window.location.reload();
    }
  };

  const checkVersion = () => {
    axios
      .get(CONST.VERSIONCHECK_URL)
      .then((res) => {
        if (res.data.data.version !== CONST.APP_INFO.version) {
            alert('sso-version is outdated. your browser will reload automatically.')
            emptyCache();
        //   swal
        //     .swalConfirm("Warning", "your version is out-dated refresh now?")
        //     .then((res) => {
        //       if (res.isConfirmed) {
        //         emptyCache();
        //       }
        //     });
        }
      })
      .catch((err) => {
        swal.swalError("Error", err.message);
      });
  };

  React.useEffect(() => {
    checkVersion();
    const interval = setInterval(() => {
      checkVersion();
    }, checkVersionLoop);

    // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    return () => clearInterval(interval);
  }, []);
  return <React.Fragment>{props.children}</React.Fragment>;
}

export default VersionChecker;

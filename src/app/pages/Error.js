import React from "react";
import { Helmet } from "react-helmet";
import * as CONST from "../../Constant";
function Error() {
  return (
    <div>
      <Helmet>
        <title>Error:{CONST.APP_INFO.name}</title>
      </Helmet>
      Error
    </div>
  );
}

export default Error;

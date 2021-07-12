// barcode เราใช้ react-barcode

/* eslint-disable no-restricted-imports */
import React from 'react'
import Grid from "@material-ui/core/Grid";
import Link from '@material-ui/core/Link';
function QRGenerateDemo() {

	var Barcode = require('react-barcode');

	return (
		<>
			<Barcode
				value={"https://www.siamsmile.co.th/"}
				format={"CODE128"}
				displayValue={true}
				margin={10}
				textAlign={"center"}
				fontSize={15}
				fontOptions={"italic"}
				lineColor={"#000000"}
				background={"#F99393"}
			/>
			<Grid item xs={12} md={12} lg={12} style={{ marginLeft: 10, marginTop: 10 }}>
				<Link href="https://github.com/kciter/react-barcode" color="textSecondary" target="_blank" rel="noopener">
					barcode by react-barcode content (git hub)
			</Link>
			</Grid>
			<Grid item xs={12} md={12} lg={12} style={{ marginLeft: 10, marginTop: 10 }}>
				<Link href="https://kciter.so/react-barcode/" color="textSecondary" target="_blank" rel="noopener">
					Examples
			</Link>
			</Grid>
		</>
	)
}

export default QRGenerateDemo

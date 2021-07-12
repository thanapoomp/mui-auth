/* eslint-disable no-restricted-imports */
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import Grid from "@material-ui/core/Grid";
import PrintIcon from '@material-ui/icons/Print';
import LightBlue from "@material-ui/core/colors/lightBlue";
import Link from '@material-ui/core/Link';
import ComponentToPrint from '../components/reactToPrint/pageToPrint';
import Button from '@material-ui/core/Button';

function PrintComponent() {

	const componentRef = useRef();
	const lightBlue = LightBlue[400];

	return (
		<Grid item xs={12} md={12} lg={12} style={{ marginLeft: 10, marginTop: 20 }}>
			<ComponentToPrint ref={componentRef} />
			<ReactToPrint
				trigger={() => (
					<Button size="large" variant="contained" style={{ backgroundColor: lightBlue }} >
						<PrintIcon style={{ backgroundColor: lightBlue }}></PrintIcon>
						PrintDemo
					</Button>
				)}
				content={() => componentRef.current}
			/>
			<Grid item xs={12} md={12} lg={12} style={{ marginLeft: 10, marginTop: 20 }}>
				<Link href="https://github.com/gregnb/react-to-print" color="textSecondary" target="_blank" rel="noopener">
					Print Page by react-to-print content (git hub)
				</Link>
			</Grid>


		</Grid>
	)
}

export default PrintComponent

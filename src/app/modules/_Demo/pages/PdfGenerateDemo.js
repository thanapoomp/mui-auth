/* eslint-disable no-restricted-imports */
import React from 'react'
import Grid from "@material-ui/core/Grid";
import Fab from '@material-ui/core/Fab';
import LightBlue from "@material-ui/core/colors/lightBlue";
import { printPDF } from '../components/pdfPrint/pdfGenerate'
import Icon from "@material-ui/core/Icon";
import Link from '@material-ui/core/Link';

function PdfGenerateDemo() {

	const lightBlue = LightBlue[400];

	const [state] = React.useState({
		policyDetail: {
			appId: "1234",
			firstName: "สมชาย",
			lastName: "ใจดี",
			sex: "ชาย",
			birthDate: "10/04/1990",
			age: 30,
			address: "123/123",
			occupation: "รับจ้าง",
			phone: "084101010101",
			maxCover: 100000,
			premium: 380,
			duty: 0,
			vat: 0,
			sum: 100000,
			startCover: "01/05/2020",
			endCover: "01/05/2021",
		},
	})
	const handleDownloadPDF = () => {
		printPDF(state.policyDetail);
	}
	return (
		<div>
			<Grid item xs={12} md={12} lg={12} style={{ marginLeft: 10 }}>
				<Fab
					style={{ backgroundColor: lightBlue, width: '100%' }}
					variant="extended"
					size="small"
					color="primary"
					aria-label="add"
					onClick={handleDownloadPDF}
				>
					PDF DEMO
            <Icon>download</Icon>
				</Fab>
			</Grid>
			<Grid item xs={12} md={12} lg={12} style={{ marginLeft: 10, marginTop: 10 }}>

				<Link href="https://github.com/bpampuch/pdfmake" color="textSecondary" target="_blank" rel="noopener">
					Gennerate PDF by pdfmake content (git hub)
				</Link>
			</Grid>
			<Grid item xs={12} md={12} lg={12} style={{ marginLeft: 10, marginTop: 10 }}>

				<Link href="http://pdfmake.org/playground.html" color="textSecondary" target="_blank" rel="noopener">
					Examples
				</Link>
			</Grid>
		</div>
	)
}

export default PdfGenerateDemo

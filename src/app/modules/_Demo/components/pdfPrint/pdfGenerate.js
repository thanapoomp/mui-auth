//generate PDF ใช้ pdfmake
//ลิ้งตัวอย่าง: https://github.com/bpampuch/pdfmake
//ลิ้งตัวอย่าง: http://pdfmake.org/playground.html

import pdfMake from "pdfmake/build/pdfmake";
import { logo64 } from './image'
pdfMake.fonts = {
	Sarabun: {
		normal: `https://cdn.jsdelivr.net/npm/font-th-sarabun-new@1.0.0/fonts/THSarabunNew-webfont.ttf`,
		bold: `https://cdn.jsdelivr.net/npm/font-th-sarabun-new@1.0.0/fonts/THSarabunNew_bold-webfont.ttf`,
		italics: `https://cdn.jsdelivr.net/npm/font-th-sarabun-new@1.0.0/fonts/THSarabunNew_italic-webfont.ttf`,
		bolditalics: `https://cdn.jsdelivr.net/npm/font-th-sarabun-new@1.0.0/fonts/THSarabunNew_bolditalic-webfont.ttf`,
	},
};

export const printPDF = (data) => {
	var docDefinition = {
		content: [
			{
				image: 'logo',
				width: 50,
				alignment: "center",
			},
			{
				text: "ตารางความคุ้มครอง",
				alignment: "center",
				fontSize: 10,
			},
			{
				text:
					"ประกันภัยการเจ็บป่วยด้วยโรคติดเชื้อไวรัสโคโรนา 2019 (COVID-19) และอุบัติเหตุ",
				alignment: "center",
				fontSize: 10,
			},
			{

				style: 'tableExample',
				table: {
					headerRows: 1,
					widths: [250, "*", "*"],

					body: [
						[{
							colSpan: 3,
							border: [true, true, true, false],
							columns: [
								{
									// auto-sized columns have their widths based on their content
									width: "auto",
									text: "ชื่อผู้เอาประกันภัย :",
									bold: true,
								},
								{
									width: "auto",
									text: `${data.firstName} ${data.lastName}`,
								},
							],
							// optional space between columns
							columnGap: 20,
						}, "", ""],
						[{
							colSpan: 3,
							border: [true, false, true, false],
							columns: [
								{
									width: "auto",
									text: "ที่อยู่ปัจจุบัน :",
									bold: true,
								},
								{
									width: "auto",
									text: `${data.address}`,
								},
							],

							columnGap: 20,
						}, "", ""],
						[{
							colSpan: 3,
							border: [true, false, true, false],
							columns: [
								{
									width: "auto",
									text: "เพศ :",
									bold: true,
								},
								{
									width: "auto",
									text: `${data.sex}`,
								},
							],

							columnGap: 20,
						}, "", ""],
						[{
							colSpan: 3,
							border: [true, false, true, false],
							columns: [
								{
									width: "auto",
									text: "วัน/เดือน/ปี เกิด :",
									bold: true,
								},
								{
									width: "auto",
									text: `${data.birthDate}`,
								},
							],

							columnGap: 20,
						}, "", ""],
						[{
							colSpan: 3,
							border: [true, false, true, true],
							columns: [
								{
									width: "auto",
									text: "อาชีพ : ",
									bold: true,
								},
								{
									width: "auto",
									text: `${data.occupation}`,
								},
							],

							columnGap: 20,
						}, "", ""],
						[{
							colSpan: 3,
							border: [true, false, true, false],
							columns: [
								{
									width: "auto",
									text: "ระยะเวลาเอาประกันภัย : เริ่มวันที่",
									bold: true,
								},
								{
									width: "*",
									text: `${data.startCover}`,
								},
								{
									width: 50,
									text: "สิ้นสุดวันที่",
									bold: true,
								},
								{
									width: "*",
									text: `${data.endCover}`,
								},
								{
									width: 30,
									text: "เวลา",
									bold: true,
								},
								{
									width: "*",
									text: "24.00 น.",
								},
							],

							columnGap: 10,
						}, "", ""],
						[
							{ text: "ข้อตกลงคุ้มครอง/เอกสารแนบท้าย", alignment: "center" },
							{ text: "จำนวนเงินเอาประกันภัย(บาท)", alignment: "center" },
							{ text: "เบี้ยประกันภัย  (บาท)", alignment: "center" },
						],
						[
							"1.ผลประโยชน์การเจ็บป่วยด้วยโรคติดเชื้อไวรัสโคโรนา 2019(COVID - 19)",
							{ text: `${data.maxCover}`, alignment: "right" },
							{ text: `${data.premium}`, alignment: "right" },
						],
						[
							"2.ผลประโยชน์การเสียชีวิต การสูญเสียอวัยวะสายตา หรือทุพพลภาพถาวรสิ้นเชิง(อ.บ. 1)",
							{ text: `${data.maxCover}`, alignment: "right" },
							{ text: `0`, alignment: "right" },
						],
						[
							{ text: "เบี้ยประกันภัยสุทธิ", colSpan: 2, alignment: "right" }, "", {
								columns: [
									{
										width: "*",
										text: `${data.premium}`,
										alignment: "right"
									},
									{
										width: "*",
										text: "บาท",
										alignment: "right"
									},
								],
								columnGap: 2,
							}
						],
						[
							{ text: "อากรแสตมป์", colSpan: 2, alignment: "right" }, "", {
								columns: [
									{
										width: "*",
										text: `${data.duty}`,
										alignment: "right"
									},
									{
										width: "*",
										text: "บาท",
										alignment: "right"
									},
								],
								columnGap: 2,
							}
						],
						[
							{ text: "ภาษี", colSpan: 2, alignment: "right" }, "", {
								columns: [
									{
										width: "*",
										text: `${data.vat}`,
										alignment: "right"
									},
									{
										width: "*",
										text: "บาท",
										alignment: "right"
									},
								],
								columnGap: 2,
							}
						],
						[
							{ text: "เบี้ยประกันภัยรวม", colSpan: 2, alignment: "right" }, "", {
								columns: [
									{
										width: "*",
										text: `${data.premium}`,
										alignment: "right"
									},
									{
										width: "*",
										text: "บาท",
										alignment: "right"
									},
								],
								columnGap: 2,
							}
						]
					],
				},
				// defaultBorder: false,
			},
		],
		footer: function (currentPage, pageCount, pageSize) {
			return [
				{
					style: 'tableExample',
					table: {
						heights: [20],
						widths: ['*'],
						body: [
							// [{ image: 'callcenter', width: 100, alignment: "right", margin: [0, 0, 5, 0] }],
							[{ text: 'ผู้จัดการโครงการ : บริษัท สยามสไมล์โบรกเกอร์ (ประเทศไทย) จำกัด', alignment: "left", margin: [20, 0, 0, 0], fillColor: '#33CCFF', color: '#FFFFFF' }],
							[{ text: 'บริษัทผู้รับประกันภัย :  บริษัท อาคเนย์ประกันภัย จำกัด (มหาชน)', alignment: "left", margin: [20, 0, 0, 0], fillColor: '#3D31EB', color: '#FFFFFF' }]
						]
					},
					layout: 'noBorders',
				},
			];
		},
		defaultStyle: {
			font: "Sarabun",
			fontSize: 10,
		},
		pageSize: "A4",
		pageOrientation: "portrait",
		// margin: [left, top, right, bottom]
		pageMargins: [30, 20, 40, 80],
		images: {
			logo: logo64,
		},
	};
	pdfMake.createPdf(docDefinition).open();
};

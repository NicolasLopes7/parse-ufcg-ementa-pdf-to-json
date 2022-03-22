//desculpa se vc abriu isso na expectativa de ser um parser de PDF :kek:
const fs = require('fs')
const PDFParser = require('pdf2json')

const parser = new PDFParser()

parser.on('pdfParser_dataReady', data => fs.writeFileSync('ementas.json', JSON.stringify(data, null, 2)))

parser.loadPDF("./ementas.pdf")
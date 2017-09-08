var nodeExcel = require('excel4node');
module.exports  = {
    generateExcel: function (req, res, callback) {

        const wb = new nodeExcel.Workbook();

        var ws = wb.addWorksheet('Sheet 1');

        var style = wb.createStyle({
            font: {
                color: '#FF0800',
                size: 12
            },
            numberFormat: '$#,##0.00; ($#,##0.00); -'
        });

        ws.cell(1,1).number(580).style(style);
        wb.write('Excel.xlsx');

    }
};
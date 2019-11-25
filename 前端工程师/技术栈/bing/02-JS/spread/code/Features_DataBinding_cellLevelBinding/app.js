
        window.onload = function () {
            var spread = new GC.Spread.Sheets.Workbook(document.getElementById("ss"));
            initSpread(spread);
        };

        function initSpread(spread) {
            var spreadNS = GC.Spread.Sheets;
            
            var sheet = spread.sheets[0];
            sheet.suspendPaint();
            sheet.setColumnWidth(0, 120);
            sheet.setColumnWidth(1, 120);
            sheet.setColumnWidth(2, 120);
            sheet.setValue(0, 0, 'cell-binding1234');
            sheet.setValue(2, 1, 'name');
            sheet.setValue(3, 1, 'age');
            sheet.setValue(4, 1, 'sex');
            sheet.setValue(5, 1, 'address.postcode');

            var person = { name: "Wang feng", age: 25, sex: "male", address: { postcode: "710075" } };
            var source = new spreadNS.Bindings.CellBindingSource(person);
            sheet.setBindingPath(2, 2, "name");
            sheet.setBindingPath(3, 2, "age");
            sheet.setBindingPath(4, 2, "sex");
            sheet.setBindingPath(5, 2, "address.postcode");
            sheet.setDataSource(source);
            sheet.setSelection(2, 2, 1, 1);
            var path = sheet.getBindingPath(2, 2);
            sheet.getRange(2, 2, 4, 1).backColor("rgb(208,206,206)");
            document.getElementById("bindingPath").innerHTML=path || "";
            sheet.bind(spreadNS.Events.SelectionChanged, function() {
                var activeCell = sheet.getSelections()[0];
                var path = sheet.getBindingPath(activeCell.row, activeCell.col);
                document.getElementById("bindingPath").innerHTML=path || "";
            });
            sheet.resumePaint();

        };
        
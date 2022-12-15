function loadGraph(objects) {
    google.charts.load('current', { 'packages': ['table'] });
    google.charts.setOnLoadCallback(drawTable);

    function drawTable() {
        var data = new google.visualization.DataTable();
        data.addColumn('age', 'age');
        data.addColumn('sex', 'sex');
        data.addColumn('trestbps', 'trestbps');
        data.addColumn('chol', 'chol');
        data.addColumn('fbs', 'fbs');
        data.addColumn('restecg', 'restecg');
        data.addColumn('thalach', 'thalach');
        data.addColumn('exang', 'exang');
        data.addColumn('oldpeak', 'oldpeak');
        data.addColumn('slope', 'slope');
        data.addColumn('ca', 'ca');
        data.addColumn('thal', 'thal');
        data.addColumn('num', 'num');
        data.addRows([
            ['Mike', { v: 10000, f: '$10,000' }, true],
            ['Jim', { v: 8000, f: '$8,000' }, false],
            ['Alice', { v: 12500, f: '$12,500' }, true],
            ['Bob', { v: 7000, f: '$7,000' }, true]
        ]);

        var table = new google.visualization.Table(document.getElementById('table_div'));

        table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });


    }
}

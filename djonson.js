$(document).ready(function () {
    var countEquip = 0;
    var countDetail = 0;
    var tableTime;

    $(document).ready(function () {
        countEquip = $("#countEquip").val();
        countDetail = $("#countDetail").val();

        genTableTime("#tableTime", countEquip, countDetail);
    });
    $("#countEquip, #countDetail").on("change", function () {
        countEquip = $("#countEquip").val();
        countDetail = $("#countDetail").val();

        genTableTime("#tableTime", countEquip, countDetail);
    });

// Початок обчислень
    $("#startButton").on("click", function () {
        readTableTime();
        //Якщо к-сть обладнання 3
        if (countEquip == 3)
            resolvedForE3();
    });

// Обчислення для 3 одиниць обладнання
    function resolvedForE3() {
        sortT();
    };

//Фунція сортування деталей в правильному порядку
    function sortT(arr1, arr2) {
        var arrTemp1 = Array();
        var arrTemp2 = Array();

        for (var i = 0; i < countDetail; i++) {
            if ((tableTime[i][1] + tableTime[i][2]) < (tableTime[i][2] + tableTime[i][3])) {
                arrTemp1[arrTemp1.length] = tableTime[i];
            }
            ;
            if ((tableTime[i][1] + tableTime[i][2]) >= (tableTime[i][2] + tableTime[i][3])) {
                arrTemp2[arrTemp2.length] = tableTime[i];
            }
            ;
        }
        ;

        arrTemp1.sort(sT1T2);
        arrTemp2.sort(sT2T3);

        tableTime = Array();
        for (var i = 0; i < arrTemp1.length; i++) {
            tableTime[tableTime.length] = arrTemp1[i];
        }
        for (var i = 0; i < arrTemp2.length; i++) {
            tableTime[tableTime.length] = arrTemp2[i];
        }

        //Вивід в таблицю
        genTableData("#table1", tableTime);
    };

//Сортування за сумою 1 та 2
    function sT1T2(a, b) {
        if (a[1] + a[2] > b[1] + b[2]) return 1;
        else if (a[1] + a[2] < b[1] + b[2]) return -1;
        else return 0;
    };

//Сортування за сумою 2 та 3
    function sT2T3(a, b) {
        if (a[2] + a[3] < b[2] + b[3]) return 1;
        else if (a[2] + a[3] > b[2] + b[3]) return -1;
        else return 0;
    };

// Генерація таблиці часу обробки
    function genTableTime(nameTable, m, n) {
        $(nameTable).html("");
        var htmlTemp = "";

        for (var i = 0; i < n; i++) {
            htmlTemp = "<tr>"
            for (var j = 0; j < m; j++) {
                htmlTemp += "<td><input type='number' value='1' min='1'></td>";
            }
            ;
            htmlTemp += "</tr>";
            $(nameTable).append(htmlTemp);
        }
        ;
    };

// Генерація таблиці з даними
    function genTableData(nameTable, arrT) {
        $(nameTable).html("");
        var htmlTemp = "";

        for (var i = 0; i < arrT.length; i++) {
            htmlTemp = "<tr>"
            for (var j = 0; j < arrT[i].length; j++) {
                htmlTemp += "<td>" + arrT[i][j] + "</td>";
            }
            ;
            htmlTemp += "</tr>";
            $(nameTable).append(htmlTemp);
        }
        ;
    };

// Читання таблиці часу обробки
    function readTableTime() {
        tableTime = Array();
        $("#tableTime tr").each(function (i, v) {
            tableTime[i] = Array();
            tableTime[i][0] = i + 1; //Запис в перший стовбець номеру деталі
            $(this).children('td').each(function (ii, vv) {
                tableTime[i][ii + 1] = parseInt($(this).find("input").val());
            });
        });
    };
})
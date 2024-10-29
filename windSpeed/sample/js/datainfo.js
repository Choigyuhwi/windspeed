var lines;
var dataArray;
function receiveddataSet(data){
    lines = data.split(/\r?\n/);
    dataArray = lines.map(function(line) {
        return line.split(', ');
    });
    resultsPerPage = 10;
    currentPage = 1;
    createPaginationButtonsCustomer();
    displayDatainfo(currentPage);
    // console.log(dataArray);

}


//#region 페이징관련
var resultsPerPage;
var currentPage;
var GetData;
var result;
var getdata;
var results;
var productidstr;
function displayDatainfo(page) {
    currentPage = page; // 현재 페이지 업데이트
    var startIndex = (page - 1) * resultsPerPage;
    var endIndex = startIndex + resultsPerPage;
    results = dataArray.slice(startIndex, endIndex);
    // getdatainfo_customername(); //text파일 사용시
    displayDatainfoSet(); //DB사용시
}
var dataArray =[];
function displayDatainfoSet(){
    for(var i=0; i<results.length-1; i++){
        for(var j=0; j<getdata.length; j++){
            if(results[i][0] == getdata[j].PRODUCTID){
                dataArray[i] = getdata[j].CUSTOMERNAME;
            }
            else{
            }
        }
    }
    var tbody = document.querySelector("#ProductdataTable tbody");
    tbody.innerHTML = ""; // 이전 결과를 지움
    //text파일 results.length-1로
    //db 사용시 results.length 로 설정
    // console.log(results);
    for (var i = 0; i < results.length; i++) {
        result = results[i];
        var row = tbody.insertRow();
        var companyname = row.insertCell(0);
        var productid = row.insertCell(1);
        var modemid = row.insertCell(2);
        var receivedtime = row.insertCell(3);
        var voltage = row.insertCell(4);
        var current = row.insertCell(5);
        var windspeed1 = row.insertCell(6);
        var windspeed2 = row.insertCell(7);

        // companyname.textContent = dataArray[i]; //text파일 사용시
        companyname.textContent = result.COMPANYNAME; //DB 사용시
       
        // button.textContent = "1개";
        productid.className = i;
        var button = document.createElement('button');
        button.className = "databtn";
        // button.textContent = result[0]; //text파일 사용시
        button.textContent = result.PRODUCTID; //DB 사용시
        button.addEventListener('click', function() {
           
            var datamodalHeader = document.getElementById("dataModal-header");
            var str = this.parentNode.className;
            selectindex = parseInt(str);
            // productidstr = results[selectindex][0]; //text파일 사용시
            productidstr = results[selectindex].PRODUCTID; //DB 사용시
            datamodalHeader.textContent = productidstr;
            opendataModal();
        });
        productid.appendChild(button);

        // modemid.textContent = result[1];
        // receivedtime.textContent = result[8];
        // voltage.textContent = result[2];
        // current.textContent = result[3];
        // windspeed1.textContent = result[4];
        // windspeed2.textContent = result[7];
        //text파일 사용시--------------------------------------

        modemid.textContent = result.MODEMID;
        receivedtime.textContent = result.RECEIVEDTIME;
        voltage.textContent = result.VOLTAGE;
        current.textContent = result.CURRENT;
        windspeed1.textContent = result.WINDSPEED1;
        windspeed2.textContent = result.WINDSPEED2;
        // DB 사용시--------------------------------------

        
        // var data = "companyname=" +dataArray[i] + "&productid=" +result[0] + "&modemid=" + result[1] +"&receivedtime=" +result[8] + "&voltage=" + result[2] + "&current=" + result[3]
        //         + "&windspeed1=" + result[4] + "&windspeed2="+ result[7] + "&controlwind=" + result[5] + "&controltime=" + result[6];
        // AddDatainfo(data); //데이터 저장 부분 임시 주석
    }

}

// 페이징 버튼 생성 함수
function createPaginationButtonsCustomer() {
    
    var numPages = Math.ceil(dataArray.length / resultsPerPage);
    var paginationDiv = document.getElementById("pagination");
    paginationDiv.innerHTML = ""; // 이전 버튼을 지움

    for (var i = 1; i <= numPages; i++) {
        var button = document.createElement("button");
        button.textContent = i;
        button.addEventListener("click", function() {
            var page = parseInt(this.textContent);
            displayDatainfo(page);
        });
        paginationDiv.appendChild(button);
    }
    var buttons = document.querySelectorAll("#pagination button");
    buttons[currentPage - 1].classList.add("selected");
}
//#endregion

function table_datainfo_combobox(){  
    var comboBox1 = document.getElementById("datainfocombobox_maxview");
    // 콤보박스의 change 이벤트에 대한 이벤트 핸들러 등록
    comboBox1.addEventListener("change", function() {
            var selectedOption = comboBox1.value;
                var maxview = parseInt(selectedOption);
                resultsPerPage = maxview;
                currentPage = 1;
                loadTextFile();
        
        });

    }
window.table_datainfo_combobox = table_datainfo_combobox;

function opendataModal() {
    document.getElementById('dataModal').style.display = 'block';
    setchart_dataAvg();
    var datamodalHeader = document.getElementById("dataModal-header");
    var ProductIdtxt = datamodalHeader.textContent;
    settable_data(ProductIdtxt, MonthsAgo, today);
    simulateLoading();
}

function closedataModal() {
    document.getElementById('dataModal').style.display = 'none';
    removeChart();
}

function toggle_set(){
    var chart1 = document.getElementById('myChart_V');
    var chart2 = document.getElementById('myChart_A');
    var chart3 = document.getElementById('myChart_Wind1');
    var chart4 = document.getElementById('myChart_Wind2');
    var table = document.getElementById('receiveddataTable');
    
      // 첫 번째 토글에 대한 이벤트 리스너 추가
    document.getElementById("toggle1").addEventListener("change", function() {
        if (this.checked) {
        console.log("스프레드시트");
        chart1.style.display = 'none';
        chart2.style.display = 'none';
        chart3.style.display = 'none';
        chart4.style.display = 'none';
        table.style.display = 'block';
        // 선택된 경우 할 작업을 여기에 추가하세요.
        }
    });

    // 두 번째 토글에 대한 이벤트 리스너 추가
    document.getElementById("toggle2").addEventListener("change", function() {
        if (this.checked) {
        console.log("그래프");
        chart1.style.display = 'block';
        chart2.style.display = 'block';
        chart3.style.display = 'block';
        chart4.style.display = 'block';
        table.style.display = 'none';
        // 선택된 경우 할 작업을 여기에 추가하세요.
        }
    });

    document.getElementById("toggle3").addEventListener("change", function() {
        if (this.checked) {
        console.log("전체");
        chart1.style.display = 'block';
        chart2.style.display = 'block';
        chart3.style.display = 'block';
        chart4.style.display = 'block';
        table.style.display = 'block';
        // 선택된 경우 할 작업을 여기에 추가하세요.
        }
    });
}
window.toggle_set = toggle_set;

var myChart1;
var myChart2;
var myChart3;
var myChart4;
var count;
var getChartdata;
function ChartSet(){
     // 오늘 날짜부터 6달 후까지의 날짜를 생성
    var today = new Date(document.getElementById("endDate").value);
    var datamodalHeader = document.getElementById("dataModal-header");
    var ProductIdtxt = datamodalHeader.textContent;
    var GroupData =[];
    var GroupCount =0;
    console.log(ProductIdtxt);
    for(var i=0; i<getChartdata.length; i++){
        if(getChartdata[i].PRODUCTID == ProductIdtxt){
            GroupData[GroupCount] = getChartdata[i];
            GroupCount++;
        }
    }
    console.log(GroupData);
    var data1 = [];
    var data2 = [];
    var data3 = [];
    var data4 = [];

     // 차트 데이터 생성
    var labels = [];
    var values = [];
    var currentDate = new Date(MonthsAgo);
    count=0;
    while (currentDate <= today) {
        var month = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
        var year = currentDate.getFullYear();
        var key = year + "-" + (month < 10 ? '0' : '') + month; // 날짜 포맷 지정
        data1[count] = 0;
        data2[count] = 0;
        data3[count] = 0;
        data4[count] = 0;

        labels.push(month + "월"); // x축 레이블에 달 추가
        for(var i=0; i< GroupData.length; i++)
        {
            if(GroupData[i].month == month){
                data1[count] = GroupData[i].avg_v;
                data2[count] = GroupData[i].avg_a;
                data3[count] = GroupData[i].avg_w1;
                data4[count] = GroupData[i].avg_w2;
            }
        }
   
        currentDate.setMonth(currentDate.getMonth() + 1); // 다음 달로 이동
        count++;
    }
    // 차트 설정
    var ctx1 = document.getElementById('myChart_V').getContext('2d');
    var ctx2 = document.getElementById('myChart_A').getContext('2d');
    var ctx3 = document.getElementById('myChart_Wind1').getContext('2d');
    var ctx4 = document.getElementById('myChart_Wind2').getContext('2d');
    myChart1 = new Chart(ctx1, {
        type: 'line',
        data: {
        labels: labels, // x축 레이블
        datasets: [{
            label: '전압(V)',
            data: data1, // y축 데이터
            backgroundColor: 'rgba(255, 99, 132)', // 그래프 영역의 배경색
            borderColor: 'rgba(255, 99, 132)',
            tension: 0.1
        }]
        },
        options: {
        scales: {
            y: {
            beginAtZero: true,
            min: 0, // y축의 최소값
            max: 30000 // y축의 최대값
            },
        }
        }
    });
    myChart2 = new Chart(ctx2, {
        type: 'line',
        data: {
        labels: labels, // x축 레이블
        datasets: [{
            label: '전류(A)',
            data: data2, // y축 데이터
            backgroundColor: 'rgba(54, 162, 235)', // 그래프 영역의 배경색
            borderColor: 'rgba(54, 162, 235)',
            tension: 0.1
        }]
        },
        options: {
        scales: {
            y: {
            beginAtZero: true,
            min: 0, // y축의 최소값
            max: 200 // y축의 최대값
            },
        }
        }
    });
    myChart3 = new Chart(ctx3, {
        type: 'line',
        data: {
        labels: labels, // x축 레이블
        datasets: [{
            label: '풍속1(m/s)',
            data: data3, // y축 데이터
            backgroundColor: 'rgba(255, 206, 86)', // 그래프 영역의 배경색
            borderColor: 'rgba(255, 206, 86)',
            tension: 0.1
        }]
        },
        options: {
        scales: {
            y: {
            beginAtZero: true,
            min: 0, // y축의 최소값
            max: 100 // y축의 최대값
            },
        }
        }
    });
    myChart4 = new Chart(ctx4, {
        type: 'line',
        data: {
        labels: labels, // x축 레이블
        datasets: [{
            label: '풍속2(m/s)',
            data: data4, // y축 데이터
            backgroundColor: 'rgb(75, 192, 192)', // 그래프 영역의 배경색
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
        },
        options: {
        scales: {
            y: {
            beginAtZero: true,
            min: 0, // y축의 최소값
            max: 100 // y축의 최대값
            },
        }
        }
    });
}

function removeChart(){
    if (myChart1) {
        myChart1.destroy();
    }
    if (myChart2) {
        myChart2.destroy();
    }
    if (myChart3) {
        myChart3.destroy();
    }
    if (myChart4) {
        myChart4.destroy();
    }
}
var results2
function TableSet(tabledata){
    results2 = tabledata;
    var tbody = document.querySelector("#receiveddataTable tbody");
    tbody.innerHTML = ""; // 이전 결과를 지움

    // var $listTbody = $(".receiveddataTable tbody");
    // results2.forEach(function(val) {
    //     $listTbody.innerHTML +="<tr><td>" + val[0]["RECEIVEDTIME"]
    //      + "</td><td>" + val[1]["VOLTAGE"]
    //       + "</td><td>" + val[2]["CURRENT"]
    //        + "</td><td>" + val[3]["WINDSPEED1"]
    //         + "</td><td>" + val[4]["WINDSPEED2"] + "</td></tr>";
    // });

    //db 사용시 results.length 로 설정
    for (var i = 0; i < results2.length; i++) {
        var rowStr =
            "<tr>" +
            "<td>" + results2[i]["RECEIVEDTIME"] + "</td>" +
            "<td>" + results2[i]["VOLTAGE"] + "</td>" +
            "<td>" + results2[i]["CURRENT"] + "</td>" +
            "<td>" + results2[i]["WINDSPEED1"] + "</td>" +
            "<td>" + results2[i]["WINDSPEED2"] + "</td>" +
            "</tr>";
            // tbody.append(rowStr);
            $("#receiveddataTable").append(rowStr);


        // result = results2[i];
        // var row = tbody.insertRow();
        // var receivedtime = row.insertCell(0);
        // var voltage = row.insertCell(1);
        // var current = row.insertCell(2);
        // var windspeed1 = row.insertCell(3);
        // var windspeed2 = row.insertCell(4);
       
        // receivedtime.textContent = result.RECEIVEDTIME;
        // voltage.textContent = result.VOLTAGE;
        // current.textContent = result.CURRENT;
        // windspeed1.textContent = result.WINDSPEED1;
        // windspeed2.textContent = result.WINDSPEED2;

    }
    var loadingSpinner = document.querySelector(".loading-wrap--js");
    var loadingMessage = document.getElementById("loadingMessage");
    var loadingview = document.getElementById("loadingview");
    loadingSpinner.style.display = "none";
    loadingview.style.width=0;
    loadingview.style.height=0;

}

function simulateLoading() {
    var loadingSpinner = document.querySelector(".loading-wrap--js");
    var loadingMessage = document.getElementById("loadingMessage");
    var loadingview = document.getElementById("loadingview");
    loadingview.style.width="1000px";
    loadingview.style.height="1000px";
    // 로딩 시작
    loadingSpinner.style.display = "flex";

}
function ClickReportBtn(){
    removeChart();
    var startdate = document.getElementById("startDate");
    MonthsAgo = startdate.value
    setchart_dataAvg();
    var datamodalHeader = document.getElementById("dataModal-header");
    var ProductIdtxt = datamodalHeader.textContent;
    var enddate = document.getElementById("endDate");
    settable_data(ProductIdtxt, MonthsAgo, enddate.value);
    simulateLoading();

}

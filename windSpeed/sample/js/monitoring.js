function table_customer_combobox(){
    var comboBox1 = document.getElementById("admincombobox_super");
    var comboBox2 = document.getElementById("admincombobox_admin");
    var comboBox3 = document.getElementById("customercombobox_admin");
    var comboBox4 = document.getElementById("customercombobox_searchtitle");

// 콤보박스의 change 이벤트에 대한 이벤트 핸들러 등록
    comboBox1.addEventListener("change", function() {
        // 선택된 옵션의 값을 가져와서 콘솔에 출력
            while (comboBox2.options.length > 0) {
                comboBox2.remove(0);
            }
            while (comboBox3.options.length > 0) {
                comboBox3.remove(0);
            }
            if(comboBox1.value =="all"){
                var option1 = document.createElement("option");
                option1.text = "전체";
                option1.value = "all";
                comboBox2.add(option1);

                var option2 = document.createElement("option");
                option2.text = "전체";
                option2.value = "all";
                comboBox3.add(option2);
            }
            else
            {
                var option2 = document.createElement("option");
                option2.text = "전체";
                option2.value = "all";
                comboBox3.add(option2);
                var selectedIndex = comboBox1.selectedIndex;
                // 선택된 옵션의 텍스트 가져오기
                var selectedText = comboBox1.options[selectedIndex].text;
                var str = "WHERE ADMINLEVEL='level2' AND PARENTADMIN ='"+selectedText+"'";
                getmonitoringconditiondata2(str,1);
            }
    });

    comboBox2.addEventListener("change", function() {

        while (comboBox3.options.length > 0) {
            comboBox3.remove(0);
        }
        if(comboBox1.value =="all"){
            var option2 = document.createElement("option");
            option2.text = "전체";
            option2.value = "all";
            comboBox3.add(option2);
            var str = "";
            getcustomerdata(str);
        }
        else
        {
            var option2 = document.createElement("option");
            option2.text = "전체";
            option2.value = "all";
            comboBox3.add(option2);

            // 선택된 옵션의 텍스트 가져오기
            var combobox1 = comboBox1.value;
            var combobox2 = comboBox2.value;
            var str = "WHERE ADMINLEVEL='level3' AND PARENTADMIN='"+combobox1+"' AND PART ='"+combobox2+"'";
            getmonitoringconditiondata2(str,2);
            // console.log(str);
        }
    });
    
    comboBox3.addEventListener("change", function() {

    });
          
}
var receiveddata;
// 텍스트 파일을 가져와 화면에 표시하는 함수
function loadTextFile_monitoring() {
    var filePath = 'http://118.45.177.125:7071/received_data.txt';
    // XMLHttpRequest 객체를 생성합니다.
    var xhr = new XMLHttpRequest();
    // 파일을 비동기적으로 가져옵니다.
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // 파일 내용을 가져와 화면에 표시합니다.
                receiveddata = xhr.responseText;
                initializeMap();

            } else {
                console.error('파일을 불러오는데 오류 발생:', xhr.statusText);
            }
        }
    };

    // GET 요청을 보냅니다.
    xhr.open('GET', filePath, true);
    xhr.send();
}
window.loadTextFile_monitoring = loadTextFile_monitoring;

function opendataModal() {
    document.getElementById('dataModal').style.display = 'block';
    Monitoringsetchart_dataAvg();
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
function MonitoringChartSet(){
    console.log(getChartdata);
     // 오늘 날짜부터 6달 후까지의 날짜를 생성
    var today = new Date(document.getElementById("endDate").value);
    var datamodalHeader = document.getElementById("dataModal-header");
    var ProductIdtxt = datamodalHeader.textContent;
    var GroupData =[];
    var GroupCount =0;
    for(var i=0; i<getChartdata.length; i++){
        if(getChartdata[i].PRODUCTID == ProductIdtxt){
            GroupData[GroupCount] = getChartdata[i];
            GroupCount++;
        }
    }
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
function TableSet(tabledata){
    results = tabledata;
    var tbody = document.querySelector("#receiveddataTable tbody");
    tbody.innerHTML = ""; // 이전 결과를 지움
    //db 사용시 results.length 로 설정
    for (var i = 0; i < results.length; i++) {
        result = results[i];
        var row = tbody.insertRow();
        var receivedtime = row.insertCell(0);
        var voltage = row.insertCell(1);
        var current = row.insertCell(2);
        var windspeed1 = row.insertCell(3);
        var windspeed2 = row.insertCell(4);
       
        receivedtime.textContent = result.RECEIVEDTIME;
        voltage.textContent = result.VOLTAGE;
        current.textContent = result.CURRENT;
        windspeed1.textContent = result.WINDSPEED1;
        windspeed2.textContent = result.WINDSPEED2;
        var loadingSpinner = document.querySelector(".loading-wrap--js");
        var loadingMessage = document.getElementById("loadingMessage");
        var loadingview = document.getElementById("loadingview");
        loadingSpinner.style.display = "none";
        loadingview.style.width=0;
        loadingview.style.height=0;
    }
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
    Monitoringsetchart_dataAvg();
    var enddate = document.getElementById("endDate");
    var datamodalHeader = document.getElementById("dataModal-header");
    var ProductIdtxt = datamodalHeader.textContent;
    settable_data(ProductIdtxt, MonthsAgo, enddate.value);
    simulateLoading();

}
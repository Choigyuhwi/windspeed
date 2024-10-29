<?php
    $servername = "localhost"; // 데이터베이스 호스트 주소
    $username = "root"; // 데이터베이스 사용자 이름
    $password = "bigwave1234"; // 데이터베이스 암호
    $dbname = "datainfo"; // 사용할 데이터베이스 이름
        
        // 데이터베이스 연결 생성
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    // 연결 확인
    if (!$conn) {
        die("데이터베이스 연결 실패: " . mysqli_connect_error());
    }

    $companyname = $_POST['companyname'];
    $productid = $_POST['productid'];
    $modemid = $_POST['modemid'];
    $receivedtime = $_POST['receivedtime'];
    $voltage = $_POST['voltage'];
    $current = $_POST['current'];
    $windspeed1 = $_POST['windspeed1'];
    $windspeed2 = $_POST['windspeed2'];
    $controlwind = $_POST['controlwind'];
    $controltime = $_POST['controltime'];
   

    mysqli_set_charset($conn, "utf8");
    
    $sql = "INSERT INTO datainfo (NO, COMPANYNAME, PRODUCTID, MODEMID, RECEIVEDTIME, VOLTAGE, CURRENT,WINDSPEED1, WINDSPEED2, CONTROLWIND, CONTROLTIME)
            VALUES ('0', '$companyname', '$productid', '$modemid', '$receivedtime', '$voltage', '$current', '$windspeed1', '$windspeed2', '$controlwind', '$controltime')";
    echo "ok";
    $result = $conn->query($sql);
    
    // 데이터베이스 연결 종료
    $conn->close();
?>
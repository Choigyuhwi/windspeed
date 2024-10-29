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

    $customerid = $_POST['customerid'];
    $productid = $_POST['productid'];
    $modemid = $_POST['modemid'];
    $voltage = $_POST['voltage'];
    $current = $_POST['current'];
    $windspeed1 = $_POST['windspeed1'];
    $windspeed2 = $_POST['windspeed2'];
    $checktime = $_POST['checktime'];
    $address = $_POST['address'];
    $postcode = $_POST['postcode'];
    $address2 = $_POST['address2'];
    $longitude = $_POST['longitude'];
    $latitude = $_POST['latitude'];
    
    mysqli_set_charset($conn, "utf8");
    
    $sql = "INSERT INTO productinfo (NO, CUSTOMERNAME, PRODUCTID, MODEMID, VOLTAGE, CURRENT, WINDSPEED1,WINDSPEED2, CHECKTIME, ADDRESS, 
            POSTCODE, ADDRESS2, LONGITUDE, LATITUDE)
            VALUES ('0', '$customerid', '$productid', '$modemid', '$voltage', '$current', '$windspeed1', '$windspeed2', '$checktime', '$address',
            '$postcode', '$address2', '$longitude', '$latitude')";
    // echo $sql;
    $result = $conn->query($sql);
    echo "ok";
    // 데이터베이스 연결 종료
    $conn->close();
?>
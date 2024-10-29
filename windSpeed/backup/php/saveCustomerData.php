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

    $superlevel = $_POST['superlevel'];
    $adminlevel = $_POST['adminlevel'];
    $saleplace = $_POST['saleplace'];
    $customername = $_POST['customername'];
    $ceo = $_POST['ceo'];
    $address = $_POST['address'];
    $postcode = $_POST['postcode'];
    $address2 = $_POST['address2'];
    $longitude = $_POST['longitude'];
    $latitude = $_POST['latitude'];
    $customernum = $_POST['customernum'];
    $errornum1 = $_POST['errornum1'];
    $errornum2 = $_POST['errornum2'];
    $errornum3 = $_POST['errornum3'];
    $etc = $_POST['etc'];
    
    mysqli_set_charset($conn, "utf8");
    
    $sql = "INSERT INTO customerinfo (NO, SUPERLEVEL, ADMINLEVEL, SALEPLACE, CUSTOMERNAME, CEO, ADDRESS, POSTCODE, ADDRESS2, LONGITUDE, LATITUDE, CUSTOMERNUM, ERRORNUM1, ERRORNUM2, ERRORNUM3, ETC)
            VALUES ('0','$superlevel', '$adminlevel', '$saleplace', '$customername', '$ceo', '$address', '$postcode', '$address2', '$longitude', '$latitude', '$customername', '$errornum1', '$errornum2', '$errornum3', '$etc')";
    // echo $sql;
    echo "ok";
    $result = $conn->query($sql);
    
    // 데이터베이스 연결 종료
    $conn->close();
?>
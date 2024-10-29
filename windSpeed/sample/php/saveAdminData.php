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

    $adminlevel = $_POST['adminlevel'];
    $parentadmin = $_POST['parentadmin'];
    $id = $_POST['id'];
    $password = $_POST['password'];
    $conpanyname = $_POST['conpanyname'];
    $part = $_POST['part'];
    $ceo = $_POST['ceo'];
    $address = $_POST['address'];
    $postcode = $_POST['postcode'];
    $address2 = $_POST['address2'];
    $longitude = $_POST['longitude'];
    $latitude = $_POST['latitude'];
    $tellnum = $_POST['tellnum'];
    $email = $_POST['email'];
    $alrmcheck = $_POST['alrmcheck'];
    $alrmstarttime = $_POST['alrmstarttime'];
    $alrmendtime = $_POST['alrmendtime'];
    $alrmholicheck = $_POST['alrmholicheck'];
    $etc = $_POST['etc'];

    
    mysqli_set_charset($conn, "utf8");
    
    $sql = "INSERT INTO userinfo (NO, ADMINLEVEL, PARENTADMIN, ID, PASSWORD, COMPANY, PART,CEO, ADDRESS, POSTCODE, 
            ADDRESS2, LONGITUDE, LATITUDE, PHONENUM, EMAIL, ARLMCHECK, ARLMSTARTTIME, ARLMENDTIME, ARLMHOLIDAYCHECK, ETC)
            VALUES ('0', '$adminlevel', '$parentadmin', '$id', '$password', '$conpanyname', '$part', '$ceo', '$address', '$postcode',
            '$address2', '$longitude', '$latitude', '$tellnum', '$email', '$alrmcheck','$alrmstarttime','$alrmendtime','$alrmholicheck','$etc')";
    echo "ok";
    $result = $conn->query($sql);
    
    // 데이터베이스 연결 종료
    $conn->close();
?>
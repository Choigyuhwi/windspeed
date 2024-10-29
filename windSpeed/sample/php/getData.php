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

    mysqli_set_charset($conn, "utf8");
    
    $sql = "SELECT * FROM userinfo";
    $result = $conn->query($sql);


    if ($result->num_rows > 0) {
        // 결과를 배열로 변환하여 JSON으로 출력
        $data = array();
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode($data);
    } else {
        echo "0개의 결과를 찾았습니다.";
    }
    
    // 데이터베이스 연결 종료
    $conn->close();
?>
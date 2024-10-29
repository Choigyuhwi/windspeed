<?php
// 데이터베이스 연결
$servername = "localhost"; // 데이터베이스 호스트 주소
$username = "root"; // 데이터베이스 사용자 이름
$password = "bigwave1234"; // 데이터베이스 암호
$dbname = "datainfo"; // 사용할 데이터베이스 이름

// 연결 생성
$conn = new mysqli($servername, $username, $password, $dbname);

// 연결 확인
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// 업데이트할 데이터

$data = $_POST['data'];
$id = $_POST['id'];
mysqli_set_charset($conn, "utf8");
// SQL 업데이트 문
$sql = "UPDATE customerinfo SET $data WHERE CUSTOMERNAME='$id'";
// echo $sql;
$result = $conn->query($sql);
if ($conn->query($sql) === TRUE) {
    echo "ok";
  } else {
    echo "Error deleting record: " . $conn->error;
  }
  
// 데이터베이스 연결 종료
$conn->close();
?>
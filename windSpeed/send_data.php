<?php
// 데이터를 받아옵니다.
$data = file_get_contents('php://input');
$dataArray = explode(",", $data);

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

$companyname = $dataArray[0];
$productid = $dataArray[1];
$modemid = $dataArray[2];
$receivedtime = $dataArray[9];
$voltage = $dataArray[3];
$current = $dataArray[4];
$windspeed1 = $dataArray[5];
$windspeed2 = $dataArray[8];
$controlwind = $dataArray[6];
$controltime = $dataArray[7];


mysqli_set_charset($conn, "utf8");

$sql = "INSERT INTO datainfo (NO, COMPANYNAME, PRODUCTID, MODEMID, RECEIVEDTIME, VOLTAGE, CURRENT,WINDSPEED1, WINDSPEED2, CONTROLWIND, CONTROLTIME)
        VALUES ('0', '$companyname', '$productid', '$modemid', '$receivedtime', '$voltage', '$current', '$windspeed1', '$windspeed2', '$controlwind', '$controltime')";
echo $sql;
$result = $conn->query($sql);

// 데이터베이스 연결 종료
$conn->close();
// 성공적인 응답을 보냅니다.

?>
<?php
// 이 부분에서 데이터를 가져오는 코드를 구현합니다.
$data = "test";

// 데이터를 JSON 형식으로 반환합니다.
header('Content-Type: application/json');
echo json_encode($data);
?>
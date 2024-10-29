<?php
   / 데이터를 받아서 저장 또는 처리하는 API

   // CORS 문제를 해결하기 위해 모든 도메인에서 요청을 허용합니다.
   header("Access-Control-Allow-Origin: *");
   
   // POST 요청이 맞는지 확인합니다.
   if ($_SERVER['REQUEST_METHOD'] === 'POST') {
       // 요청 본문에서 데이터를 가져옵니다.
       $postData = file_get_contents('php://input');
       
       // 데이터를 받아와서 처리할 수 있습니다. 여기서는 간단히 받은 데이터를 출력합니다.
       echo "서버에서 받은 데이터: " . $postData;
   } else {
       // POST 요청이 아닌 경우 오류를 반환합니다.
       http_response_code(405); // Method Not Allowed
       echo "POST 요청이 아닙니다.";
   }
?>

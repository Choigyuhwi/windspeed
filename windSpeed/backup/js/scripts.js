
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }
   
});

var userid;
var userpassword;

var is_login;

//아이디 있는지 없는지 체크
function checkLogin(){
    userid = document.getElementById("inputId").value;
    userpassword = document.getElementById("inputPassword").value;
    checkLogin_db();   
}
//php통해서 데이터를 받아서 처리
function Loginset(){
    if(is_login){
        swal({
            title:"로그인",
            text: "로그인이 완료되었습니다!",
            icon: "success", //"info,success,warning,error" 중 택1
            buttons: {
                confirm: "확인",
              },
        }).then((OK) => {
            if (OK) {
                window.location.href = "table_monitoring.html";
            }
       });

    }
    else{
        swal({
            title:"로그인",
            text: "존재하지 않는 정보입니다!",
            icon: "error", //"info,success,warning,error" 중 택1
            dangerMode: true,
            buttons: {
                confirm: "확인",
              },
        });
    }
}
//아이디 기억하기
function RememberId(){
    var storedUsername = localStorage.getItem("inputId");
    if (storedUsername) {
        document.getElementById("inputId").value = storedUsername;
        var rememberMeCheckbox = document.getElementById("inputRememberPassword");
        if (rememberMeCheckbox) {
            rememberMeCheckbox.checked = true;
        }
    }
    // 체크박스 상태 변경 시 아이디 저장 여부 확인
    document.getElementById("inputRememberPassword").addEventListener("change", function() {
        var username = document.getElementById("inputId").value;
        if (this.checked) {
            localStorage.setItem("inputId", username);
        } else {
            localStorage.removeItem("inputId");
        }
    });
}
window.RememberId = RememberId;





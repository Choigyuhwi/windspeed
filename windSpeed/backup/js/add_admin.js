var firsttext;
var secondtext;
var thirdtext;
var issave;

var adminLevel;
var parentadmin;
var id;
var password;
var passwordcheck;
var conpanyname;
var part;
var ceo;
var address;
var postcode;
var address2;
var longitude;
var latitude;
var tellnum;
var email;
var alrmcheck;
var alrmstarttime;
var alrmendtime;
var alrmholidaycheck;
var etc;

var is_success_admin;

var partname;

//추가버튼이벤트
function addbtn(){
    adminLevel = document.getElementById("adminLevel").value;
    id = document.getElementById("id").value;
    password = document.getElementById("password").value;
    passwordcheck = document.getElementById("passwordcheck").value;
    conpanyname = document.getElementById("conpanyname").value;
    
    ceo = document.getElementById("ceo").value;
    address = document.getElementById("address").value;
    postcode = document.getElementById("postcode").value;
    address2 = document.getElementById("address2").value;
    longitude =document.getElementById("longitude").value;
    latitude = document.getElementById("latitude").value;
    tellnum = document.getElementById("tellnum").value;
    email = document.getElementById("email").value;
    alrmcheck = document.getElementById("alrmcheck").checked;
    alrmstarttime = document.getElementById("alrmstarttime").value;
    alrmendtime = document.getElementById("alrmendtime").value;
    alrmholidaycheck = document.getElementById("alrmholidaycheck").checked;
    etc = document.getElementById("etc").value;

    var selectcombobox = document.getElementById("adminLevel");

    if(selectcombobox.value =="level1"){
        parentadmin = id;
        part = "X"
    }
    else if(selectcombobox.value =="level2"){
        parentadmin = document.getElementById("parentadmin").value;
        part = "X";
    }
    else{
        var selectElement  = document.getElementById("parentadmin"); 

        var selectedIndex = selectElement.selectedIndex;
        // 선택된 옵션의 텍스트 가져오기
        var selectedText = selectElement.options[selectedIndex].text;

        var words = selectedText.split(":");
        // console.log(words);
        parentadmin = words[0];
        part = words[1];
    }

   

    // console.log(adminLevel+" , "+parentadmin+" , "+id+" , "+password+" , "+passwordcheck+" , "+conpanyname+" , "+ceo+" , "+address+" , "+
    // postcode+" , "+address2+" , "+longitude+" , "+latitude+" , "+tellnum+" , "+email+" , "+alrmcheck+" , "+alrmstarttime+" , "+alrmendtime+" , "+alrmholidaycheck+" , "+etc);
    if(id ===''){
        firsttext = "회원가입 오류";
        secondtext = "아이디를 입력해 주세요!";
        thirdtext = "error";
        show_alert();
    }
    else if(password ===''){
        firsttext = "회원가입 오류";
        secondtext = "비밀번호를 입력해 주세요!";
        thirdtext = "error";
        show_alert();
    }
    else if(conpanyname ===''){
        firsttext = "회원가입 오류";
        secondtext = "회사명을 입력해 주세요!";
        thirdtext = "error";
        show_alert();
    }
    else if(ceo ===''){
        firsttext = "회원가입 오류";
        secondtext = "대표자를 입력해 주세요!";
        thirdtext = "error";
        show_alert();
    } 
    else{
        if(password === passwordcheck){
            var starttime = parseInt(alrmstarttime);
            var endtime = parseInt(alrmendtime); 
            if(starttime < endtime)
            {
                checkadmin_db();
            }
            else{
                firsttext = "회원가입 오류";
                secondtext = "알람수신 시간이 알맞지 않습니다!";
                thirdtext = "error";
                show_alert();
            }
        }
        else{
            firsttext = "회원가입 오류";
            secondtext = "비밀번호가 일치하지 않습니다!";
            thirdtext = "error";
            show_alert();
        }
    } 
   
}

//메세지 이벤트
function show_alert(){
   
    swal({
        title: firsttext,
        text: secondtext,
        icon: thirdtext, //"info,success,warning,error" 중 택1
        buttons: {
                    confirm: "확인",
                  },
    });
}

//회원가입 완료이벤트
function setAddadmincheck(){
    if(is_success_admin == "ok"){
        swal({
            title:"회원가입 완료",
            text: "회원가입이 완료되었습니다!",
            icon: "success", //"info,success,warning,error" 중 택1
            buttons: {
                confirm: "확인",
              },
        }).then((OK) => {
            if (OK) {
                window.location.href = "table_admin.html";
            }
       });
    }
    else{
        firsttext = "회원가입 오류";
        secondtext = "데이터 저장 오류입니다!";
        thirdtext = "error";
        show_alert();
    }
}

function registercombobox(){
    var comboBox1 = document.getElementById("adminLevel");
    var comboBox2 = document.getElementById("parentadmin");
// 콤보박스의 change 이벤트에 대한 이벤트 핸들러 등록
    comboBox1.addEventListener("change", function() {
        while (comboBox2.options.length > 0) {
            comboBox2.remove(0);
        }
        console.log(comboBox1.value);
        // 선택된 옵션의 값을 가져와서 콘솔에 출력
        if(comboBox1.value =="level2"){
            var str = "WHERE ADMINLEVEL='level1'";
            getregisterAdminconditiondata(str,0);
        }
        else if(comboBox1.value == "level3"){
            var str = "WHERE ADMINLEVEL='level2'";
            getregisterAdminconditiondata(str,1);
        }
    });

    comboBox2.addEventListener("change", function() {
        
    });
}
window.registercombobox = registercombobox;


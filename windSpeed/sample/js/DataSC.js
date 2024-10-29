//데이터 php호출 sample
function getdata(condition){
    // AJAX 요청 생성
    var xhr = new XMLHttpRequest();
    var url = "http://118.45.177.125:7071/sample/php/getProductData.php"; // PHP 스크립트의 경로
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var data = "condition= " + condition;
    // 응답이 도착했을 때 실행되는 콜백 함수 설정
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            // 응답 데이터를 처리
            if(xhr.responseText =="0개의 결과를 찾았습니다.")
            {
                displayProductCount=0;
            }
            else
            {
                // console.log(xhr.responseText);
                monitoringRoadData = JSON.parse(xhr.responseText);
                Monitoring_setdata();
            }
        } else {
            console.error('요청에 실패했습니다.');
        }
    };
    // 요청 보내기
    xhr.send(data);
}
window.getdata = getdata;
//#region  관리자
//관리자 추가
function setdata_admin(){
       // AJAX 요청 생성
       var xhr = new XMLHttpRequest();
       var url = "http://118.45.177.125:7071/sample/php/saveAdminData.php"; // PHP 스크립트의 경로

        // POST 방식으로 요청을 보냄
       xhr.open("POST", url, true);
       xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

       var data = "adminlevel=" +adminLevel + "&parentadmin=" +parentadmin + "&id=" + id +"&password=" +password + "&conpanyname=" + conpanyname + "&part=" + part
                    + "&ceo=" + ceo + "&address="+ address + "&postcode=" + postcode + "&address2="+ address2 + "&longitude=" + longitude + "&latitude=" + latitude
                    + "&tellnum=" + tellnum + "&email=" +  email + "&alrmcheck=" + alrmcheck + "&alrmstarttime=" + alrmstarttime + "&alrmendtime=" + alrmendtime
                    + "&alrmholicheck=" + alrmholidaycheck + "&etc=" + etc;
        // console.log(data);
       xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // console.log(xhr.responseText); // PHP 스크립트의 응답을 콘솔에 출력
            is_success_admin = xhr.responseText;
            setAddadmincheck();
        }
    }
    // 데이터 전송
    xhr.send(data);
}

//관리자 데이터 호출
var AdmindataArray;
function getadmindata(condition){
    // AJAX 요청 생성
    var xhr = new XMLHttpRequest();
    var url = "http://118.45.177.125:7071/sample/php/getAdminData.php"; // PHP 스크립트의 경로

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var data = "condition= " + condition;
    var nondata = document.querySelector('.nondata');

    // 응답이 도착했을 때 실행되는 콜백 함수 설정
    xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
        // 응답 데이터를 처리
        if(xhr.responseText =="0개의 결과를 찾았습니다.")
        {
            nondata.textContent = "데이터가 없습니다."

        }
        else
        {
            nondata.textContent = ""
            AdmindataArray = JSON.parse(xhr.responseText);
            resultsPerPage = 10;
            currentPage = 1;
            displayResults(1);
            createPaginationButtons();
        }
    } else {
        console.error('요청에 실패했습니다.');
    }
    };

    // 요청 보내기
    xhr.send(data);
}

function get_modifyAdmindata(condition){
    // AJAX 요청 생성
    var xhr = new XMLHttpRequest();
    var url = "http://118.45.177.125:7071/sample/php/getAdminData.php"; // PHP 스크립트의 경로

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var data = "condition= " + condition;

    // 응답이 도착했을 때 실행되는 콜백 함수 설정
    xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
        // 응답 데이터를 처리
        AdmindataArray2 = JSON.parse(xhr.responseText);
        modifyAdminPageSet();
    } else {
        console.error('요청에 실패했습니다.');
    }
    };

    // 요청 보내기
    xhr.send(data);
}
//관리자조건에서 combobox추가
var getdatatxt;
function getadminconditiondata2(condition, idx){
    // AJAX 요청 생성
    var xhr = new XMLHttpRequest();
    var url = "http://118.45.177.125:7071/sample/php/getAdminData.php"; // PHP 스크립트의 경로

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var data = "condition= "+ condition;

    // 응답이 도착했을 때 실행되는 콜백 함수 설정
    xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
        // 응답 데이터를 처리
        // console.log(xhr.responseText);
        if(xhr.responseText =="0개의 결과를 찾았습니다.")
        {
            if(idx ==1){
                var selectElement = document.getElementById("admincombobox_admin");
                var option = document.createElement("option");
                option.text = "전체";
                option.value = "all";
                selectElement.add(option);
            }
        }
        else
        {
            getdatatxt = JSON.parse(xhr.responseText);
            if(idx ==0){
                var supercombobox = document.getElementById("admincombobox_super");
                var i=0;
                while (supercombobox.options.length > 0) {
                    supercombobox.remove(0);
                }
                getdatatxt.forEach(function(option) {
                    if(i==0){
                        var opt = document.createElement('option');
                        opt.appendChild(document.createTextNode(option));
                        opt.value = "all";
                        opt.textContent = "전체";
                        supercombobox.appendChild(opt);
                    }
                    var opt = document.createElement('option');
                    opt.appendChild(document.createTextNode(option));
                    opt.value = getdatatxt[i].ID;
                    opt.textContent = getdatatxt[i].ID;
                    supercombobox.appendChild(opt);
                    i++;
                });
            }
            else if(idx == 1){
                var supercombobox = document.getElementById("admincombobox_admin");
                var i=0;
                getdatatxt.forEach(function(option) {
                    if(i==0){
                        var opt = document.createElement('option');
                        opt.appendChild(document.createTextNode(option));
                        opt.value = "all";
                        opt.textContent = "전체";
                        supercombobox.appendChild(opt);
                    }
                    var opt = document.createElement('option');
                    opt.appendChild(document.createTextNode(option));
                    opt.value = getdatatxt[i].ID;
                    opt.textContent = getdatatxt[i].ID;
                    supercombobox.appendChild(opt);
                    i++;
                });
                // console.log(data); 
                // console.log(getdatatxt); // 데이터 확인
            }
        }
      
    } else {
        console.error('요청에 실패했습니다.');
    }
    };

    // 요청 보내기
    xhr.send(data);
}
window.getadmindata = getadmindata;

var getdatatxt2;
function getregisterAdminconditiondata(condition, idx){
    // AJAX 요청 생성
    var xhr = new XMLHttpRequest();
    var url = "http://118.45.177.125:7071/sample/php/getAdminData.php"; // PHP 스크립트의 경로

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var data = "condition= "+ condition;

    // 응답이 도착했을 때 실행되는 콜백 함수 설정
    xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
        // 응답 데이터를 처리
        getdatatxt2 = JSON.parse(xhr.responseText);
        
        if(idx ==0){
            var supercombobox = document.getElementById("parentadmin");
            var i=0;
           
            getdatatxt2.forEach(function(option) {
                var opt = document.createElement('option');
                opt.appendChild(document.createTextNode(option));
                opt.value = getdatatxt2[i].ID;
                opt.textContent = getdatatxt2[i].ID;
                supercombobox.appendChild(opt);
                i++;
            });
        }
        else if(idx == 1){
            var supercombobox = document.getElementById("parentadmin");
            var i=0;
            getdatatxt2.forEach(function(option) {
                var opt = document.createElement('option');
                opt.appendChild(document.createTextNode(option));
                opt.value = getdatatxt2[i].ID;
                opt.textContent = getdatatxt2[i].PARENTADMIN+":"+getdatatxt2[i].ID;
                supercombobox.appendChild(opt);
                i++;
            });
        }
        // console.log(data); 
        // console.log(getdatatxt2); // 데이터 확인
      
    } else {
        console.error('요청에 실패했습니다.');
    }
    };

    // 요청 보내기
    xhr.send(data);
}

//로그인 확인
function checkLogin_db(){
         // AJAX 요청 생성
         var xhr = new XMLHttpRequest();
         var url = "http://118.45.177.125:7071/sample/php/loginCheck.php"; // PHP 스크립트의 경로
  
          // POST 방식으로 요청을 보냄
         xhr.open("POST", url, true);
         xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
         var data = "id=" +userid + "&password=" +userpassword;
         xhr.onreadystatechange = function() {
          if (xhr.readyState == 4 && xhr.status == 200) {
            //   console.log(xhr.responseText); // PHP 스크립트의 응답을 콘솔에 출력
              if(xhr.responseText == "ok"){
                is_login = true;
              }
              else{
                is_login  = false;
              }
              Loginset();
          }
      }
      // 데이터 전송
      xhr.send(data);
}

//회원가입 중복 확인
function checkadmin_db(){
    // AJAX 요청 생성
    var xhr = new XMLHttpRequest();
    var url = "http://118.45.177.125:7071/sample/php/saveAdminCheck.php"; // PHP 스크립트의 경로

     // POST 방식으로 요청을 보냄
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var data = "id=" +id;
    xhr.onreadystatechange = function() {
     if (xhr.readyState == 4 && xhr.status == 200) {
        //  console.log(xhr.responseText); // PHP 스크립트의 응답을 콘솔에 출력
         if(xhr.responseText == "ok"){
            firsttext = "회원가입 오류";
            secondtext = "이미 등록된 아이디 입니다!";
            thirdtext = "error";
            show_alert();
         }
         else{
            setdata_admin();
        }
     }
 }
 // 데이터 전송
 xhr.send(data);
}
//관리자 정보 수정
function setmodifyAdmin(data, id){
     // AJAX 요청 생성
     var xhr = new XMLHttpRequest();
     var url = "http://118.45.177.125:7071/sample/php/UpdateAdminData.php"; // PHP 스크립트의 경로

      // POST 방식으로 요청을 보냄
     xhr.open("POST", url, true);
     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

     var Senddata = "data=" +data + "&id=" +id;
     xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        if(xhr.responseText == "ok"){
            swal({
                title:"회원정보 수정",
                text: "회원정보 수정이 완료되었습니다!",
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
        // console.log(xhr.responseText);
      }
  }
  // 데이터 전송
  xhr.send(Senddata);
}
//관리자 정보 삭제
function delectAdmin(id){
     // AJAX 요청 생성
     var xhr = new XMLHttpRequest();
     var url = "http://118.45.177.125:7071/sample/php/DeleteAdminData.php"; // PHP 스크립트의 경로

      // POST 방식으로 요청을 보냄
     xhr.open("POST", url, true);
     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

     var Sendid = "id=" +id;
     xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        if(xhr.responseText == "ok");{
            swal({
                title:"회원정보 삭제",
                text: "회원정보 삭제 완료되었습니다!",
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
        // console.log(xhr.responseText);
      }
  }
  // 데이터 전송
  xhr.send(Sendid);
}

//관리자검색
function searchAdmin(text){
    // AJAX 요청 생성
    var xhr = new XMLHttpRequest();
    var url = "http://118.45.177.125:7071/sample/php/getAdminSearch.php"; // PHP 스크립트의 경로

     // POST 방식으로 요청을 보냄
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var Sendid = "searchtext=" +text;
    xhr.onreadystatechange = function() {
     if (xhr.readyState == 4 && xhr.status == 200) {
        if(xhr.responseText =="false")
        {
            swal({
                title:"검색 오류",
                text: "일치하는 데이터가 없습니다.",
                dangerMode: true,
                icon: "error", //"info,success,warning,error" 중 택1
                buttons: {
                    confirm: "확인",
                  },
            });
        }
        else
        {
            // console.log(xhr.responseText);
            AdmindataArray = JSON.parse(xhr.responseText);
            currentPage = 1;
            displayResults(1);
            createPaginationButtons();
        }
     }
 }
 // 데이터 전송
 xhr.send(Sendid);
}
//#endregion


//#region 고객
function getcustomerconditiondata2(condition, idx){
    // AJAX 요청 생성
    var xhr = new XMLHttpRequest();
    var url = "http://118.45.177.125:7071/sample/php/getAdminData.php"; // PHP 스크립트의 경로

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var data = "condition= "+ condition;

    // 응답이 도착했을 때 실행되는 콜백 함수 설정
    xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
        // 응답 데이터를 처리
        // console.log(xhr.responseText);
        if(xhr.responseText =="0개의 결과를 찾았습니다.")
        {
            if(idx ==1){
                var selectElement = document.getElementById("admincombobox_admin");
                var option = document.createElement("option");
                option.text = "전체";
                option.value = "all";
                selectElement.add(option);
            }
        }
        else
        {
            getdatatxt = JSON.parse(xhr.responseText);
            if(idx ==0){
                var supercombobox = document.getElementById("admincombobox_super");
                var i=0;
                while (supercombobox.options.length > 0) {
                    supercombobox.remove(0);
                }
                getdatatxt.forEach(function(option) {
                    if(i==0){
                        var opt = document.createElement('option');
                        opt.appendChild(document.createTextNode(option));
                        opt.value = "all";
                        opt.textContent = "전체";
                        supercombobox.appendChild(opt);
                    }
                    var opt = document.createElement('option');
                    opt.appendChild(document.createTextNode(option));
                    opt.value = getdatatxt[i].ID;
                    opt.textContent = getdatatxt[i].ID;
                    supercombobox.appendChild(opt);
                    i++;
                });
            }
            else if(idx == 1){
                var supercombobox = document.getElementById("admincombobox_admin");
                var i=0;
                getdatatxt.forEach(function(option) {
                    var opt = document.createElement('option');
                    opt.appendChild(document.createTextNode(option));
                    opt.value = getdatatxt[i].ID;
                    opt.textContent = getdatatxt[i].ID;
                    supercombobox.appendChild(opt);
                    i++;
                });
                // console.log(data); 
                // console.log(getdatatxt); // 데이터 확인
            }
            else if(idx == 2){
                var supercombobox = document.getElementById("customercombobox_admin");
                var i=0;
                getdatatxt.forEach(function(option) {
                    var opt = document.createElement('option');
                    opt.appendChild(document.createTextNode(option));
                    opt.value = getdatatxt[i].ID;
                    opt.textContent = getdatatxt[i].ID;
                    supercombobox.appendChild(opt);
                    i++;
                });
                // console.log(data); 
                // console.log(getdatatxt); // 데이터 확인
            }
        }
      
    } else {
        console.error('요청에 실패했습니다.');
    }
    };

    // 요청 보내기
    xhr.send(data);
}
window.getcustomerconditiondata2 = getcustomerconditiondata2;

function getregisterconditiondata(condition, idx){
    // AJAX 요청 생성
    var xhr = new XMLHttpRequest();
    var url = "http://118.45.177.125:7071/sample/php/getAdminData.php"; // PHP 스크립트의 경로

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var data = "condition= "+ condition;

    // 응답이 도착했을 때 실행되는 콜백 함수 설정
    xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
        // 응답 데이터를 처리
        if(xhr.responseText =="0개의 결과를 찾았습니다."){
            if(idx ==1){
                swal({
                    title: "관리자 오류",
                    text: "관리자가 등록되지 않았습니다. 관리자를 추가해주세요.",
                    icon: "error", //"info,success,warning,error" 중 택1
                    dangerMode: true,
                    buttons: {
                        confirm: "확인",
                      },

                }).then((OK) => {
                    if (OK) {
                       
                    }
                });
            }
            else if(idx == 2){
                swal({
                    title: "판매처 오류",
                    text: "판매처가 등록되지 않았습니다. 판매처를 추가해주세요.",
                    icon: "error", //"info,success,warning,error" 중 택1
                    dangerMode: true,
                    buttons: {
                        confirm: "확인",
                      },

                }).then((OK) => {
                    if (OK) {
                       
                    }
                });
            }
        }
        else{
            var getdata = JSON.parse(xhr.responseText);
            if(idx ==0){
                var supercombobox = document.getElementById("selectsuper");
                var i=0;
                getdata.forEach(function(option) {
                    var opt = document.createElement("option");
                    opt.appendChild(document.createTextNode(option));
                    opt.value = getdata[i].ID;
                    opt.textContent = getdata[i].ID;
                    supercombobox.appendChild(opt);
                    i++;
                });
                resetCombobox();
                
            }
            else if(idx == 1){
                var supercombobox = document.getElementById("selectadmin");
                var i=0;
                getdata.forEach(function(option) {
                    var opt = document.createElement('option');
                    opt.appendChild(document.createTextNode(option));
                    opt.value = getdata[i].ID;
                    opt.textContent = getdata[i].ID;
                    supercombobox.appendChild(opt);
                    i++;
                });
                resetCombobox2();
                // console.log(getdata); 
            }
            else{
                var supercombobox = document.getElementById("selectcustomer");
                var i=0;
                getdata.forEach(function(option) {
                    var opt = document.createElement('option');
                    opt.appendChild(document.createTextNode(option));
                    opt.value = getdata[i].ID;
                    opt.textContent = getdata[i].ID;
                    supercombobox.appendChild(opt);
                    i++;
                });
                // console.log(getdata); 
            }
        }      
    } else {
        console.error('요청에 실패했습니다.');
    }
    };

    // 요청 보내기
    xhr.send(data);
}

function setcustomerdb(data){
      // AJAX 요청 생성
    var xhr = new XMLHttpRequest();
    var url = "http://118.45.177.125:7071/sample/php/saveCustomerData.php"; // PHP 스크립트의 경로

       // POST 방식으로 요청을 보냄
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if(xhr.responseText == "ok"){
                swal({
                    title: "고객정보 등록",
                    text: "고객 정보 등록이 완료되었습니다!",
                    icon: "success", //"info,success,warning,error" 중 택1
                    buttons: {
                        confirm: "확인",
                      },
            
                }).then((OK) => {
                    if (OK) {
                        window.location.href = "table_customer.html";
                    }
                });
            }
        }
    }
   // 데이터 전송
   xhr.send(data);
}

function getcustomerdata(condition){
    // AJAX 요청 생성
    var xhr = new XMLHttpRequest();
    var url = "http://118.45.177.125:7071/sample/php/getCustomerData.php"; // PHP 스크립트의 경로

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var data = "condition= " + condition;
    var nondata = document.querySelector('.nondata');

    // 응답이 도착했을 때 실행되는 콜백 함수 설정
    xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
        // 응답 데이터를 처리
        if(xhr.responseText =="0개의 결과를 찾았습니다.")
        {
            nondata.textContent = "데이터가 없습니다."

        }
        else
        {
            nondata.textContent = ""
            GetCusomerData = JSON.parse(xhr.responseText);
            // console.log(GetCusomerData);
            resultsPerPage = 10;
            currentPage = 1;
            displayResultsCustomer(1);
            createPaginationButtonsCustomer();
        }
    } else {
        console.error('요청에 실패했습니다.');
    }
    };

    // 요청 보내기
    xhr.send(data);
}

function delectCustomer(id){
    // AJAX 요청 생성
    var xhr = new XMLHttpRequest();
    var url = "http://118.45.177.125:7071/sample/php/DeleteCustomerData.php"; // PHP 스크립트의 경로

     // POST 방식으로 요청을 보냄
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var Sendid = "id=" +id;
    // console.log(Sendid);
    xhr.onreadystatechange = function() {
     if (xhr.readyState == 4 && xhr.status == 200) {
       if(xhr.responseText == "ok");{
           swal({
               title:"고객정보 삭제",
               text: "고객정보 삭제 완료되었습니다!",
               icon: "success", //"info,success,warning,error" 중 택1
               buttons: {
                   confirm: "확인",
                 },
           }).then((OK) => {
               if (OK) {
                   window.location.href = "table_customer.html";
               }
          });
       }
    //    console.log(xhr.responseText);
     }
 }
 // 데이터 전송
 xhr.send(Sendid);
}

function get_modifyCustomerdata(condition){
    // AJAX 요청 생성
    var xhr = new XMLHttpRequest();
    var url = "http://118.45.177.125:7071/sample/php/getCustomerData.php"; // PHP 스크립트의 경로

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var data = "condition= " + condition;

    // 응답이 도착했을 때 실행되는 콜백 함수 설정
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            // 응답 데이터를 처리
            var CustomerdataArray = JSON.parse(xhr.responseText);
            // console.log(CustomerdataArray);
            modifyCustomerPageSet(CustomerdataArray)
        } else {
            console.error('요청에 실패했습니다.');
        }
    };
     // 요청 보내기
     xhr.send(data);
}

//고객 정보 수정
function setmodifyCustomer(data, id){
    // AJAX 요청 생성
    var xhr = new XMLHttpRequest();
    var url = "http://118.45.177.125:7071/sample/php/UpdateCustomerData.php"; // PHP 스크립트의 경로

     // POST 방식으로 요청을 보냄
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var Senddata = "data=" +data + "&id=" +id;
    xhr.onreadystatechange = function() {
     if (xhr.readyState == 4 && xhr.status == 200) {
       if(xhr.responseText == "ok"){
           swal({
               title:"고객정보 수정",
               text: "고객정보 수정이 완료되었습니다!",
               icon: "success", //"info,success,warning,error" 중 택1
               buttons: {
                   confirm: "확인",
                 },
           }).then((OK) => {
               if (OK) {
                    window.location.href = "modify_customer.html";
               }
          });
       }
       // console.log(xhr.responseText);
     }
 }
 // 데이터 전송
 xhr.send(Senddata);
}

//고객검색
function searchcustomer(text){
    // AJAX 요청 생성
    var xhr = new XMLHttpRequest();
    var url = "http://118.45.177.125:7071/sample/php/getCustomerSearch.php"; // PHP 스크립트의 경로

     // POST 방식으로 요청을 보냄
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var Sendid = "searchtext=" +text;
    xhr.onreadystatechange = function() {
     if (xhr.readyState == 4 && xhr.status == 200) {
        if(xhr.responseText =="false")
        {
            swal({
                title:"검색 오류",
                text: "일치하는 데이터가 없습니다.",
                dangerMode: true,
                icon: "error", //"info,success,warning,error" 중 택1
                buttons: {
                    confirm: "확인",
                  },
            });
        }
        else
        {
            // console.log(xhr.responseText);
            GetCusomerData = JSON.parse(xhr.responseText);
            resultsPerPage = 10;
            currentPage = 1;
            displayResultsCustomer(1);
            createPaginationButtonsCustomer();
        }
     }
 }
 // 데이터 전송
 xhr.send(Sendid);
}

var getdatapproduct;
function getproductdata(condition){
    // AJAX 요청 생성
    var xhr = new XMLHttpRequest();
    var url = "http://118.45.177.125:7071/sample/php/getProductData.php"; // PHP 스크립트의 경로

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var data = "condition= " + condition;
    // console.log(data);
    // 응답이 도착했을 때 실행되는 콜백 함수 설정
    xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
        // 응답 데이터를 처리
        if(xhr.responseText =="0개의 결과를 찾았습니다.")
        {

        }
        else
        {
            getdatapproduct = JSON.parse(xhr.responseText);
            
            AddmodalPageBtn();
        }
    } else {
        console.error('요청에 실패했습니다.');
    }
    };

    // 요청 보내기
    xhr.send(data);
}

function getproductdataCount(condition, button){
    // AJAX 요청 생성
    var xhr = new XMLHttpRequest();
    var url = "http://118.45.177.125:7071/sample/php/getProductData.php"; // PHP 스크립트의 경로

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var data = "condition= " + condition;
    // 응답이 도착했을 때 실행되는 콜백 함수 설정
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            // 응답 데이터를 처리
            if(xhr.responseText =="0개의 결과를 찾았습니다.")
            {
                displayProductCount=0;
            }
            else
            {
                var getdata = JSON.parse(xhr.responseText);
                displayProductCount = getdata.length;
            }
            button.textContent = displayProductCount+"개";
        } else {
            console.error('요청에 실패했습니다.');
        }
    };
    // 요청 보내기
    xhr.send(data);
}

function getmodifyproductdataCount(condition){
    // AJAX 요청 생성
    var xhr = new XMLHttpRequest();
    var url = "http://118.45.177.125:7071/sample/php/getProductData.php"; // PHP 스크립트의 경로

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var data = "condition= " + condition;
    // 응답이 도착했을 때 실행되는 콜백 함수 설정
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            // 응답 데이터를 처리
            if(xhr.responseText =="0개의 결과를 찾았습니다.")
            {

            }
            else
            {
                var getdata = JSON.parse(xhr.responseText);
                // console.log(getdata);
                for(var i=1; i<getdata.length; i++){                   
                    copymodifyproduct();
                }
                modifyProductViewset(getdata);
            }
        } else {
            console.error('요청에 실패했습니다.');
        }
    };
    // 요청 보내기
    xhr.send(data);
}

function getmodifycheckproductdata(condition, productdata, productdata2){
    // AJAX 요청 생성
    var xhr = new XMLHttpRequest();
    var url = "http://118.45.177.125:7071/sample/php/getProductData.php"; // PHP 스크립트의 경로

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var data = "condition= " + condition;
    // console.log(data);
    // 응답이 도착했을 때 실행되는 콜백 함수 설정
    xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
        // 응답 데이터를 처리
        if(xhr.responseText =="0개의 결과를 찾았습니다.")
        {
            addmodifyproductdata(productdata);
        }
        else
        {
            updatemodifyproductdata(productdata2);
        }
    } else {
        console.error('요청에 실패했습니다.');
    }
    };

    // 요청 보내기
    xhr.send(data);
}
function addmodifyproductdata(productdata){

    var xhr = new XMLHttpRequest();
    var url = "http://118.45.177.125:7071/sample/php/saveProductData.php"; // PHP 스크립트의 경로

       // POST 방식으로 요청을 보냄
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if(xhr.responseText == "ok"){
                swal({
                    title: "제품 등록",
                    text: "제품 정보 등록이 완료되었습니다!",
                    icon: "success", //"info,success,warning,error" 중 택1
                    buttons: {
                        confirm: "확인",
                      },
            
                }).then((OK) => {
                    if (OK) {
                        window.location.href = "modify_customer.html";
                    }
                });
            }
        }
    }
   // 데이터 전송
    xhr.send(productdata);
   

}

function updatemodifyproductdata(productdata){
 // AJAX 요청 생성
 var xhr = new XMLHttpRequest();
 var url = "http://118.45.177.125:7071/sample/php/UpdateProductData.php"; // PHP 스크립트의 경로

  // POST 방식으로 요청을 보냄
 xhr.open("POST", url, true);
 xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

 xhr.onreadystatechange = function() {
  if (xhr.readyState == 4 && xhr.status == 200) {
    if(xhr.responseText == "ok"){
        swal({
            title:"제품정보 수정",
            text: "제품정보 수정이 완료되었습니다!",
            icon: "success", //"info,success,warning,error" 중 택1
            buttons: {
                confirm: "확인",
              },
        }).then((OK) => {
            if (OK) {
                 window.location.href = "modify_customer.html";
            }
       });
    }
  }
}
// 데이터 전송
xhr.send(productdata);
}
function delectProduct(data){
    // AJAX 요청 생성
    var xhr = new XMLHttpRequest();
    var url = "http://118.45.177.125:7071/sample/php/DeleteCustomerData.php"; // PHP 스크립트의 경로

     // POST 방식으로 요청을 보냄
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // console.log(Sendid);
    xhr.onreadystatechange = function() {
     if (xhr.readyState == 4 && xhr.status == 200) {
       if(xhr.responseText == "ok");{
           swal({
               title:"고객정보 삭제",
               text: "고객정보 삭제 완료되었습니다!",
               icon: "success", //"info,success,warning,error" 중 택1
               buttons: {
                   confirm: "확인",
                 },
           }).then((OK) => {
               if (OK) {
                   window.location.href = "modify_customer.html";
               }
          });
       }
    //    console.log(xhr.responseText);
     }
 }
 // 데이터 전송
 xhr.send(data);
}

//#endregion


//#region 모니터링
function getmonitoringconditiondata2(condition, idx){
    // AJAX 요청 생성
    var xhr = new XMLHttpRequest();
    var url = "http://118.45.177.125:7071/sample/php/getAdminData.php"; // PHP 스크립트의 경로

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var data = "condition= "+ condition;

    // 응답이 도착했을 때 실행되는 콜백 함수 설정
    xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
        // 응답 데이터를 처리
        // console.log(xhr.responseText);
        if(xhr.responseText =="0개의 결과를 찾았습니다.")
        {
            if(idx ==1){
                var selectElement = document.getElementById("admincombobox_admin");
                var option = document.createElement("option");
                option.text = "전체";
                option.value = "all";
                selectElement.add(option);
            }
        }
        else
        {
            getdatatxt = JSON.parse(xhr.responseText);
            if(idx ==0){
                var supercombobox = document.getElementById("admincombobox_super");
                var i=0;
                while (supercombobox.options.length > 0) {
                    supercombobox.remove(0);
                }
                getdatatxt.forEach(function(option) {
                    if(i==0){
                        var opt = document.createElement('option');
                        opt.appendChild(document.createTextNode(option));
                        opt.value = "all";
                        opt.textContent = "전체";
                        supercombobox.appendChild(opt);
                    }
                    var opt = document.createElement('option');
                    opt.appendChild(document.createTextNode(option));
                    opt.value = getdatatxt[i].ID;
                    opt.textContent = getdatatxt[i].ID;
                    supercombobox.appendChild(opt);
                    i++;
                });
            }
            else if(idx == 1){
                var supercombobox = document.getElementById("admincombobox_admin");
                var i=0;
                getdatatxt.forEach(function(option) {
                    var opt = document.createElement('option');
                    opt.appendChild(document.createTextNode(option));
                    opt.value = getdatatxt[i].ID;
                    opt.textContent = getdatatxt[i].ID;
                    supercombobox.appendChild(opt);
                    i++;
                });
                // console.log(data); 
                // console.log(getdatatxt); // 데이터 확인
            }
            else if(idx == 2){
                var supercombobox = document.getElementById("customercombobox_admin");
                var i=0;
                getdatatxt.forEach(function(option) {
                    var opt = document.createElement('option');
                    opt.appendChild(document.createTextNode(option));
                    opt.value = getdatatxt[i].ID;
                    opt.textContent = getdatatxt[i].ID;
                    supercombobox.appendChild(opt);
                    i++;
                });
                // console.log(data); 
                // console.log(getdatatxt); // 데이터 확인
            }
        }
      
    } else {
        console.error('요청에 실패했습니다.');
    }
    };

    // 요청 보내기
    xhr.send(data);
}
window.getmonitoringconditiondata2 = getmonitoringconditiondata2;

function getdatainfo_monitoring(){
    var xhr = new XMLHttpRequest()
    var url = "http://118.45.177.125:7071/sample/php/getdatainfoCompanyName.php"; // PHP 스크립트의 경로
     // POST 방식으로 요청을 보냄
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
     if (xhr.readyState == 4 && xhr.status == 200) {
        if(xhr.responseText =="false")
        {
                
        }
        else
        {
            getdata = JSON.parse(xhr.responseText);
            return getdata;
        }
     }
 }
 // 데이터 전송
 xhr.send();
}
function Monitoringsetchart_dataAvg(){
    var xhr = new XMLHttpRequest();
    var url = "http://118.45.177.125:7071/sample/php/getdatainfoChartAvg.php"; // PHP 스크립트의 경로

     // POST 방식으로 요청을 보냄
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
     if (xhr.readyState == 4 && xhr.status == 200) {
        if(xhr.responseText =="false")
        {

        }
        else
        {
            getChartdata = JSON.parse(xhr.responseText);
            MonitoringChartSet();
        }
     }
 }
 // 데이터 전송
 xhr.send();
}
function Monitoring_setdata(){
    var xhr = new XMLHttpRequest();
    var url = "http://118.45.177.125:7071/sample/php/getdatainfodata.php"; // PHP 스크립트의 경로

     // POST 방식으로 요청을 보냄
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
     if (xhr.readyState == 4 && xhr.status == 200) {
        if(xhr.responseText =="false")
        {

        }
        else
        {
            var getdata = JSON.parse(xhr.responseText);
            Monitoring_Map_set(getdata);    
        }
     }
 }
 // 데이터 전송
 xhr.send();
}
//#endregion

//#region 데이터조회
function getdatainfo_customername(){
    var xhr = new XMLHttpRequest();
    var url = "http://118.45.177.125:7071/sample/php/getdatainfoCompanyName.php"; // PHP 스크립트의 경로

     // POST 방식으로 요청을 보냄
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var productid = "productid=" +productid;
    xhr.onreadystatechange = function() {
     if (xhr.readyState == 4 && xhr.status == 200) {
        if(xhr.responseText =="false")
        {
                
        }
        else
        {
            getdata = JSON.parse(xhr.responseText);
            displayDatainfoSet();
        }
     }
 }
 // 데이터 전송
 xhr.send();
}
function AddDatainfo(data){
    // AJAX 요청 생성
  var xhr = new XMLHttpRequest();
  var url = "http://118.45.177.125:7071/sample/php/saveDatainfo.php"; // PHP 스크립트의 경로

     // POST 방식으로 요청을 보냄
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
          if(xhr.responseText == "ok"){
             console.log("저장");
          }
      }
  }
 // 데이터 전송
 xhr.send(data);
}
function setdatainfo_data(){
    var xhr = new XMLHttpRequest();
    var url = "http://118.45.177.125:7071/sample/php/getdatainfodata.php"; // PHP 스크립트의 경로

     // POST 방식으로 요청을 보냄
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
     if (xhr.readyState == 4 && xhr.status == 200) {
        if(xhr.responseText =="false")
        {

        }
        else
        {
            getdata = JSON.parse(xhr.responseText);
            dataArray = getdata;
            resultsPerPage = 10;
            currentPage = 1;
            createPaginationButtonsCustomer();
            displayDatainfo(currentPage);
            
        }
     }
 }
 // 데이터 전송
 xhr.send();
}

function setchart_dataAvg(){
    var xhr = new XMLHttpRequest();
    var url = "http://118.45.177.125:7071/sample/php/getdatainfoChartAvg.php"; // PHP 스크립트의 경로

     // POST 방식으로 요청을 보냄
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
     if (xhr.readyState == 4 && xhr.status == 200) {
        if(xhr.responseText =="false")
        {

        }
        else
        {
            getChartdata = JSON.parse(xhr.responseText);
            ChartSet();
        }
     }
 }
 // 데이터 전송
 xhr.send();
}

function settable_data(productid, MonthsAgo, today){
  // AJAX 요청 생성
  var xhr = new XMLHttpRequest();
  var url = "http://118.45.177.125:7071/sample/php/getdatainfoTable.php"; // PHP 스크립트의 경로

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  var settoday = new Date(today);
  var start_dd = String(settoday.getDate() + 1).padStart(2, '0');
  var start_mm = String(settoday.getMonth() + 1).padStart(2, '0');
  var start_yyyy = settoday.getFullYear();
  var settodayAgo = start_yyyy + '-' + start_mm + '-' + start_dd;
 

  var data = "productid=" + productid +"& start_date="+MonthsAgo+"& end_date="+settodayAgo;
  // 응답이 도착했을 때 실행되는 콜백 함수 설정
  xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
          // 응답 데이터를 처리
        if(xhr.responseText =="false")
        {

           swal({
                title:"데이터조회 오류",
                text: "해당날짜의 데이터는 없습니다. 다시조회해세요.",
                dangerMode: true,
                icon: "error", //"info,success,warning,error" 중 택1
                dangerMode: true,
                button: "확인"
                }).then((YES) => {
                    if (YES) {
                        var loadingSpinner = document.querySelector(".loading-wrap--js");
                        var loadingMessage = document.getElementById("loadingMessage");
                        var loadingview = document.getElementById("loadingview");
                        loadingSpinner.style.display = "none";
                        loadingview.style.width=0;
                        loadingview.style.height=0;
                        var tbody = document.querySelector("#receiveddataTable tbody");
                        tbody.innerHTML = ""; // 이전 결과를 지움
                    }
            });
        }
        else
        {
            var getdata = JSON.parse(xhr.responseText);
            // console.log(xhr.responseText);
            TableSet(getdata);
        }
      } 
      else {
        console.error('요청에 실패했습니다.');
      }
  };
  // 요청 보내기
  xhr.send(data);
}

//#endregion
function RegisterCustomercombobox(){
    var comboBox1 = document.getElementById("selectsuper");
    var comboBox2 = document.getElementById("selectadmin");
    var comboBox3 = document.getElementById("selectcustomer");
    
    var str = "WHERE ADMINLEVEL='level1'";
    getregisterconditiondata(str,0);

// 콤보박스의 change 이벤트에 대한 이벤트 핸들러 등록
    comboBox1.addEventListener("change", function() {
        while (comboBox2.options.length > 0) {
            comboBox2.remove(0);
        }
        while (comboBox3.options.length > 0) {
            comboBox3.remove(0);
        }
        // 선택된 옵션의 값을 가져와서 콘솔에 출력
        var str = "WHERE ADMINLEVEL='level2' AND PARENTADMIN ='"+comboBox1.value+"'";
        getregisterconditiondata(str,1);
        // console.log(str);
    });
    comboBox2.addEventListener("change", function() {
        while (comboBox3.options.length > 0) {
            comboBox3.remove(0);
        }
        var str = "WHERE ADMINLEVEL='level3' AND PARENTADMIN ='"+comboBox1.value+"' AND PART = '"+comboBox2.value+"'";
        getregisterconditiondata(str,2);
        // console.log(str);
    });
}
window.RegisterCustomercombobox = RegisterCustomercombobox;

function resetCombobox(){
    var comboBox1 = document.getElementById("selectsuper");
    var str = "WHERE ADMINLEVEL='level2' AND PARENTADMIN ='"+comboBox1.value+"'";
    getregisterconditiondata(str,1);
}
function resetCombobox2(){
    var comboBox1 = document.getElementById("selectsuper");
    var comboBox2 = document.getElementById("selectadmin");
    var str = "WHERE ADMINLEVEL='level3' AND PARENTADMIN ='"+comboBox1.value+"' AND PART = '"+comboBox2.value+"'";
        getregisterconditiondata(str,2);
}

var text1, text2, text3
function addBtn(){
    var superadmin = document.getElementById("selectsuper").value;
    var admin = document.getElementById("selectadmin").value;
    var saleplace = document.getElementById("selectcustomer").value;
    var customer = document.getElementById("customername").value;
    var ceo = document.getElementById("ceo").value;
    var address = document.getElementById("address").value;
    var postcode = document.getElementById("postcode").value;
    var address2 = document.getElementById("address2").value;
    var longitude = document.getElementById("longitude").value;
    var latitude = document.getElementById("latitude").value;
    var customernum = document.getElementById("customernum").value;
    var errornum1 = document.getElementById("errornum1").value;
    var errornum2 = document.getElementById("errornum2").value;
    var errornum3 = document.getElementById("errornum3").value;
    var etc = document.getElementById("etc").value;

    if(customer == ""){
        text1 = "고객정보등록 오류";
        text2 = "거래처명을 입력해 주세요.";
        text3 = "error";
        alert_set();
    }
    else if(ceo == ""){
        text1 = "고객정보등록 오류";
        text2 = "대표자를 입력해주세요.";
        text3 = "error";
        alert_set();

    }
    else if(address == ""){
        text1 = "고객정보등록 오류";
        text2 = "주소를 입력주세요.";
        text3 = "error";
        alert_set();
    }
    else if(customernum == ""){
        text1 = "고객정보등록 오류";
        text2 = "업체 전화번호를 입력주세요.";
        text3 = "error";
        alert_set();
    }
    else if(errornum1 == "" || errornum2 == "" || errornum3 == ""){
        text1 = "고객정보등록 오류";
        text2 = "장애 알람번호 3개를 입력주세요.";
        text3 = "error";
        alert_set();
    }
    else{
        var data = "superlevel=" +superadmin + "&adminlevel=" +admin + "&saleplace=" + saleplace +"&customername=" +customer + "&ceo=" + ceo + "&address=" + address
                + "&postcode=" + postcode + "&address2="+ address2 + "&longitude=" + longitude + "&latitude=" + latitude + "&customernum=" + customernum + "&errornum1=" +  errornum1 
                + "&errornum2=" + errornum2 + "&errornum3=" + errornum3 + "&etc=" + etc;
        setcustomerdb(data);
    }
}

function alert_set(){
    swal({
        title: text1,
        text: text2,
        icon: text3, //"info,success,warning,error" 중 택1
        dangerMode: true,
        buttons: {
            confirm: "확인",
          },

    }).then((OK) => {
        if (OK) {
           
        }
    });
}
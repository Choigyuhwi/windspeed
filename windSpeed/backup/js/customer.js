//고객 검색
function table_customer_combobox(){
    var comboBox1 = document.getElementById("admincombobox_super");
    var comboBox2 = document.getElementById("admincombobox_admin");
    var comboBox3 = document.getElementById("customercombobox_admin");
    var comboBox4 = document.getElementById("customercombobox_searchtitle");
    var comboBox5 = document.getElementById("admincombobox_maxview");

// 콤보박스의 change 이벤트에 대한 이벤트 핸들러 등록
    comboBox1.addEventListener("change", function() {
        // 선택된 옵션의 값을 가져와서 콘솔에 출력
            var table = document.getElementById('CustomerdataTable');
            var maxcount = table.rows.length;
            for(var i=1; i<maxcount; i++){
                table.deleteRow(1); // 첫 번째 행 삭제
            }
            while (comboBox2.options.length > 0) {
                comboBox2.remove(0);
            }
            while (comboBox3.options.length > 0) {
                comboBox3.remove(0);
            }
            if(comboBox1.value =="all"){
                var option1 = document.createElement("option");
                option1.text = "전체";
                option1.value = "all";
                comboBox2.add(option1);

                var option2 = document.createElement("option");
                option2.text = "전체";
                option2.value = "all";
                comboBox3.add(option2);
                
                var str = "";
                getcustomerdata(str);
            }
            else
            {
                var option2 = document.createElement("option");
                option2.text = "전체";
                option2.value = "all";
                comboBox3.add(option2);
                var selectedIndex = comboBox1.selectedIndex;
                // 선택된 옵션의 텍스트 가져오기
                var selectedText = comboBox1.options[selectedIndex].text;
                var str = "WHERE ADMINLEVEL='level2' AND PARENTADMIN ='"+selectedText+"'";
                getadminconditiondata2(str,1);
                var str = "WHERE SUPERLEVEL='"+ selectedText +"'";
                getcustomerdata(str);
            }
    });

    comboBox2.addEventListener("change", function() {
        var table = document.getElementById('CustomerdataTable');
        var maxcount = table.rows.length;
        for(var i=1; i<maxcount; i++){
            table.deleteRow(1); // 첫 번째 행 삭제
        }
        while (comboBox3.options.length > 0) {
            comboBox3.remove(0);
        }
        if(comboBox1.value =="all"){
            var option2 = document.createElement("option");
            option2.text = "전체";
            option2.value = "all";
            comboBox3.add(option2);
            var str = "";
            getcustomerdata(str);
        }
        else
        {
            var option2 = document.createElement("option");
            option2.text = "전체";
            option2.value = "all";
            comboBox3.add(option2);

            // 선택된 옵션의 텍스트 가져오기
            var combobox1 = comboBox1.value;
            var combobox2 = comboBox2.value;
            var str = "WHERE ADMINLEVEL='level3' AND PARENTADMIN='"+combobox1+"' AND PART ='"+combobox2+"'";
            getcustomerconditiondata2(str,2);
            
            if(comboBox2.value == "all"){
                var str = "WHERE SUPERLEVEL='"+ combobox1 +"'";
                getcustomerdata(str);
            }
            else{
                var str = "WHERE ADMINLEVEL='"+ combobox2 +"'";
                getcustomerdata(str);
            }
            // console.log(str);
        }
    });
    
    comboBox3.addEventListener("change", function() {
        var table = document.getElementById('CustomerdataTable');
        var maxcount = table.rows.length;
        for(var i=1; i<maxcount; i++){
            table.deleteRow(1); // 첫 번째 행 삭제
        }
        var combobox1 = comboBox1.value;
        var combobox2 = comboBox2.value;
        var combobox3 = comboBox3.value;
        if(comboBox3.value == "all"){
            var str = "WHERE SUPERLEVEL='"+ combobox1 +"' AND ADMINLEVEL='"+combobox2+"'";
            getcustomerdata(str);
        }
        else{
            var str = "WHERE SUPERLEVEL='"+ combobox1 +"' AND ADMINLEVEL='"+combobox2+"' AND SALEPLACE='"+combobox3+"'";
            getcustomerdata(str);
        }
       
    });
          
    comboBox5.addEventListener("change", function() {
        var selectedOption = comboBox5.value;
            var maxview = parseInt(selectedOption);
            resultsPerPage = maxview;
            currentPage = 1;
            displayResultsCustomer(1);
            createPaginationButtonsCustomer();
       
    });

}
window.table_customer_combobox = table_customer_combobox;

//#region 페이징관련
var resultsPerPage;
var currentPage;
var selectindex;
var GetCusomerData;
var Modalcustomername;
var result
var displayProductCount;
function displayResultsCustomer(page) {
    currentPage = page; // 현재 페이지 업데이트
    var startIndex = (page - 1) * resultsPerPage;
    var endIndex = startIndex + resultsPerPage;
    var results = GetCusomerData.slice(startIndex, endIndex);

    var tbody = document.querySelector("#CustomerdataTable tbody");
    tbody.innerHTML = ""; // 이전 결과를 지움

    for (var i = 0; i < results.length; i++) {
        result = results[i];
        var row = tbody.insertRow();
        var productCell = row.insertCell(0);
        var customerCell = row.insertCell(1);
        var ceoCell = row.insertCell(2);
        var addressCell = row.insertCell(3);
        var tellnumCell = row.insertCell(4);
        var partCell = row.insertCell(5);
        var errornum = row.insertCell(6);
        var etc = row.insertCell(7);
        var actionsCell = row.insertCell(8);
       
        productCell.className = i;
        var button = document.createElement('button');
        var str = "WHERE CUSTOMERNAME='"+ result.CUSTOMERNAME+"'";
        getproductdataCount(str, button);    

        button.className = "productbtn";
        // button.textContent = "1개";
        button.addEventListener('click', function() {
            if(this.textContent == "0개"){
                swal({
                    title:"제폼정보",
                    text: "제품정보가 없습니다.",
                    icon: "error", //"info,success,warning,error" 중 택1
                    dangerMode: true,
                    button: "네"
                    }).then((YES) => {
                        if (YES) {
                        }
               });
            }
            else{
                var productmodalHeader = document.getElementById("productmodal-header");
                var str = this.parentNode.className;
                selectindex = parseInt(str);
                // console.log(str+ "," + selectindex);
                Modalcustomername = results[selectindex].CUSTOMERNAME;
                productmodalHeader.textContent = Modalcustomername;
                openProductModal();
            }
        });
        productCell.appendChild(button);

        Modalcustomername = result.CUSTOMERNAME;
        
        customerCell.textContent = result.CUSTOMERNAME;
        ceoCell.textContent = result.CEO;
        addressCell.textContent = result.ADDRESS + " " + result.ADDRESS2;
        tellnumCell.textContent = result.CUSTOMERNUM;
        partCell.textContent = result.SALEPLACE;
        errornum.textContent = result.ERRORNUM1+", "+ result.ERRORNUM2 + ", " + result.ERRORNUM3;
        etc.textContent = result.ETC;
        

        var iconContainer = document.createElement("div");
        iconContainer.className = "btn_contain "+i;
        // 편집 아이콘 생성 및 추가
        var editIcon = document.createElement("i");
        var edidchild = document.createElement("button");
        editIcon.className = "fa-solid fa-pen modify_b";
        edidchild.className = "modity-child";
        edidchild.addEventListener("click", function() {
            var str = this.parentNode.className;
            var parts = str.split(" ");
            selectindex = parseInt(parts[1]);
            // console.log(parts[1]);
            modityCustomerDataset();
            window.location.href = "modify_customer.html";
            // 아이콘이 클릭되었을 때 실행될 로직을 여기에 작성합니다.
        });
        edidchild.appendChild(editIcon);
        iconContainer.appendChild(edidchild);

        // 삭제 아이콘 생성 및 추가
        var deleteIcon = document.createElement("i");
        var deletechild = document.createElement("button");
        deleteIcon.className = "fa-solid fa-trash-can modify_b";
        deletechild.className = "modity-child";
        deletechild.addEventListener("click", function() {
            var str = this.parentNode.className;
            var parts = str.split(" ");
            var select = parseInt(parts[1]);
            var table = document.getElementById("CustomerdataTable");
            var row = table.rows[select+1];
            var selectid = row.cells[1].textContent.trim();
            swal({
                title:"고객정보 삭제",
                text: "고객정보 삭제하겠습니까?",
                icon: "warning", //"info,success,warning,error" 중 택1
                dangerMode: true,
                buttons: ["아니요", "네"]
                }).then((YES) => {
                    if (YES) {
                        delectCustomer(selectid);
                        // console.log("삭제, "+ selectid);
                    }
           });
            // 아이콘이 클릭되었을 때 실행될 로직을 여기에 작성합니다.
        });
        deletechild.appendChild(deleteIcon);
        iconContainer.appendChild(deletechild);

        // 아이콘 컨테이너를 셀에 추가
        actionsCell.appendChild(iconContainer);
    }
    
    var buttons = document.querySelectorAll("#pagination button");
    if(buttons.length != 0){
        buttons.forEach(function(button) {
            button.classList.remove("selected");
        });
        buttons[page - 1].classList.add("selected");
    }   
}

// 페이징 버튼 생성 함수
function createPaginationButtonsCustomer() {
    var numPages = Math.ceil(GetCusomerData.length / resultsPerPage);
    var paginationDiv = document.getElementById("pagination");
    paginationDiv.innerHTML = ""; // 이전 버튼을 지움

    for (var i = 1; i <= numPages; i++) {
        var button = document.createElement("button");
        button.textContent = i;
        button.addEventListener("click", function() {
            var page = parseInt(this.textContent);
            displayResultsCustomer(page);
        });
        paginationDiv.appendChild(button);
    }
    var buttons = document.querySelectorAll("#pagination button");
    buttons[currentPage - 1].classList.add("selected");
}
//#endregion


function modityCustomerDataset(){
    var table = document.getElementById("CustomerdataTable");
    var rowIndex = selectindex; // 0부터 시작하는 인덱스
    var rowData = [];

    var row = table.rows[rowIndex+1];
    for (var i = 0; i < row.cells.length; i++) {
        var cellData = row.cells[i].textContent.trim();
        rowData.push(cellData);
    }
    localStorage.setItem('CustomerdataArray', JSON.stringify(rowData));
}

function modifyCustomerDataLoad(){
    var storedData = localStorage.getItem('CustomerdataArray');
    var retrievedArray = JSON.parse(storedData);
    // console.log("retrievedArray" + retrievedArray);
    var str = "WHERE CUSTOMERNAME='"+retrievedArray[1]+"'";
    get_modifyCustomerdata(str);
    getmodifyproductdataCount(str);
}
window.modifyCustomerDataLoad = modifyCustomerDataLoad;

var customer;
function modifyCustomerPageSet(data){

    var superCombobox = document.getElementById("selectsuper");
    var adminCombobox = document.getElementById("selectadmin"); 
    var saleplaceCombobox = document.getElementById("selectcustomer");
    var customerName = document.getElementById("customername");
    var ceo = document.getElementById("ceo");
    var address =document.getElementById("address");
    var postCode = document.getElementById("postcode");
    var address2 = document.getElementById("address2");
    var longitude = document.getElementById("longitude");
    var latitude = document.getElementById("latitude");
    var customernum = document.getElementById("customernum");
    var errornum1 = document.getElementById("errornum1");
    var errornum2 = document.getElementById("errornum2");
    var errornum3 = document.getElementById("errornum3");
    var etc = document.getElementById("etc");

    var option1 = document.createElement('option');
    var option2 = document.createElement('option');
    var option3 = document.createElement('option');    

    option1.text = data[0].SUPERLEVEL;
    superCombobox.add(option1);   
    superCombobox.selectedIndex = 0;
    superCombobox.disabled = true;

    option2.text = data[0].ADMINLEVEL;
    adminCombobox.add(option2);   
    adminCombobox.selectedIndex = 0;
    adminCombobox.disabled = true;

    option3.text = data[0].SALEPLACE;
    saleplaceCombobox.add(option3);   
    saleplaceCombobox.selectedIndex = 0;
    saleplaceCombobox.disabled = true;

    customerName.value = data[0].CUSTOMERNAME;
    customer = customerName.value;
    ceo.value = data[0].CEO;
    address.value = data[0].ADDRESS;
    postCode.value = data[0].POSTCODE;
    address2.value = data[0].ADDRESS2;
    longitude.value = data[0].LONGITUDE;
    latitude.value = data[0].LATITUDE;
    customernum.value = data[0].CUSTOMERNUM;
    errornum1.value = data[0].ERRORNUM1;
    errornum2.value = data[0].ERRORNUM2;
    errornum3.value = data[0].ERRORNUM3;
    etc.value = data[0].ETC

    modify_map(longitude.value,latitude.value);
}
//수정화면 저장버튼
function modify_save(){
    var superCombobox = document.getElementById("selectsuper").value;
    var adminCombobox = document.getElementById("selectadmin").value; 
    var saleplaceCombobox = document.getElementById("selectcustomer").value;
    var customerName = document.getElementById("customername").value;
    var ceo = document.getElementById("ceo").value;
    var address =document.getElementById("address").value;
    var postCode = document.getElementById("postcode").value;
    var address2 = document.getElementById("address2").value;
    var longitude = document.getElementById("longitude").value;
    var latitude = document.getElementById("latitude").value;
    var customernum = document.getElementById("customernum").value;
    var errornum1 = document.getElementById("errornum1").value;
    var errornum2 = document.getElementById("errornum2").value;
    var errornum3 = document.getElementById("errornum3").value;
    var etc = document.getElementById("etc").value;
    // console.log(customerName);
    if(customerName != ""){
        var data = "SUPERLEVEL='" +superCombobox + "',ADMINLEVEL='" +adminCombobox + "',SALEPLACE='" + saleplaceCombobox 
                +"',CUSTOMERNAME='" +customerName + "',CEO='" + ceo + "',ADDRESS='" + address + "',POSTCODE='"+ postCode 
                + "',ADDRESS2='" + address2 + "',LONGITUDE='"+ longitude + "',LATITUDE='" + latitude + "',CUSTOMERNUM='" + customernum
                + "',ERRORNUM1='" + errornum1 + "',ERRORNUM2='" +  errornum2 + "',ERRORNUM3='" + errornum3 + "',ETC='" + etc + "'";
        setmodifyCustomer(data,customerName);
    }
    else{
        swal({
            title:"고객정보 수정",
            text: "거래처명이 없습니다!",
            dangerMode: true,
            icon: "error", //"info,success,warning,error" 중 택1
            buttons: {
                confirm: "확인",
              },
        });
    }
}

function serchbtn(){
    var searchtext = document.getElementById("text-search").value;
    if(searchtext != ""){
    //    console.log("검색 : " + searchtext);
       searchcustomer(searchtext);
    }
    else{
        swal({
            title:"검색 오류",
            text: "검색어를 입력하세요!",
            dangerMode: true,
            icon: "error", //"info,success,warning,error" 중 택1
            buttons: {
                confirm: "확인",
              },
        });
    }
    
}
function modifyProductViewset(data){
   
    for(var i=0; i< data.length; i++){
        if(i==0){
            var parent = document.getElementById("productmodifybox");
            var child = parent.querySelectorAll("input");
            var mapList = parent.querySelectorAll("div");
            var btnList = parent.querySelectorAll("button");
            for(var j=0; j<mapList.length; j++)
            {
                if(mapList[j].id == "map2"){
                    var map = mapList[j];
                }
            }
            // console.log(btnList);
        }
        else{
            var parent = document.getElementById("productmodifybox"+i);
            var child = parent.querySelectorAll("input");
            var mapList = parent.querySelectorAll("div");
            var btnList = parent.querySelectorAll("button");
            for(var j=0; j<mapList.length; j++)
            {
                if(mapList[j].id == "map2"){
                    var map = mapList[j];
                }
            }
            // console.log(btnList);
        }
        child[0].value = data[i].PRODUCTID;
        child[1].value = data[i].MODEMID;
        child[2].value = data[i].VOLTAGE;
        child[3].value = data[i].CURRENT;
        child[4].value = data[i].WINDSPEED1;
        child[5].value = data[i].WINDSPEED2;
        child[6].value = data[i].CHECKTIME;
        child[7].value = data[i].ADDRESS;
        child[8].value = data[i].POSTCODE;
        child[9].value = data[i].ADDRESS2;
        child[10].value = data[i].LONGITUDE;
        child[11].value = data[i].LATITUDE;
        modifyProduct_map(map,data[i].LONGITUDE,data[i].LATITUDE);
    }
}
function ClickProductBtn(button){
    var parentDiv = button.parentNode.parentNode.parentNode;
    var child = parentDiv.querySelectorAll("input");
    var productid = child[0].value;
    var modemId = child[1].value;
    var str = "WHERE CUSTOMERNAME='"+ customer+"' AND PRODUCTID='"+ productid+"' AND MODEMID='"+modemId+"'";

    var data = "customerid=" +customer + "&productid=" +child[0].value + "&modemid=" + child[1].value 
    +"&voltage=" +child[2].value + "&current=" + child[3].value + "&windspeed1=" + child[4].value + "&windspeed2="+ child[5].value 
    + "&checktime=" + child[6].value + "&address="+ child[7].value + "&postcode=" + child[8].value + "&address2=" + child[9].value
    + "&longitude=" + child[10].value + "&latitude=" +  child[11].value;

    var data2 = "CUSTOMERNAME='" +customer + "',PRODUCTID='" +child[0].value + "',MODEMID='" + child[1].value 
    +"',VOLTAGE='" +child[2].value + "',CURRENT='" + child[3].value + "',WINDSPEED1='" + child[4].value + "',WINDSPEED2='"+ child[5].value 
    + "',CHECKTIME='" + child[6].value + "',ADDRESS='"+ child[7].value + "',POSTCODE='" + child[8].value + "',ADDRESS2='" + child[9].value
    + "',LONGITUDE='" + child[10].value + "',LATITUDE='" +  child[11].value + "'";

    var data3 = "customerid=" +customer + "&productid=" +child[0].value + "&modemid=" + child[1].value +"&data=" + data2;
    getmodifycheckproductdata(str,data,data3);
}
function clickdeletproduct(button){
    var parentDiv = button.parentNode.parentNode.parentNode;
    var child = parentDiv.querySelectorAll("input");
    var data = "customerid=" +customer + "&productid=" +child[0].value + "&modemid=" + child[1].value;
    swal({
        title:"제품 정보 삭제",
        text: "제품 정보 삭제하겠습니까?",
        icon: "warning", //"info,success,warning,error" 중 택1
        dangerMode: true,
        buttons: ["아니요", "네"]
        }).then((YES) => {
            if (YES) {
                delectProduct(data);
                // console.log("삭제, "+ selectid);
            }
   });
}
//#region 제품팝업창
function openProductModal() {
    document.getElementById('ProductModal').style.display = 'block';
    var str = "WHERE CUSTOMERNAME='"+ Modalcustomername+"'";
    getproductdata(str);    
}

function closeProductModal() {
    document.getElementById('ProductModal').style.display = 'none';
}

var Modalpage;
function AddmodalPageBtn(){
    const totalPages = getdatapproduct.length;
    Modalpage =1;
    const paginationContainer = document.getElementById("modalpagination");
    paginationContainer.innerHTML = ""; // 이전 버튼을 지움
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.addEventListener("click", function() {
            Modalpage = parseInt(this.textContent);
            var buttons = document.querySelectorAll("#modalpagination button");
            if(buttons.length != 0){
                buttons.forEach(function(button) {
                    button.classList.remove("selected");
                });
                buttons[Modalpage - 1].classList.add("selected");
                Modalpageset();
            }   
        });
        paginationContainer.appendChild(button);
        var buttons = document.querySelectorAll("#modalpagination button");
        buttons[Modalpage - 1].classList.add("selected");
        Modalpageset();
    }
}

function ClickModalModify(){
    modityCustomerDataset();
    window.location.href = "modify_customer.html";
}

function Modalpageset(){
    var productId = document.getElementById("ProducttextBox1");
    var modemId = document.getElementById("ProducttextBox2");
    var voltage = document.getElementById("ProducttextBox3");
    var current = document.getElementById("ProducttextBox4");
    var windspeed1 = document.getElementById("ProducttextBox5");
    var windspeed2 = document.getElementById("ProducttextBox6");
    var datatime = document.getElementById("ProducttextBox7");
    var postcode = document.getElementById("ProducttextBox8");
    var address = document.getElementById("ProducttextBox9");
    var latitude = document.getElementById("ProducttextBox10");
    var longitude = document.getElementById("ProducttextBox11");


    productId.textContent = getdatapproduct[Modalpage-1].PRODUCTID;
    modemId.textContent = getdatapproduct[Modalpage-1].MODEMID;
    voltage.textContent = getdatapproduct[Modalpage-1].VOLTAGE;
    current.textContent = getdatapproduct[Modalpage-1].CURRENT;
    windspeed1.textContent = getdatapproduct[Modalpage-1].WINDSPEED1;
    windspeed2.textContent = getdatapproduct[Modalpage-1].WINDSPEED2;
    datatime.textContent = getdatapproduct[Modalpage-1].CHECKTIME;
    postcode.textContent = getdatapproduct[Modalpage-1].POSTCODE;
    address.textContent = getdatapproduct[Modalpage-1].ADDRESS;
    latitude.textContent = getdatapproduct[Modalpage-1].LATITUDE;
    longitude.textContent = getdatapproduct[Modalpage-1].LONGITUDE;
}
var index = 1;
function copymodifyproduct(){
      // <div> 안의 텍스트 가져오기
  var htmlCode  = document.getElementById("productmodifybox").innerHTML;

  // 새로운 <div> 생성하여 텍스트 붙여넣기
  var newDiv = document.createElement("div");
  var str =  "productmodifybox"+index;
  newDiv.id = str;
  newDiv.innerHTML = htmlCode ;

  index++; 
  
  document.getElementById("productmodifysection").appendChild(newDiv);
  var labelparent = document.getElementById(str);
  var label = labelparent.querySelector("label");
  label.textContent = "#"+index;
}

//#endregion
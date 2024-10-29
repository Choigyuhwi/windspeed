//관리자 검색
function adminmaxviewcombobox(){
    var comboBox1 = document.getElementById("admincombobox_super");
    var comboBox2 = document.getElementById("admincombobox_admin");
    var comboBox3 = document.getElementById("admincombobox_maxview");

// 콤보박스의 change 이벤트에 대한 이벤트 핸들러 등록
    comboBox1.addEventListener("change", function() {
        var table = document.getElementById('AdmindataTable');
        var maxcount = table.rows.length;
        for(var i=1; i<maxcount; i++){
            table.deleteRow(1); // 첫 번째 행 삭제
            // console.log("체크"+table.rows.length);
        }
        // 선택된 옵션의 값을 가져와서 콘솔에 출력
            while (comboBox2.options.length > 0) {
                comboBox2.remove(0);
            }
            if(comboBox1.value =="all"){
                var selectElement = document.getElementById("admincombobox_admin");
                var option = document.createElement("option");
                option.text = "전체";
                option.value = "all";
                selectElement.add(option);
                var str = "";
                getadmindata(str);
            }
            else
            {
                var selectedIndex = comboBox1.selectedIndex;
                // 선택된 옵션의 텍스트 가져오기
                var selectedText = comboBox1.options[selectedIndex].text;
                var str = "WHERE ADMINLEVEL='level2' AND PARENTADMIN ='"+selectedText+"'";
                getadminconditiondata2(str,1);
                var str = "WHERE PARENTADMIN='"+ selectedText +"'";
                getadmindata(str);
            }
    });

    comboBox2.addEventListener("change", function() {
        var table = document.getElementById('AdmindataTable');
        var maxcount = table.rows.length;
        var combobox1 = comboBox1.value;
        for(var i=1; i<maxcount; i++){
            table.deleteRow(1); // 첫 번째 행 삭제
        }
        // 선택된 옵션의 값을 가져와서 콘솔에 출력
        if(comboBox1.value =="all"){
            var str = "";
            getadmindata(str);
        }
        else
        {
            if(comboBox2.value == "all"){
                var str = "WHERE PARENTADMIN='"+ combobox1 +"'";
                getadmindata(str);
                // console.log("all "+combobox1);
            }
            else{
                var selectedIndex = comboBox2.selectedIndex;
                // 선택된 옵션의 텍스트 가져오기
                var selectedText = comboBox2.options[selectedIndex].text;
                var str = "WHERE PART='"+ selectedText +"'";
                getadmindata(str);
            }
            
            // console.log(str);
        }
    });

    comboBox3.addEventListener("change", function() {
        // 선택된 옵션의 값을 가져와서 콘솔에 출력
            var selectedOption = comboBox3.value;
            var maxview = parseInt(selectedOption);
            resultsPerPage = maxview;
            currentPage = 1;
            displayResults(1);
            createPaginationButtons();
            // console.log("Selected option:", selectedOption);
    });

}
window.adminmaxviewcombobox = adminmaxviewcombobox;


//#region 페이징관련
var resultsPerPage;
var currentPage;
var selectindex;
function displayResults(page) {
    currentPage = page; // 현재 페이지 업데이트
    var startIndex = (page - 1) * resultsPerPage;
    var endIndex = startIndex + resultsPerPage;
    var results = AdmindataArray.slice(startIndex, endIndex);

    var tbody = document.querySelector("#AdmindataTable tbody");
    tbody.innerHTML = ""; // 이전 결과를 지움

    for (var i = 0; i < results.length; i++) {
        var result = results[i];
        var row = tbody.insertRow();
        var idCell = row.insertCell(0);
        var levelCell = row.insertCell(1);
        var partCell = row.insertCell(2);
        var companyCell = row.insertCell(3);
        var ceoCell = row.insertCell(4);
        var tellnumCell = row.insertCell(5);
        var addressCell = row.insertCell(6);
        var actionsCell = row.insertCell(7);
       
        idCell.textContent = result.ID;
        if(result.ADMINLEVEL == "level1"){
            levelCell.textContent = "슈퍼관리자";
        }
        else if(result.ADMINLEVEL == "level2"){
            levelCell.textContent = "관리자";
        }
        else{
            levelCell.textContent = "판매처";
        }
        partCell.textContent = result.PART;
        companyCell.textContent = result.COMPANY;
        ceoCell.textContent = result.CEO;
        tellnumCell.textContent = result.PHONENUM;
        addressCell.textContent = result.ADDRESS + result.ADDRESS2;

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
            modityAdminDataset();
            window.location.href = "modify_admin.html";
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
            var table = document.getElementById("AdmindataTable");
            var row = table.rows[select+1];
            var selectid = row.cells[0].textContent.trim();
            swal({
                title:"회원정보 삭제",
                text: "회원정보 삭제하겠습니까?",
                icon: "warning", //"info,success,warning,error" 중 택1
                dangerMode: true,
                buttons: ["아니요", "네"]
                }).then((YES) => {
                    if (YES) {
                        delectAdmin(selectid);
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
function createPaginationButtons() {
    var numPages = Math.ceil(AdmindataArray.length / resultsPerPage);
    var paginationDiv = document.getElementById("pagination");
    paginationDiv.innerHTML = ""; // 이전 버튼을 지움

    for (var i = 1; i <= numPages; i++) {
        var button = document.createElement("button");
        button.textContent = i;
        button.addEventListener("click", function() {
            var page = parseInt(this.textContent);
            displayResults(page);
        });
        paginationDiv.appendChild(button);
    }
    var buttons = document.querySelectorAll("#pagination button");
    buttons[currentPage - 1].classList.add("selected");
}
//#endregion

//수정 버튼 클릭시 해당 로우 데이터 넘김
function modityAdminDataset(){
    var table = document.getElementById("AdmindataTable");
    var rowIndex = selectindex; // 0부터 시작하는 인덱스
    var rowData = [];

    var row = table.rows[rowIndex+1];
    for (var i = 0; i < row.cells.length; i++) {
        var cellData = row.cells[i].textContent.trim();
        rowData.push(cellData);
    }
    localStorage.setItem('dataArray', JSON.stringify(rowData));
}

//넘긴 해당 데이터 DB호출
var AdmindataArray2;
function modityAdminDataLoad(){
    var storedData = localStorage.getItem('dataArray');
    var retrievedArray = JSON.parse(storedData);
    var str = "WHERE ID='"+retrievedArray[0]+"'";
    get_modifyAdmindata(str);

}
window.modityAdminDataLoad = modityAdminDataLoad;

//수정화면 데이터 채움
function modifyAdminPageSet(){

    // console.log(AdmindataArray2);

    var adminLevel = document.getElementById("adminLevel");
    var parentLevel = document.getElementById("parentadmin");
    var id = document.getElementById("id");
    var conpanyname = document.getElementById("conpanyname");
    var ceo = document.getElementById("ceo");
    address = document.getElementById("address");
    postcode = document.getElementById("postcode");
    address2 = document.getElementById("address2");
    longitude = document.getElementById("longitude");
    latitude = document.getElementById("latitude");
    var tellnum = document.getElementById("tellnum");
    var email = document.getElementById("email");
    var alrmcheck = document.getElementById("alrmcheck");
    var alrmstarttime = document.getElementById("alrmstarttime");
    var alrmendtime = document.getElementById("alrmendtime");
    var alrmholidaycheck = document.getElementById("alrmholidaycheck");
    var etc = document.getElementById("etc");
    
    if(AdmindataArray2[0].ADMINLEVEL == "level1"){
        adminLevel.selectedIndex = 0;
    } else if(AdmindataArray2[0].ADMINLEVEL == "level2"){
        adminLevel.selectedIndex = 1;
    }else{
        adminLevel.selectedIndex = 2;
    }
    var option = document.createElement('option');
    option.text = AdmindataArray2[0].PARENTADMIN;
    parentLevel.add(option);
    parentLevel.selectedIndex = 0;
    id.value = AdmindataArray2[0].ID;
    adminLevel.disabled = true;
    parentLevel.disabled = true;
    id.disabled = true;
    conpanyname.value = AdmindataArray2[0].COMPANY;
    ceo.value = AdmindataArray2[0].CEO;
    address.value = AdmindataArray2[0].ADDRESS;
    postcode.value = AdmindataArray2[0].POSTCODE;
    address2.value = AdmindataArray2[0].ADDRESS2;
    longitude.value = AdmindataArray2[0].LONGITUDE;
    latitude.value = AdmindataArray2[0].LATITUDE;
    tellnum.value = AdmindataArray2[0].PHONENUM;
    email.value = AdmindataArray2[0].EMAIL;
    if(AdmindataArray2[0].ARLMCHECK == "true"){
        alrmcheck.checked = true;
    }
    else{
        alrmcheck.checked = false;
    }
    alrmstarttime.value = AdmindataArray2[0].ARLMSTARTTIME;
    alrmendtime.value = AdmindataArray2[0].ARLMENDTIME;
    if(AdmindataArray2[0].ARLMHOLIDAYCHECK == "true"){
        alrmholidaycheck.checked = true;
    }
    else{
        alrmholidaycheck.checked = false;
    }
    etc.value = AdmindataArray2[0].ETC
    modify_map(longitude.value,latitude.value);
}

//수정화면 저장버튼
function modify_save(){
    var adminLevel = document.getElementById("adminLevel").value;
    var id = document.getElementById("id").value;
    var password = document.getElementById("password").value;
    var passwordcheck = document.getElementById("passwordcheck").value;
    var conpanyname = document.getElementById("conpanyname").value;
    var parentadmin = document.getElementById("parentadmin").value;
    var ceo = document.getElementById("ceo").value;
    var address = document.getElementById("address").value;
    var postcode = document.getElementById("postcode").value;
    var address2 = document.getElementById("address2").value;
    var longitude =document.getElementById("longitude").value;
    var latitude = document.getElementById("latitude").value;
    var tellnum = document.getElementById("tellnum").value;
    var email = document.getElementById("email").value;
    var alrmcheck = document.getElementById("alrmcheck").checked;
    var alrmstarttime = document.getElementById("alrmstarttime").value;
    var alrmendtime = document.getElementById("alrmendtime").value;
    var alrmholidaycheck = document.getElementById("alrmholidaycheck").checked;
    var etc = document.getElementById("etc").value;

    if(password != ""){
        if(password == passwordcheck){
            var data = "ADMINLEVEL='" +adminLevel + "',PARENTADMIN='" +parentadmin + "',ID='" + id +"',PASSWORD='" +password + "',COMPANY='" + conpanyname
            + "',CEO='" + ceo + "',ADDRESS='"+ address + "',POSTCODE='" + postcode + "',ADDRESS2='"+ address2 + "',LONGITUDE='" + longitude + "',LATITUDE='" + latitude
            + "',PHONENUM='" + tellnum + "',EMAIL='" +  email + "',ARLMCHECK='" + alrmcheck + "',ARLMSTARTTIME='" + alrmstarttime + "',ARLMENDTIME='" + alrmendtime
            + "',ARLMHOLIDAYCHECK='" + alrmholidaycheck + "',ETC='" + etc+"'";
            setmodifyAdmin(data,id);
        }
        else{
            swal({
                title:"회원정보 수정",
                text: "비밀번호가 일치하지 않습니다!",
                dangerMode: true,
                icon: "error", //"info,success,warning,error" 중 택1
                buttons: {
                    confirm: "확인",
                  },
            });
        }
    }
    else{
        var data = "ADMINLEVEL='" +adminLevel + "',PARENTADMIN='" +parentadmin + "',ID='" + id +"',COMPANY='" + conpanyname
        + "',CEO='" + ceo + "',ADDRESS='"+ address + "',POSTCODE='" + postcode + "',ADDRESS2='"+ address2 + "',LONGITUDE='" + longitude + "',LATITUDE='" + latitude
        + "',PHONENUM='" + tellnum + "',EMAIL='" +  email + "',ARLMCHECK='" + alrmcheck + "',ARLMSTARTTIME='" + alrmstarttime + "',ARLMENDTIME='" + alrmendtime
        + "',ARLMHOLIDAYCHECK='" + alrmholidaycheck + "',ETC='" + etc+"'";
        setmodifyAdmin(data,id);
    }

    
}

function serchbtn(){
    var searchtext = document.getElementById("text-search").value;
    if(searchtext != ""){
        searchAdmin(searchtext);
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
    // console.log("검색 : " + searchtext);
}
var monitoringRoadData;
var monitoring_map;
function initializeMap() {
     // 카카오 지도 API 초기화
        var mapContainer = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
        var options = { // 지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(35.8901, 128.7031), // 지도의 중심좌표 (서울)
            level: 4 // 지도의 확대 레벨
        };

        monitoring_map = new kakao.maps.Map(mapContainer, options); // 지도 생성 및 객체 리턴
        str = ""
        getdata(str);
}
// 스크립트 파일을 외부에서 호출할 수 있도록 initializeMap 함수를 노출시킴
window.initializeMap = initializeMap;


function Monitoring_Map_set(data){
    
    for (var i = 0; i < monitoringRoadData.length; i++) {
        var address1 = monitoringRoadData[i].LONGITUDE;
        var address2 = monitoringRoadData[i].LATITUDE;
        var productid = monitoringRoadData[i].PRODUCTID;
        var markerPosition = new kakao.maps.LatLng(address2, address1); // 마커 위치
        var marker = new kakao.maps.Marker({
            position: markerPosition,
            image: new kakao.maps.MarkerImage('http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', new kakao.maps.Size(24, 35)),
        });

        for(var j=0; j<data.length; j++){
            if(productid == data[j].PRODUCTID){
                marker.myData = data[j];
            }
        }
        var markerTextbox = document.getElementById('markerTextbox');

        // 지도에 이동 이벤트 설정
        kakao.maps.event.addListener(monitoring_map, 'center_changed', function() {
            var centerPosition = monitoring_map.getCenter();
            var markerPosition = monitoring_map.getProjection().pointFromCoords(marker.getPosition());
            var boxOffsetX = 10; // X 축 보정 값
            var boxOffsetY = 10; // Y 축 보정 값
        
            markerTextbox.style.display = 'none';
            markerTextbox.style.left = (markerPosition.x + boxOffsetX) + 'px';
            markerTextbox.style.top = (markerPosition.y + boxOffsetY) + 'px';    
        });

        (function(marker) {
            kakao.maps.event.addListener(marker, 'click', function() {
                document.getElementById('dataModal').style.display = 'block';
                var datamodalHeader = document.getElementById("dataModal-header");
                datamodalHeader.textContent =  marker.myData.PRODUCTID;
                opendataModal();
                // 마커 클릭 시 실행될 동작을 여기에 추가합니다.
            });

            kakao.maps.event.addListener(marker, 'mouseover', function() {
                var centerPosition = monitoring_map.getCenter();

                var markerPosition = monitoring_map.getProjection().containerPointFromCoords(marker.getPosition());
                var boxOffsetX = 270; // X 축 보정 값
                var boxOffsetY = 100; // Y 축 보정 값
                // markerTextbox.innerHTML = '마커 위치: ' + (markerPosition.x + boxOffsetX) + ', ' + (markerPosition.y + boxOffsetY);
                markerTextbox.style.display = 'block';
                markerTextbox.style.left = (markerPosition.x + boxOffsetX) + 'px';
                markerTextbox.style.top = (markerPosition.y + boxOffsetY) + 'px';    
                var name = document.getElementById("label1");
                var receivedtime = document.getElementById("label2");
                var voltage = document.getElementById("label3");
                var current = document.getElementById("label4");
                var windspeed1 = document.getElementById("label5");
                var windspeed2 = document.getElementById("label6");
                name.textContent = marker.myData.PRODUCTID;
                receivedtime.textContent = "수신시간: "+marker.myData.RECEIVEDTIME;
                voltage.textContent = "전압: "+marker.myData.VOLTAGE+"(mV)";
                current.textContent = "전류: "+marker.myData.CURRENT+"(mA)";
                windspeed1.textContent = "풍속1: "+marker.myData.WINDSPEED1+"(RPM)";
                windspeed2.textContent = "풍속2: "+marker.myData.WINDSPEED2+"(RPM)";
            });
          
              // 마커에 마우스 아웃 이벤트 설정
              kakao.maps.event.addListener(marker, 'mouseout', function() {
                var markerTextbox = document.getElementById('markerTextbox');
                markerTextbox.style.display = 'none';
              });
        })(marker);
        
        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(monitoring_map);
    }
    
}
function splitDataIntoLines(data) {
    return data.split('\n');
}
function splitDataIntocom(data) {
    return data.split(',');
}
var marker = null;
function searchPostcode() {

    new daum.Postcode({
        oncomplete: function(data) {
            // 주소를 가져옴
            var address = data.address;
            var postcode = data.zonecode;
            
            // 주소를 기반으로 경도와 위도를 검색
            var geocoder = new kakao.maps.services.Geocoder();
            geocoder.addressSearch(address, function(result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    // 경도와 위도를 가져옴
                    var longitude = result[0].x;
                    var latitude = result[0].y;
                    var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                    // 경도와 위도를 출력
                    // console.log('경도:', longitude);
                    // console.log('위도:', latitude);
                    document.getElementById("address").value = address;
                    document.getElementById("postcode").value = postcode;
                    document.getElementById("longitude").value = longitude;
                    document.getElementById("latitude").value = latitude;
                    var moveLatLng = new kakao.maps.LatLng(result[0].y, result[0].x);
                    map.setCenter(moveLatLng);

                    if (marker) {
                        marker.setMap(null);
                    }

                    // 새로운 마커를 생성하고 지도에 표시합니다
                    marker = new kakao.maps.Marker({
                        map: map,
                        position: coords
                    });

                } else {
                    console.error('주소 검색에 실패했습니다:', status);
                }
            });
        }
    }).open();
}

function modify_map(longitude, latitude){
    map = new kakao.maps.Map(document.getElementById('map'), {
        center: new kakao.maps.LatLng(latitude, longitude), // 
        level: 3
    });

    var markerPosition = new kakao.maps.LatLng(latitude, longitude); // 마커 위치 
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });
        
        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
}
window.modify_map = modify_map;

function modifyProduct_map(readmap,longitude, latitude){
    while (readmap.firstChild) {
        readmap.removeChild(readmap.firstChild);
      }
    map = new kakao.maps.Map(readmap, {
        center: new kakao.maps.LatLng(latitude, longitude), // 
        level: 3
    });

    var markerPosition = new kakao.maps.LatLng(latitude, longitude); // 마커 위치 
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });
        
        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
}

function ProdcuctsearchPostcode(clickedButton) {

    new daum.Postcode({
        oncomplete: function(data) {
            // 주소를 가져옴
            var address = data.address;
            var postcode = data.zonecode;
            
            // 주소를 기반으로 경도와 위도를 검색
            var geocoder = new kakao.maps.services.Geocoder();
            geocoder.addressSearch(address, function(result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    // 경도와 위도를 가져옴
                    var longitude = result[0].x;
                    var latitude = result[0].y;
                    var parentDiv = clickedButton.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
                    var parentId = parentDiv.id;
                    var child = parentDiv.querySelectorAll("input");
                    var divList = parentDiv.querySelectorAll("div");
                    for(var j=0; j<divList.length; j++)
                    {
                        if(divList[j].id == "map2"){
                            var setmap = divList[j];
                        }
                    }
                    // 경도와 위도를 출력
                    // console.log('경도:', longitude);
                    // console.log('위도:', latitude);
                    child[7].value = address;
                    child[8].value = postcode;
                    child[10].value = longitude;
                    child[11].value = latitude;
                    modifyProduct_map(setmap,longitude, latitude);

                  

                } else {
                    console.error('주소 검색에 실패했습니다:', status);
                }
            });
        }
    }).open();
}


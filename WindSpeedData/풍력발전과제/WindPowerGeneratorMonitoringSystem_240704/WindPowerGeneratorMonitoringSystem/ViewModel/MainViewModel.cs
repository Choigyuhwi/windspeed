using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO.Ports;
using WindPowerGeneratorMonitoringSystem.Model;
using System.ComponentModel.Design;
using System.Diagnostics;
using System.Windows.Input;
using WindPowerGeneratorMonitoringSystem.Command;
using System.Net.Http;
using System.Text.Json;
using System.Timers;
using MySql.Data.MySqlClient;
using System.IO;
using System.Windows;


namespace WindPowerGeneratorMonitoringSystem.ViewModel
{
    public class MainViewModel : ViewModelBase
    {
        public SerialPort serialPort1 = new SerialPort();
        public SerialPort serialPort2 = new SerialPort();
        public MainModel _mainModel;

        public ICommand SettingCommand { get; set; }

        #region PortPart
        public string SelectPort1 { get { return _mainModel.selectport1; } set { _mainModel.selectport1 = value; OnPropertyChanged(); } }
        public string SelectPort2 { get { return _mainModel.selectport2; } set { _mainModel.selectport2 = value; OnPropertyChanged(); } }
        public List<string> PortList1 { get; set; } = new List<string>() { };
        public List<string> PortList2 { get; set; } = new List<string>() { };
        public ICommand Port1ConnectCommand { get; set; }
        public ICommand Port2ConnectCommand { get; set; }

        public ICommand Port1DisConnectCommand { get; set; }
        public ICommand Port2DisConnectCommand { get; set; }
        #endregion

        #region MonitoringPart
        public string Product_str { get { return _mainModel.productid_str; } set { _mainModel.productid_str = value; OnPropertyChanged(); } }
        public string Modem_str { get { return _mainModel.modemid_str; } set { _mainModel.modemid_str = value; OnPropertyChanged(); } }
        public string Voltage_str { get { return _mainModel.voltage_str; } set { _mainModel.voltage_str = value; OnPropertyChanged(); } }
        public string Currect_str { get { return _mainModel.currect_str; } set { _mainModel.currect_str = value; OnPropertyChanged(); } }
        public string WindSeed1_str { get { return _mainModel.windSpeed1_str; } set { _mainModel.windSpeed1_str = value; OnPropertyChanged(); } }
        public string WindSeed3_str { get { return _mainModel.windSpeed3_str; } set { _mainModel.windSpeed3_str = value; OnPropertyChanged(); } }
        #endregion

        #region ControlPart
        public string Windspeed2_str { get { return _mainModel.windspeed2_str; } set { _mainModel.windspeed2_str = value; OnPropertyChanged(); } }
        public string Time_str { get { return _mainModel.time_str; } set { _mainModel.time_str = value; OnPropertyChanged(); } }
        public ICommand Control1ChangeCommand { get; set; }
        public ICommand Control2ChangeCommand { get; set; }

        public double SetSendTime;
        public System.Timers.Timer timer;

        public string CompanyName = "";
        #endregion
        public MainViewModel()
        {
            _mainModel = new MainModel();
            //MainWindow = new MainWindow();
            Port1ConnectCommand = new ConnectCommand(this, 0);
            Port2ConnectCommand = new ConnectCommand(this, 1);
            Port1DisConnectCommand = new DisconnectCommand(this, 0);
            Port2DisConnectCommand = new DisconnectCommand(this, 1);
            Control1ChangeCommand = new ControlChangCommand(this,0);
            Control2ChangeCommand = new ControlChangCommand(this,1);
            SettingCommand = new SettingCommand(this);
      
            #region 초기 연결가능한 포트만 list에 추가c
            string[] Port_name = SerialPort.GetPortNames();
            foreach (string port in Port_name)
            {
                PortList1.Add(port);//combobox에 사용가능한 포트 다 추가
                PortList2.Add(port);//combobox에 사용가능한 포트 다 추가
            }
            #endregion

            #region 초기모니터링 데이터 세팅
            Product_str = "3362120101";
            Modem_str = "0";
            Voltage_str = "0";
            Currect_str = "0";
            WindSeed1_str = "0";
            WindSeed3_str = "0";
            #endregion

            #region 초기컨트롤 데이터 세팅
            Windspeed2_str = "1111";
            Time_str = "180000";
            #endregion
            controlset_set();
            productstr_set();
            //double time = double.Parse(Time_str) * 3600000; //시간당 ms로 변경
            double time = double.Parse(Time_str) * 60000; // 분당 ms로 변경
            TimerSet(time);

            //StartServer();
            //DBconnect();


        }
        public void productstr_set()
        {
            string filename = "data.txt";
            if (!File.Exists(filename))
            {
                Product_str = "";
                // 파일이 존재하지 않으면 데이터를 저장
            }
            else
            {
                // 파일이 이미 존재하면 데이터를 읽음
                string loadedData = LoadDataFromFile(filename);
                string[] dataArray = loadedData.Split(',');
                CompanyName = dataArray[0];
                Product_str = dataArray[1];
                Modem_str = dataArray[2];
            }
        }
        public void controlset_set()
        {
            string filename = "controldata.txt";
            if (!File.Exists(filename))
            {
                Windspeed2_str = "1";
                Time_str = "1";
                // 파일이 존재하지 않으면 데이터를 저장
            }
            else
            {
                // 파일이 이미 존재하면 데이터를 읽음
                string loadedData = LoadDataFromFile(filename);
                string[] dataArray = loadedData.Split(',');
                Windspeed2_str = dataArray[0];
                Time_str = dataArray[1];
            }
        }
        public void SaveDataToFile(string filename, string data)
        {
            // 데이터를 파일에 저장
            File.WriteAllText(filename, data);
        }
        static string LoadDataFromFile(string filename)
        {
            // 파일에서 데이터를 읽어옴
            return File.ReadAllText(filename);
        }
        public void TimerSet(double time)
        {
            Debug.WriteLine("서버진입");
            timer = new System.Timers.Timer();

            SetSendTime = time;

            // 타이머 간격 설정 (5분 = 300000 밀리초)
            timer.Interval = SetSendTime; // 5분마다
            // 타이머 이벤트 핸들러 등록

            timer.Elapsed += (sender, e) => StartServer();

            // 타이머 시작
            timer.Start();

            //Console.WriteLine("타이머가 시작되었습니다. 프로그램을 종료하려면 아무 키나 누르세요.");
            //Console.ReadKey();
        }
      
        #region 기존 서버에 txt파일로 데이터전송(현재 안씀)
        public async Task StartServer()
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    // Apache 웹 서버의 API 엔드포인트 주소를 설정합니다.
                    string apiUrl = "http://118.45.177.125:7071/monitoring.php";

                    // HTTP GET 요청을 보냅니다.
                    HttpResponseMessage response = await client.GetAsync(apiUrl);

                    // 요청이 성공적으로 완료되었는지 확인합니다.
                    if (response.IsSuccessStatusCode)
                    {
                        // JSON 형식의 응답을 문자열로 읽습니다.
                        string responseData = await response.Content.ReadAsStringAsync();
                        string decodedData = JsonSerializer.Deserialize<string>(responseData);
                        string currentTime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                        string data = CompanyName + ","+Product_str + "," + Modem_str + "," + Voltage_str + "," + Currect_str + "," + WindSeed1_str + "," + Windspeed2_str + "," + SetSendTime + "," + WindSeed3_str + "," + currentTime;

                        // 디코딩된 데이터 출력
                        Debug.WriteLine("디코딩된 데이터: " + timer.Interval);
                        if (serialPort1.IsOpen)
                        {
                            // 원하는 작업을 수행합니다. 예: 데이터 출력
                            await SendDataToServer(data);
                        }
                    }
                    else
                    {
                        Debug.WriteLine("요청이 실패했습니다. 상태 코드: " + SetSendTime);
                    }
                }
                catch (Exception e)
                {
                    Debug.WriteLine("오류 발생: " + e.Message);
                }

            }
        }
        static async Task SendDataToServer(string data)
        {
            using (HttpClient client = new HttpClient())
            {
                // Apache 웹 서버의 데이터를 다시 보낼 API 엔드포인트 주소를 설정합니다.
                string apiUrl = "http://118.45.177.125:7071/send_data.php";

                // 데이터를 HTTP POST 요청의 본문에 담아서 보냅니다.
                var content = new StringContent(data, Encoding.UTF8, "application/json");

                // HTTP POST 요청을 보냅니다.
                HttpResponseMessage response = await client.PostAsync(apiUrl, content);

                // 요청이 성공적으로 완료되었는지 확인합니다.
                if (response.IsSuccessStatusCode)
                {
                    Debug.WriteLine("데이터를 성공적으로 서버에 보냈습니다.");
                    string responseBody = await response.Content.ReadAsStringAsync();
                    Debug.WriteLine("Response: " + responseBody);
                }
                else
                {
                    Debug.WriteLine("데이터를 서버에 보내는데 실패했습니다. 상태 코드: " + response.StatusCode);
                }
            }
        }
        #endregion
        
    }
}

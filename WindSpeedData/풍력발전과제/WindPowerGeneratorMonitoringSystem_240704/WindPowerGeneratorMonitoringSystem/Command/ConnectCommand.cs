using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO.Ports;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;
using WindPowerGeneratorMonitoringSystem.ViewModel;
using System.Timers;
using System.Threading;

namespace WindPowerGeneratorMonitoringSystem.Command
{
    internal class ConnectCommand : ICommand
    {
        public event EventHandler? CanExecuteChanged;
        private MainViewModel _mainViewModel;
        private static System.Timers.Timer timer;

        int btnindex = 0;
        string conncetstr = "";

        public ConnectCommand(MainViewModel mainViewModel, int index)
        {
            this._mainViewModel = mainViewModel;
            btnindex = index;
        }

        public bool CanExecute(object? parameter)
        {
            Debug.WriteLine("파라미터:"+parameter);
            return true;
        }

        public void Execute(object? parameter)
        {
            ClickConnectBtn();
            Debug.WriteLine("Open버튼" + conncetstr);

        }
        public void ClickConnectBtn()
        {
            switch (btnindex)
            {
                case 0:
                    Debug.WriteLine(_mainViewModel.SelectPort1);
                    _mainViewModel.serialPort1.PortName = _mainViewModel.SelectPort1;
                    _mainViewModel.serialPort1.BaudRate = 115200; //baudrate 지정
                    _mainViewModel.serialPort1.DataBits = 8 ; //databit 지정
                    _mainViewModel.serialPort1.StopBits = (StopBits)1;//stopbit 지정 
                    _mainViewModel.serialPort1.Parity = (Parity)0;//parity 지정
                    _mainViewModel.serialPort1.DataReceived += new SerialDataReceivedEventHandler(serialPort_DataReceived1); //수신데이터 처리
                    _mainViewModel.serialPort1.Open();
                    conncetstr = _mainViewModel.serialPort1.PortName + ", " + _mainViewModel.serialPort1.BaudRate + ", " + _mainViewModel.serialPort1.DataBits 
                        + ", " + _mainViewModel.serialPort1.StopBits + ", " + _mainViewModel.serialPort1.Parity;
                    break;
                case 1:
                    _mainViewModel.serialPort2.PortName = _mainViewModel.SelectPort2;
                    _mainViewModel.serialPort2.BaudRate = 4800; //baudrate 지정
                    _mainViewModel.serialPort2.DataBits = 8; //databit 지정
                    _mainViewModel.serialPort2.StopBits = (StopBits)1;//stopbit 지정 
                    _mainViewModel.serialPort2.Parity = (Parity)0;//parity 지정
                    _mainViewModel.serialPort2.Handshake = Handshake.None;
                    _mainViewModel.serialPort2.DataReceived += new SerialDataReceivedEventHandler(serialPort_DataReceived2); //수신데이터 처리
                    _mainViewModel.serialPort2.Open();
                    DataSetPort2();
                    timer = new System.Timers.Timer();

                    // 타이머 간격 설정 (5분 = 300000 밀리초)
                    timer.Interval = float.Parse(_mainViewModel.Windspeed2_str) * 60000; ;
                    // 타이머 이벤트 핸들러 등록
                    timer.Elapsed += (sender, e) => DataSetPort2();

                    // 타이머 시작
                    timer.Start();

                    // 프로그램이 종료되지 않도록 대기
                    Console.ReadLine();
                    
                    break;
            }

        }

        public void DataSetPort2()
        {
            try
            {
                recv_totaldata = "";
                Debug.WriteLine("인");
                string hexString = "010300000001840A";
                byte[] dataToSend = HexStringToByteArray(hexString);
                _mainViewModel.serialPort2.Write(dataToSend, 0, dataToSend.Length);

            }
            catch (Exception ex)
            {
                Debug.WriteLine("Error: " + ex.Message);
            }
        }

        #region 데이터처리부분
        private void serialPort_DataReceived1(object s, SerialDataReceivedEventArgs e)
        {
            if (_mainViewModel.serialPort1.IsOpen)
            {
                try
                {
                    int ReceiveData = _mainViewModel.serialPort1.BytesToRead;//바이트 수를 읽어옴.
                    byte[] b_tmp_buf = new byte[ReceiveData];//바이트형 배열을 만듬.
                    string recv_str_asc = "";//ascii형 정의
                    _mainViewModel.serialPort1.Read(b_tmp_buf, 0, ReceiveData); //serail포트의 데이터를 바이트수만큼 읽고 b_tmp_buf에 저장
                    for (int i = 0; i < ReceiveData; i++)
                    {
                        recv_str_asc += Convert.ToChar(b_tmp_buf[i]);//ascii
                    }
                    string[] dataArray = recv_str_asc.Split(" : ");// volt = ??? : currect = ??? : time = ??? 형태로 들어오기에 : 기준으로 배열자름
                    //Debug.WriteLine(dataArray[0] + "," + dataArray[1]+ "," + dataArray[2] );
                    string voltage = dataArray[0];
                    string current = dataArray[1];
                    string wind1 = dataArray[2];
                    string[] voltage_data = voltage.Split("=");
                    string[] current_data = current.Split("=");
                    string[] wind1_data = wind1.Split("=");
                    if (wind1_data[1] == "")
                    {
                        wind1_data[1] = "0";
                    }
                    //Debug.WriteLine(voltage_data[1] + "," + current_data[1] + "," + wind1_data[1]);
                    //int a = int.Parse(voltage_data[1]);
                    //int b = int.Parse(current_data[1]);
                    //int c = int.Parse(voltage_data[1]);
                    //Debug.WriteLine(b);
                    //if(a != 0)
                    //{
                    //    _mainViewModel.Voltage_str = voltage_data[1];
                    //}
                    //if(b != 0)
                    //{
                    //    _mainViewModel.Currect_str = current_data[1];
                    //}
                    _mainViewModel.Currect_str = current_data[1];
                    _mainViewModel.Voltage_str = voltage_data[1];
                    _mainViewModel.WindSeed1_str = wind1_data[1];
                    
                }
                catch
                {
                    //MessageBox.Show("Error");
                }
            }
        }

        string recv_totaldata = "";
        private void serialPort_DataReceived2(object s, SerialDataReceivedEventArgs e)
        {
            if (_mainViewModel.serialPort2.IsOpen)
            {
                try
                {
                    int ReceiveData = _mainViewModel.serialPort2.BytesToRead;//바이트 수를 읽어옴.
                    byte[] b_tmp_buf = new byte[ReceiveData];//바이트형 배열을 만듬.
                    string recv_str_hex = ""; //hex형 정의
                    string recv_str_asc = "";//ascii형 정의
                    _mainViewModel.serialPort2.Read(b_tmp_buf, 0, ReceiveData); //serail포트의 데이터를 바이트수만큼 읽고 b_tmp_buf에 저장
                    for (int i = 0; i < ReceiveData; i++)
                    {
                        recv_str_hex += b_tmp_buf[i].ToString("X2") + " ";//hex
                        recv_str_asc += Convert.ToChar(b_tmp_buf[i]);//ascii
                    }
                    recv_totaldata += recv_str_hex;

                }
                catch
                {
                    MessageBox.Show("Error");
                }
                if(recv_totaldata.Length > 20)
                {
                    Debug.WriteLine(recv_totaldata);
                    recv_totaldata = recv_totaldata.Substring(9, 5);
                    recv_totaldata = recv_totaldata.Replace(" ", "");
                    float decimalValue = Convert.ToInt32(recv_totaldata, 16);
                    decimalValue = decimalValue * 0.1f;
                    _mainViewModel.WindSeed3_str = decimalValue.ToString();
                    Debug.WriteLine(recv_totaldata);
                    Debug.WriteLine(decimalValue);
                }
            }
        }

        private static byte[] HexStringToByteArray(string hex)
    {
        int numberChars = hex.Length;
        byte[] bytes = new byte[numberChars / 2];
        for (int i = 0; i < numberChars; i += 2)
        {
            bytes[i / 2] = Convert.ToByte(hex.Substring(i, 2), 16);
        }
        return bytes;
    }
        #endregion


    }
}

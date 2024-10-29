using Serial_Communication_sample_wpf_ver.MVVM.ViewModel;
using Serial_Communication_sample_wpf_ver.MVVM.Views;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO.Ports;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;




namespace Serial_Communication_sample_wpf_ver.MVVM.Command
{
    public class ConnectCommand : ICommand
    {
        private MainViewModel _mainViewModel;


        public ConnectCommand(MainViewModel mainViewModel)
        {
            this._mainViewModel = mainViewModel;
        }

        public event EventHandler CanExecuteChanged
        {
            //버튼 실시간 enable위해 추가
            add { CommandManager.RequerySuggested += value; }  
            remove { CommandManager.RequerySuggested -= value; } 
        }

        #region 포트 오픈 관련
        private void Conncet_Check()
        {
            if (Select_Check())
            {
                if (PortNameCheck())
                {
                    if (!_mainViewModel.serialPort.IsOpen)
                    {
                        _mainViewModel.serialPort.PortName = _mainViewModel.SelectPort; //포트이름
                        _mainViewModel.serialPort.BaudRate = int.Parse(_mainViewModel.SelectBaudRate); //baudrate 지정
                        _mainViewModel.serialPort.DataBits = int.Parse(_mainViewModel.SelectDataBit); ; //databit 지정
                        _mainViewModel.serialPort.StopBits = (StopBits)int.Parse(_mainViewModel.SelectStopBit);//stopbit 지정 
                        int parity_index = 0;
                        switch (_mainViewModel.SelectParity)
                        {
                            case "None":
                                parity_index = 0;
                                break;
                            case "Odd":
                                parity_index = 1;
                                break;
                            case "Even":
                                parity_index = 2;
                                break;
                        }
                        _mainViewModel.serialPort.Parity = (Parity)parity_index;//parity 지정
                        _mainViewModel.serialPort.DataReceived += new SerialDataReceivedEventHandler(serialPort_DataReceived); //수신데이터 처리
                        _mainViewModel.serialPort.Open();//데이터 열기
                        _mainViewModel.Status = "포트가 열렸습니다.";

                    }
                    else
                    {
                        _mainViewModel.Status = "포트가 이미 열려있습니다.";
                    }
                }
                else
                {
                    MessageBox.Show("연결할 수 없는 포트입니다.");
                }
            }
            else
            {
                MessageBox.Show("모든값을 입력하여 주세요.");
            }
        }
        #endregion

        #region 데이터 처리부분
        private void serialPort_DataReceived(object s, SerialDataReceivedEventArgs e)
        {
            if(_mainViewModel.serialPort.IsOpen)
            {
                try
                {
                    int ReceiveData = _mainViewModel.serialPort.BytesToRead;//바이트 수를 읽어옴.
                    byte[] b_tmp_buf = new byte[ReceiveData];//바이트형 배열을 만듬.
                    string recv_str_hex = ""; //hex형 정의
                    string recv_str_asc = "";//ascii형 정의
                    _mainViewModel.serialPort.Read(b_tmp_buf, 0, ReceiveData); //serail포트의 데이터를 바이트수만큼 읽고 b_tmp_buf에 저장
                    for (int i = 0; i < ReceiveData; i++)
                    {
                        recv_str_hex += b_tmp_buf[i].ToString("X2") + " ";//hex
                        recv_str_asc += Convert.ToChar(b_tmp_buf[i]);//ascii
                    }
                    if(_mainViewModel.SelectDataType == "HEX")
                    {
                        _mainViewModel.Receive = _mainViewModel.Receive + recv_str_hex + "\r\n";
                    }
                    else
                    {
                        _mainViewModel.Receive = _mainViewModel.Receive + recv_str_asc + "\r\n";
                    }
                }
                catch
                {
                    MessageBox.Show("Error");
                }
            }
           
        }
        #endregion

        #region combobox 체크
        public bool Select_Check() //combobox 값이 null인경우 예외처리
        {
            if (_mainViewModel.SelectPort == "")
            {
                return false;
            }
            if (_mainViewModel.SelectBaudRate == "")
            {
                return false;
            }
            if (_mainViewModel.SelectDataBit == "")
            {
                return false;
            }
            if (_mainViewModel.SelectStopBit == "")
            {
                return false;
            }
            if (_mainViewModel.SelectParity == "")
            {
                return false;
            }
            return true;

        }
        #endregion

        #region 포트사용 유무 체크
        public bool PortNameCheck()
        {
            string[] Port_Name = SerialPort.GetPortNames();
            bool check = false;
            foreach (string port in Port_Name)
            {
              if(_mainViewModel.SelectPort == port)
                {
                    check = true;
                }
            }
            return check;
        }
        #endregion

        public bool CanExecute(object? parameter) //true -> 활성화, false -> 비활성화
        {
            if (_mainViewModel.serialPort.IsOpen) return false;

            return true;
        }    
        
        public void Execute(object? parameter) //연결하기버튼 이벤트
        {
            Conncet_Check();
        }
    }

}

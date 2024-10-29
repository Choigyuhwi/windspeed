using Serial_Communication_sample_wpf_ver.MVVM.Command;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using System.Windows.Threading;
using System.IO.Ports;
using System.ComponentModel;
using Serial_Communication_sample_wpf_ver.MVVM.Model;

namespace Serial_Communication_sample_wpf_ver.MVVM.ViewModel
{
    public class MainViewModel : ViewModelBase
    {
        public SerialPort serialPort = new SerialPort();
        public MainModel _mainModel;

        public MainViewModel()
        {
            ConnectCommand = new ConnectCommand(this);
            DisConnectCommand = new DisConnectCommand(this);
            SendCommand = new SendCommand(this);
            _mainModel = new MainModel();
        }

        #region 버튼
        public ICommand ConnectCommand { get; set; }
        public ICommand DisConnectCommand { get; set; }
        public ICommand SendCommand { get; set; }
        #endregion

        #region textbox/데이터변환
     
        public string Status { get { return _mainModel.status; } set { _mainModel.status = value; OnPropertyChanged(); } }
        public string Receive { get { return _mainModel.receive; } set { _mainModel.receive = value; OnPropertyChanged(); } }
        public string Send {get{ return _mainModel.send; } set { _mainModel.send = value; OnPropertyChanged(); } }

        public string SelectPort { get { return _mainModel.selectPort; } set { _mainModel.selectPort = value; OnPropertyChanged(); } }
        public string SelectBaudRate { get { return _mainModel.selectBaudRate; } set { _mainModel.selectBaudRate = value; OnPropertyChanged(); } }
        public string SelectDataBit { get { return _mainModel.selectDataBit; } set { _mainModel.selectDataBit = value; OnPropertyChanged(); } }
        public string SelectParity { get { return _mainModel.selectParity; } set { _mainModel.selectParity = value; OnPropertyChanged(); } }
        public string SelectStopBit { get { return _mainModel.selectStopBit; } set { _mainModel.selectStopBit = value; OnPropertyChanged(); } }
        public string SelectDataType { get { return _mainModel.selectDataType; } set { _mainModel.selectDataType = value; OnPropertyChanged(); } }
        #endregion

        #region 콤보박스
        public List<string> PortList { get; set; } = new List<string>()
        {
            "COM1",
            "COM2",
            "COM3",
            "COM4",
        };
        public List<string> BaudRateList { get; set; } = new List<string>()
        {
            "9600",
            "19200",
            "38400",
            "57600",
            "115200",
        };
        public List<string> DataBitList { get; set; } = new List<string>()
        {
            "7",
            "8",           
        };
        public List<string> ParityList { get; set; } = new List<string>()
        {
            "None",
            "Odd",
            "Even",
        };
        public List<string> StopBitList { get; set; } = new List<string>()
        {
            "1",
            "2",           
        };
        public List<string> DataType { get; set; } = new List<string>()
        {
            "ASCII",
            "HEX",
        };
        #endregion
    }
}

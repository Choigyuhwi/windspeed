using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Serial_Communication_sample_wpf_ver.MVVM.Model
{
    public class MainModel
    {
        #region 텍스트박스
        public string status = "";
        public string receive = "";
        public string send = "";
        #endregion

        #region 선택된 콤보박스
        public string selectPort = "";
        public string selectBaudRate = "9600";
        public string selectDataBit = "8";
        public string selectParity = "None";
        public string selectStopBit = "1";
        public string selectDataType = "ASCII";
        #endregion
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WindPowerGeneratorMonitoringSystem.Model
{
    public class MainModel
    {
        #region 선택된 콤보박스
        public string selectport1 = "";
        public string selectport2 = "";
        #endregion

        #region 모니터링 텍스트
        public string productid_str = "";
        public string modemid_str = "";
        public string voltage_str = "";
        public string currect_str = "";
        public string windSpeed1_str = "";
        public string windSpeed3_str = "";
        #endregion

        #region 제어 텍스트
        public string windspeed2_str = "";
        public string time_str = "";
        #endregion
    }
}

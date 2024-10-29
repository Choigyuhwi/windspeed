using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;
using WindPowerGeneratorMonitoringSystem.ViewModel;

namespace WindPowerGeneratorMonitoringSystem.Command
{   

    internal class SettingCommand : ICommand
    {
        public event EventHandler? CanExecuteChanged;
        private MainViewModel _mainViewModel;

        public SettingCommand(MainViewModel mainViewModel)
        {
            this._mainViewModel = mainViewModel;
        }

        public bool CanExecute(object? parameter)
        {
            return true;
        }

        public void Execute(object? parameter)
        {
            ClickSettingBtn();
        }
        public void ClickSettingBtn()
        {
            PopupWindow popup = new PopupWindow();
            popup.ShowDialog();
            string companyname = popup.companyname;
            string productid = popup.productid;
            if (!string.IsNullOrEmpty(companyname) && !string.IsNullOrEmpty(productid))
            {
                _mainViewModel.Product_str = productid;
                Debug.WriteLine("메인 창에서 가져온 데이터: " + companyname + ","+productid);
                // 여기에서 가져온 데이터를 메인 창에서 사용할 수 있습니다.
            }
        }

    }
}

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO.Ports;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using WindPowerGeneratorMonitoringSystem.ViewModel;

namespace WindPowerGeneratorMonitoringSystem.Command
{
    internal class ControlChangCommand : ICommand
    {
        public event EventHandler? CanExecuteChanged;
        private MainViewModel _mainViewModel;

        int btnindex = 0;
        string btnstr = "";

        public ControlChangCommand(MainViewModel mainViewModel, int index)
        {
            this._mainViewModel = mainViewModel;
            btnindex = index;
        }

        public bool CanExecute(object? parameter)
        {
            return true;
        }

        public void Execute(object? parameter)
        {
            ClickChangeBtn();
        }
        public void ClickChangeBtn()
        {
            this._mainViewModel.timer.Stop();
            //double time = double.Parse(this._mainViewModel.Time_str) * 3600000;
            double time = double.Parse(this._mainViewModel.Time_str) * 60000; //분당 ms로 변경

            this._mainViewModel.SetSendTime = time;
            this._mainViewModel.TimerSet(time);
            Debug.WriteLine("변경");
            string filename = "controldata.txt";
            string data = this._mainViewModel.Windspeed2_str + "," + this._mainViewModel.Time_str;
            this._mainViewModel.SaveDataToFile(filename, data);
        }
    }
}

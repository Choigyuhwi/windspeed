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
    internal class DisconnectCommand : ICommand
    {
        private MainViewModel _mainViewModel;

        int btnindex = 0;

        public DisconnectCommand(MainViewModel mainViewModel, int index)
        {
            this._mainViewModel = mainViewModel;
            btnindex = index;
            
        }

        public event EventHandler? CanExecuteChanged;

        public bool CanExecute(object? parameter)
        {
            return true;
        }

        public void Execute(object? parameter)
        {
            OnDisConnect();
        }

        private void OnDisConnect()
        {
            if (btnindex == 0)
            {
                if (_mainViewModel.serialPort1.IsOpen)
                {
                    _mainViewModel.serialPort1.Close();

                }
                else
                {
                    Debug.WriteLine("포트가 이미 닫혀 있습니다");
                }
            }
            else
            {

                if (_mainViewModel.serialPort2.IsOpen)
                {
                    _mainViewModel.serialPort2.Close();

                }
                else
                {
                    Debug.WriteLine("포트가 이미 닫혀 있습니다");
                }
            }
        }
    }
}

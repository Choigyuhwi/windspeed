using Serial_Communication_sample_wpf_ver.MVVM.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO.Ports;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace Serial_Communication_sample_wpf_ver.MVVM.Command
{
    internal class DisConnectCommand : ICommand
    {
        private MainViewModel _mainViewModel;


        public DisConnectCommand(MainViewModel mainViewModel)
        {
            this._mainViewModel = mainViewModel;
        }

        public event EventHandler CanExecuteChanged
        {
            //버튼 실시간 enable위해 추가
            add { CommandManager.RequerySuggested += value; }
            remove { CommandManager.RequerySuggested -= value; }
        }

        public bool CanExecute(object? parameter)//true -> 활성화, false -> 비활성화
        {
            if (!_mainViewModel.serialPort.IsOpen) return false;

            return true;
        }

        public void Execute(object? parameter)//연결끊기 버튼이벤트
        {
            OnDisConnect();   
        }

        #region 연결끊기 버튼이벤트
        private void OnDisConnect()
        {
            if(_mainViewModel.serialPort.IsOpen)
            {
                _mainViewModel.serialPort.Close();
                _mainViewModel.Status = "포트가 닫혔습니다.";
                
            }
            else
            {
                _mainViewModel.Status = "포트가 이미 닫혀 있습니다";
            }
        }
        #endregion
    }
}

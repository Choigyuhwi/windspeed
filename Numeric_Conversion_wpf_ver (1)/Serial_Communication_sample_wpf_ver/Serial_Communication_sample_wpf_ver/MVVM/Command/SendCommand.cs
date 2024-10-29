using Serial_Communication_sample_wpf_ver.MVVM.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace Serial_Communication_sample_wpf_ver.MVVM.Command
{
    internal class SendCommand : ICommand
    {
        private MainViewModel _mainViewModel;


        public SendCommand(MainViewModel mainViewModel)
        {
            this._mainViewModel = mainViewModel;
        }

        public event EventHandler CanExecuteChanged
        {
            //버튼 실시간 enable위해 추가
            add { CommandManager.RequerySuggested += value; }
            remove { CommandManager.RequerySuggested -= value; }
        }

        public bool CanExecute(object? parameter) //true -> 활성화, false -> 비활성화
        {
            if (!_mainViewModel.serialPort.IsOpen) return false;

            return true;
        }

        public void Execute(object? parameter) //보내기버튼 이벤트
        {
           _mainViewModel.serialPort.Write(_mainViewModel.Send);
            _mainViewModel.Send = ""; //보낸후 데이터 초기화
        }
    }
}

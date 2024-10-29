using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;

namespace Serial_Communication_sample_wpf_ver.MVVM.ViewModel
{
    public class ViewModelBase : INotifyPropertyChanged
    {
        public event PropertyChangedEventHandler? PropertyChanged;

        public void OnPropertyChanged([CallerMemberName]string prorertyName = "")//데이터 변경을 UI에게 전달하여 반영할수있도롣
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(prorertyName));
        }
    }
}

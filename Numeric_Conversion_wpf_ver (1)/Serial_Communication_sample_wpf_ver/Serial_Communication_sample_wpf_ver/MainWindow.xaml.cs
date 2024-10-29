using System.Diagnostics;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Serial_Communication_sample_wpf_ver
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            DataContext = new MVVM.ViewModel.MainViewModel(); //바인딩 데이터 처리, mainwindow뷰일경우

            #region mainview 호출해서 작동시킬경우
            //var mainView = new MVVM.Views.MainView()
            //{
            //    DataContext = new MVVM.ViewModel.MainViewModel() //바인딩 데이터 처리
            //};
            //mainView.ShowDialog();
            //this.Close();
            #endregion

        }

    }
}

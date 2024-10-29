using System.IO;
using System.Text;
using System.Windows;

using System.Diagnostics;
using System.Net.Sockets;
using System.Net.Http;
using System.Threading.Tasks;
using System.Net.Mail;
using System.Text.Json;


namespace WindPowerGeneratorMonitoringSystem
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private readonly HttpClient httpClient;
        public MainWindow()
        {
            httpClient = new HttpClient();

            InitializeComponent();

            DataContext = new ViewModel.MainViewModel(); //바인딩 데이터 처리, mainwindow뷰일경우

        }

        private void Button_Port1_Click(object sender, RoutedEventArgs e)
        {
            Button_Port1.IsEnabled = false;
            Button_ClosePort1.IsEnabled = true;
        }

        private void Button_ClosePort1_Click(object sender, RoutedEventArgs e)
        {
            Button_Port1.IsEnabled = true;
            Button_ClosePort1.IsEnabled = false;
        }

        private void Button_Port2_Click(object sender, RoutedEventArgs e)
        {
            Button_Port2.IsEnabled = false;
            Button_ClosePort2.IsEnabled = true;
        }

        private void Button_ClosePort2_Click(object sender, RoutedEventArgs e)
        {
            Button_Port2.IsEnabled = true;
            Button_ClosePort2.IsEnabled = false;
        }
    }
}    

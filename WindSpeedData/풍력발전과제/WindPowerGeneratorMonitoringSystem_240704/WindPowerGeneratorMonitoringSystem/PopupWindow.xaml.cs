using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;
using System.IO;

namespace WindPowerGeneratorMonitoringSystem
{
    /// <summary>
    /// Window1.xaml에 대한 상호 작용 논리
    /// </summary>
    public partial class PopupWindow : Window
    {
        public string companyname { get; set; }
        public string productid { get; set; }
        public string modemid { get; set; }

        public PopupWindow()
        {
            InitializeComponent();
            DataSet();
        }
        public void DataSet()
        {
            string filename = "data.txt";
            if (!File.Exists(filename))
            {
                // 파일이 존재하지 않으면 데이터를 저장
                Console.WriteLine("데이터가 저장되었습니다.");
                TextboxCompanyName.IsEnabled = true;
                TextboxProductId.IsEnabled = true;
                TextboxModemId.IsEnabled = true;
                BtnSave.Visibility = Visibility.Visible;
                BtnModify.Visibility = Visibility.Collapsed;
            }
            else
            {
                TextboxCompanyName.IsEnabled = false;
                TextboxProductId.IsEnabled = false;
                TextboxModemId.IsEnabled = false;
                // 파일이 이미 존재하면 데이터를 읽음
                string loadedData = LoadDataFromFile(filename);
                string[] dataArray = loadedData.Split(',');
                TextboxCompanyName.Text = dataArray[0];
                TextboxProductId.Text = dataArray[1];
                TextboxModemId.Text = dataArray[2];
                Console.WriteLine("불러온 데이터: " + loadedData);
                BtnSave.Visibility = Visibility.Collapsed;
                BtnModify.Visibility = Visibility.Visible;
            }
        }
        private void ClickBtn_Save(object sender, RoutedEventArgs e)
        {
            string filename = "data.txt";
            companyname = TextboxCompanyName.Text;
            productid = TextboxProductId.Text;
            modemid = TextboxModemId.Text;
            string data = companyname + "," + productid+ "," + modemid;
            SaveDataToFile(filename, data);
            Close();
        }

        private void ClickBtn_Cancle(object sender, RoutedEventArgs e)
        {
            Close();
        }
        static void SaveDataToFile(string filename, string data)
        {
            // 데이터를 파일에 저장
            File.WriteAllText(filename, data);
        }
        static string LoadDataFromFile(string filename)
        {
            // 파일에서 데이터를 읽어옴
            return File.ReadAllText(filename);
        }

        private void ClickBtn_Modify(object sender, RoutedEventArgs e)
        {
            TextboxCompanyName.IsEnabled = true;
            TextboxProductId.IsEnabled = true;
            TextboxModemId.IsEnabled = true;
            BtnSave.Visibility = Visibility.Visible;
            BtnModify.Visibility = Visibility.Collapsed;
        }
    }
}

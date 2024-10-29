using System.Data;
using System.Diagnostics;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using MySql.Data.MySqlClient;

namespace WindSpeedData
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public class Info
    {
        public DateTime DateTime { get; set;}
        public string CompanyName { get; set;}
        public string ProductID { get; set;} 
        public string ModemID { get; set;}
        public string Voltage { get; set;}
        public string Currect { get; set; }
        public string WindSpeed1 { get; set; }
        public string WindSpeed2 { get; set; }
        public Info(DateTime datetime, string companyname,  string productid, string modemid, string volatge, string currect, string windspeed1, string windspeed2)
        {
            DateTime = datetime;
            CompanyName = companyname;
            ProductID = productid;
            ModemID = modemid;
            Voltage = volatge;
            Currect = currect;
            WindSpeed1 = windspeed1;
            WindSpeed2 = windspeed2;
        }

    }

    public partial class MainWindow : Window
    {
        List<string> ModemIDList = new List<string>();
        List<string> CompanyNameList = new List<string>();
        public MainWindow()
        {
            InitializeComponent();
            TimeCycleComboboxSet();
            ReadDB_Productid();
        }
        public void TimeCycleComboboxSet()
        {
            for(int i=1; i<13; i++)
            {
                ComboboxTimeCycle.Items.Add(i+"시간");
            }
        }
      
        private void ClickInsetBtn(object sender, RoutedEventArgs e)
        {
            if (ComboboxProductNum.SelectedItem != null && ComboboxTimeCycle.SelectedItem != null)
            {
                List<Info> datainfo = new List<Info>();
                DateTime StartDate = StartDatePicker.SelectedDate ?? DateTime.Now.Date;
                DateTime EndDate = EndDatePicker.SelectedDate ?? DateTime.Now.Date;
                int timecycle = ComboboxTimeCycle.SelectedIndex + 1;
                int selectindex = ComboboxProductNum.SelectedIndex;
                string ProductId = ComboboxProductNum.SelectedValue.ToString();
                Debug.WriteLine(timecycle);
                while (StartDate <= EndDate)
                {
                    for (int hour = 0; hour < 24; hour += timecycle)
                    {
                        DateTime time = new DateTime(StartDate.Year, StartDate.Month, StartDate.Day, hour, 0, 0);
                        double voltage = SetRandomData(VoltageStart.Text, VoltageEnd.Text);
                        double currect = SetRandomData(CurrectStart.Text, CurrectEnd.Text);
                        double windspeed1 = SetRandomData(Windspeed1Start.Text, Windspeed1End.Text);
                        double windspeed2 = SetRandomData(Windspeed2Start.Text, Windspeed2End.Text);
                        datainfo.Add(new Info(time, CompanyNameList[selectindex], ProductId, ModemIDList[selectindex], voltage.ToString(), currect.ToString(), windspeed1.ToString(), windspeed2.ToString()));
                    }
                    StartDate = StartDate.AddDays(1); // 다음 날짜로 이동
                }
                foreach (var info in datainfo)
                {
                    WriteDB_Data(info.CompanyName, info.ProductID, info.ModemID, info.DateTime, info.Voltage, info.Currect, info.WindSpeed1, info.WindSpeed2, timecycle.ToString());
                    Debug.WriteLine($"DateTime: {info.DateTime}, Company: {info.CompanyName}, ProductId: {info.ProductID} , " +
                        $"ModemID: {info.ModemID}, Voltage: {info.Voltage} , Currect: {info.Currect}, Windspeed1: {info.WindSpeed1}, WindSpeed2: {info.WindSpeed2}");
                }
            }
        }
        public Double SetRandomData(string StartValue, string EndValue) 
        {
            Random random = new Random();
            int startvalue = int.Parse(StartValue);
            int endvalue = int.Parse(EndValue);
         
            int Value = random.Next(startvalue, endvalue);
            double randomNum = Value;
            return randomNum;
        }

        public void ReadDB_Productid()
        {
            string connectionString = "Server=localhost;Database=datainfo;Uid=root;Pwd=bigwave1234;charset=utf8;";
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                // 데이터베이스 연결 열기
                connection.Open();

                // SQL 쿼리 작성
                string query = "SELECT * FROM productinfo";

                // 데이터를 저장할 DataTable 생성
                DataTable dataTable = new DataTable();

                // MySQL 데이터베이스에서 데이터 읽기
                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    // 데이터를 읽어올 DataReader 생성
                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        // 데이터를 DataTable에 로드
                        dataTable.Load(reader);
                    }
                }

                // 데이터 출력
                foreach (DataRow row in dataTable.Rows)
                {
                    ComboboxProductNum.Items.Add(row["PRODUCTID"]);
                    CompanyNameList.Add((string)row["CUSTOMERNAME"]);
                    ModemIDList.Add((string)row["MODEMID"]);
                    Debug.WriteLine($"PRODUCTID: {row["PRODUCTID"]}");
                }
            }
        }

        public void WriteDB_Data(string a, string b, string c, DateTime d, string e, string f, string g, string h, string i)
        {
            string connectionString = "Server=localhost;Database=datainfo;Uid=root; Pwd=bigwave1234;charset=utf8;";
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                // 데이터베이스 연결 열기
                connection.Open();

                string query = "INSERT INTO datainfo (COMPANYNAME, PRODUCTID, MODEMID, RECEIVEDTIME, VOLTAGE, CURRENT, WINDSPEED1, WINDSPEED2, CONTROLWIND, CONTROLTIME) " +
                    "VALUES (@value1, @value2, @value3, @value4, @value5, @value6, @value7, @value8, @value9, @value10 )";

                // SQL 쿼리 실행을 위한 MySqlCommand 객체 생성
                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    // 매개 변수 추가
                    command.Parameters.AddWithValue("@value1", a);
                    command.Parameters.AddWithValue("@value2", b);
                    command.Parameters.AddWithValue("@value3", c);
                    command.Parameters.AddWithValue("@value4", d);
                    command.Parameters.AddWithValue("@value5", e);
                    command.Parameters.AddWithValue("@value6", f);
                    command.Parameters.AddWithValue("@value7", g);
                    command.Parameters.AddWithValue("@value8", h);
                    command.Parameters.AddWithValue("@value9", "60");
                    command.Parameters.AddWithValue("@value10", i);

                    // 쿼리 실행
                    int rowsAffected = command.ExecuteNonQuery();

                    // 영향을 받은 행 수 출력
                    Debug.WriteLine($"{rowsAffected} rows inserted.");
                }
            }
        }
    }
}
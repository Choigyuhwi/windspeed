using System;
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

namespace Numeric_Conversion_wpf_ver
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        Button[] All_btn;
        Button select_btn;
        int select_index;

        string viewstr, nowstr, prevstr;
        string hex, dec, oct, bin;
        public MainWindow()
        {
            InitializeComponent();
            txtResult.Text = "HEX : \r\nDEC : \r\nOCT : \r\nBIN : \r\n";
            #region 버튼배열 추가
            All_btn = new Button[16];
            All_btn[0] = btn_0;
            All_btn[1] = btn_1;
            All_btn[2] = btn_2;
            All_btn[3] = btn_3;
            All_btn[4] = btn_4;
            All_btn[5] = btn_5;
            All_btn[6] = btn_6;
            All_btn[7] = btn_7;
            All_btn[8] = btn_8;
            All_btn[9] = btn_9;
            All_btn[10] = btn_a;
            All_btn[11] = btn_b;
            All_btn[12] = btn_c;
            All_btn[13] = btn_d;
            All_btn[14] = btn_e;
            All_btn[15] = btn_f;
            #endregion
        }

        
        private void btn_Click(object sender, RoutedEventArgs e)// 숫자 버튼의 처리
        {
            select_btn = sender as Button;
            string num = select_btn.Content.ToString();
            Conversion_number(num);
        }

        private void Combobox_select_changed(object sender, EventArgs e)//combobox 처리
        {
            ComboBox selct_combobox = sender as ComboBox;
            select_index = selct_combobox.SelectedIndex;

            #region 버튼셋팅
            for (int i = 0; i < All_btn.Length; i++)
            {
                All_btn[i].IsEnabled = false;
            }
            switch (select_index)
            {
                case 0:
                    for (int i = 0; i < All_btn.Length; i++)
                    {
                        All_btn[i].IsEnabled = true;
                    }
                    Debug.WriteLine("HEX");
                    break;
                case 1:
                    for (int i = 0; i < 10; i++)
                    {
                        All_btn[i].IsEnabled = true;
                    }
                    Debug.WriteLine("DEC");
                    break;
                case 2:
                    for (int i = 0; i < 8; i++)
                    {
                        All_btn[i].IsEnabled = true;
                    }
                    Debug.WriteLine("OCT");
                    break;
                case 3:
                    for (int i = 0; i < 2; i++)
                    {
                        All_btn[i].IsEnabled = true;
                    }
                    Debug.WriteLine("BIN");
                    break;
            }
            #endregion
            #region combobox 선택시 초기화
            nowstr = "";
            prevstr = "";
            viewstr = "";
            Limit_decimal_count = 0;
            hex = "0";
            dec = "0";
            oct = "0";
            bin = "0";
            txtResult.Text = "HEX : \r\nDEC : \r\nOCT : \r\nBIN : \r\n";
            #endregion
        }


        long Decimal_index;
        int Limit_decimal_count;
        private void Conversion_number(string s) // 숫자 변환
        {
            #region 조건별 변환 switch문
            switch (select_index) //조건별 숫자변환
            {
                case 0: // 16진수
                    if (select_btn == btn_delete)
                    {
                        viewstr = viewstr.Substring(0, viewstr.Length - 1);
                        if (viewstr == "")
                        {
                            viewstr = "0";
                        }
                    }
                    else
                    {
                        nowstr = s;
                        viewstr = prevstr + nowstr;
                    }
                    Decimal_index = Convert.ToInt64(viewstr, 16);                  
                    break;
                case 1://10진수
                    if(select_btn == btn_delete)
                    {
                        viewstr = viewstr.Substring(0, viewstr.Length - 1);
                        if (viewstr == "")
                        {
                            viewstr = "0";
                        }
                        Limit_decimal_count--;
                    }
                    else
                    {
                        if(Limit_decimal_count < 19)
                        {
                            nowstr = s;
                            viewstr = prevstr + nowstr;
                            Limit_decimal_count++;
                        }
                    }
                    if(Limit_decimal_count < 20)
                    {
                        Decimal_index = Convert.ToInt64(viewstr);                      
                    }
                    break;
                case 2://8진수
                    if (select_btn == btn_delete)
                    {
                        viewstr = viewstr.Substring(0, viewstr.Length - 1);
                        if (viewstr == "")
                        {
                            viewstr = "0";
                        }
                    }
                    else
                    {
                        nowstr = s;
                        viewstr = prevstr + nowstr;
                    }
                    Decimal_index = Convert.ToInt64(viewstr, 8);                  
                    break;
                case 3://2진수
                    if (select_btn == btn_delete)
                    {
                        viewstr = viewstr.Substring(0, viewstr.Length - 1);
                        if (viewstr == "")
                        {
                            viewstr = "0";
                        }
                    }
                    else
                    {
                        nowstr = s;
                        viewstr = prevstr + nowstr;
                    }
                    Decimal_index = Convert.ToInt64(viewstr, 2);                   
                    break;
            }
            #endregion

            hex = Convert.ToString(Decimal_index, 16);
            dec = Decimal_index.ToString();
            oct = Convert.ToString(Decimal_index, 8);
            bin = Convert.ToString(Decimal_index, 2);
            txtResult.Text = "HEX : "+hex+"\r\nDEC : "+dec+"\r\nOCT : "+oct+"\r\nBIN : "+bin;
            prevstr = viewstr;
            //txtResult.Text = num;
        }
       
    }
}
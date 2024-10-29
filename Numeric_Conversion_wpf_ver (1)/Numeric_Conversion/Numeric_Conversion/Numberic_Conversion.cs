using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Numeric_Conversion
{
    public partial class Numberic_Conversion : Form
    {
        public Numberic_Conversion()
        {
            InitializeComponent();
        }

        string nowstr = "";
        string prvstr = "";
        string viewstr = "";
        string HEX = "0";
        string DEC = "0";
        string OCT = "0";
        string BIN = "0";
        int Click_count;
        int select_combobox_index;
        long interger_i = 0;

        private void btn_Click(object sender, EventArgs e)
        {
            Button btn = (Button)sender;
            if(select_combobox_index ==0) //16진수일경우
            {
                if (btn.Text == "삭제") 
                {
                    viewstr = viewstr.Substring(0, viewstr.Length - 1);
                    if (viewstr == "")
                    {
                        viewstr = "0";
                    }
                }
                else
                {
                    nowstr = btn.Text;
                    viewstr = prvstr + nowstr;
                }
                HEX = viewstr;
                interger_i = Convert.ToInt64(viewstr, 16);
                DEC = interger_i.ToString();
                OCT = Convert.ToString(interger_i, 8);
                BIN = Convert.ToString(interger_i, 2);
                textBox1.Text = "HEX :  " + HEX + "\r\n" +
                    "DEC :  " + DEC + "\r\n" +
                    "OCT :  " + OCT + "\r\n" +
                    "BIN :  " + BIN + "\r\n";
                prvstr = viewstr;
            }
            else if (select_combobox_index == 1) // 10진수 일경우
            {
                if (btn.Text == "삭제")
                {
                    viewstr = viewstr.Substring(0, viewstr.Length - 1);
                    if (viewstr == "")
                    {
                        viewstr = "0";
                    }
                    Click_count--;
                }
                else
                {
                    if (Click_count < 19)
                    {
                        nowstr = btn.Text;
                        viewstr = prvstr + nowstr;
                        Click_count++; 
                        Debug.WriteLine(Click_count);
                    }
                }
                if (Click_count < 20)
                {
                    long num = Convert.ToInt64(viewstr);
                    HEX = Convert.ToString(num, 16);
                    DEC = num.ToString();
                    OCT = Convert.ToString(num, 8);
                    BIN = Convert.ToString(num, 2);
                    textBox1.Text = "HEX :  " + HEX + "\r\n" +
                        "DEC :  " + DEC + "\r\n" +
                        "OCT :  " + OCT + "\r\n" +
                        "BIN :  " + BIN + "\r\n";
                    prvstr = viewstr;
                }
            } 
            else if(select_combobox_index ==2) //8진수일 경우
            {
                if (btn.Text == "삭제")
                {
                    viewstr = viewstr.Substring(0, viewstr.Length - 1);
                    if (viewstr == "")
                    {
                        viewstr = "0";
                    }
                }
                else
                {
                    nowstr = btn.Text;
                    viewstr = prvstr + nowstr;
                }
                interger_i = Convert.ToInt64(viewstr,8);
                HEX = Convert.ToString(interger_i,16);
                DEC = interger_i.ToString();
                OCT = viewstr.ToString();
                BIN = Convert.ToString(interger_i, 2);
                textBox1.Text = "HEX :  " + HEX + "\r\n" +
                    "DEC :  " + DEC + "\r\n" +
                    "OCT :  " + OCT + "\r\n" +
                    "BIN :  " + BIN + "\r\n";
                prvstr = viewstr;
            }
            else //2진수 일경우
            {
                if (btn.Text == "삭제")
                {
                    viewstr = viewstr.Substring(0, viewstr.Length - 1);
                    if (viewstr == "")
                    {
                        viewstr = "0";
                    }
                }
                else
                {
                    nowstr = btn.Text;
                    viewstr = prvstr + nowstr;
                }
                interger_i = Convert.ToInt64(viewstr, 2);
                HEX = Convert.ToString(interger_i, 16);
                DEC = interger_i.ToString();
                OCT = Convert.ToString(interger_i, 8);
                BIN = viewstr.ToString();
                textBox1.Text = "HEX :  " + HEX + "\r\n" +
                    "DEC :  " + DEC + "\r\n" +
                    "OCT :  " + OCT + "\r\n" +
                    "BIN :  " + BIN + "\r\n";
                prvstr = viewstr;
            }
        }
        Button[] btn_array = new Button[16];
            

        private void comboBox1_SelectedIndexChanged(object sender, EventArgs e) //combobox 설정
        {
            #region 버튼 배열추가
            btn_array[0] = btn_0;
            btn_array[1] = btn_1;
            btn_array[2] = btn_2;
            btn_array[3] = btn_3;
            btn_array[4] = btn_4;
            btn_array[5] = btn_5;
            btn_array[6] = btn_6;
            btn_array[7] = btn_7;
            btn_array[8] = btn_8;
            btn_array[9] = btn_9;
            btn_array[10] = btn_a;
            btn_array[11] = btn_b;
            btn_array[12] = btn_c;
            btn_array[13] = btn_d;
            btn_array[14] = btn_e;
            btn_array[15] = btn_f;
            #endregion

            #region 선택시 정보값 초기화
            for (int i = 0; i < btn_array.Length; i++)
            {
                btn_array[i].Enabled = true;
            }
            select_combobox_index = combobox1.SelectedIndex;
            nowstr = "";
            prvstr = "";
            viewstr = "";
            Click_count = 0;
            HEX = "0";
            DEC = "0";
            OCT = "0";
            BIN = "0";
            textBox1.Text = "HEX :  " + HEX + "\r\n" +
                "DEC :  " + DEC + "\r\n" +
                "OCT :  " + OCT + "\r\n" +
                "BIN :  " + BIN + "\r\n";
            #endregion

            if (select_combobox_index == 0) // 16진수일경우 0~f버튼 활성화
            {
               for(int i=0; i<btn_array.Length; i++)
                {
                    btn_array[i].Enabled = true;
                }
            }
            else if(select_combobox_index == 1) // 10진수일경우 0~9버튼 활성화
            {
                for (int i = 10; i < btn_array.Length; i++)
                {
                    btn_array[i].Enabled = false;
                }
            }
            else if(select_combobox_index ==2) // 8진수일경우 0~7버튼 활성화
            {
                for (int i = 8; i < btn_array.Length; i++)
                {
                    btn_array[i].Enabled = false;
                }
            }
            else // 2진수일경우 0~1버튼 활성화
            {
                for (int i = 2; i < btn_array.Length; i++)
                {
                    btn_array[i].Enabled = false;
                }
            }
        }

    }
}

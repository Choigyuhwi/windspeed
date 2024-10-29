using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.IO.Ports; //시리얼 통신을 위해 추가
using System.Diagnostics; 

namespace Serial_Communication_sample
{
    public partial class serial_communication_main : Form
    {
        public serial_communication_main()
        {
            InitializeComponent();
            string[] Port_name = SerialPort.GetPortNames(); //사용가능한 포트이름 다 호출
            foreach(string port in Port_name)
            {
                Set_port_box.Items.Add(port);//combobox에 사용가능한 포트 다 추가
            }
            receive_type.Text = "ASCII";
            receive_type.SelectedIndex = 0;
        }

        private void btn_connet_Click(object sender, EventArgs e) //연결하기 버튼 실행
        {
            if (Set_port_box.Text != "" && bautrate.Text != "" && databit.Text != "" && parity.Text != "" && stopbit.Text != "")
            {
                if (!serialPort.IsOpen)
                {
                    serialPort.PortName = Set_port_box.Text; //선택한 COM포트를 serial포트로 지정
                    serialPort.BaudRate = int.Parse(bautrate.Text.ToString());//9600,1초에 보낼수 있는 symbol개수(8bit) -> 1초에 9600개  symbol가능

                    serialPort.DataBits = int.Parse(databit.Text.ToString());//8, 7or8 7인경우 127보다큰 ASCII값을 보낼수X, Hexa값을 보내기 위해는 8을 사용
                    serialPort.StopBits = (StopBits)int.Parse(stopbit.Text.ToString());//StopBits.One, 기본값은 1, 1or2사용
                    serialPort.Parity = (Parity)parity.SelectedIndex;//Parity.None, 비트 하나를 추가로 보내 데이터 오류 여부를 확인 -> 오류여부만 확인 가능
                    serialPort.DataReceived += new SerialDataReceivedEventHandler(serialPort_DataReceived);

                    Debug.WriteLine("boutrate: " + serialPort.BaudRate + " databit: " + serialPort.DataBits + "stopbit :" + serialPort.StopBits + " parity: " + serialPort.Parity);

                    serialPort.Open();

                    status_text_box.Text = "포트가 열렸습니다.";
                    Set_port_box.Enabled = false;
                    bautrate.Enabled = false;
                    databit.Enabled = false;
                    parity.Enabled = false;
                    stopbit.Enabled = false;
                }
                else
                {
                    status_text_box.Text = "포트가 이미 열려 있습니다";
                }
            }
            else
            {
                MessageBox.Show("모든값을 입력하여 주세요.");
            }
        }
        private void serialPort_DataReceived(object sender, SerialDataReceivedEventArgs e)  //수신 이벤트가 발생하면 이 부분이 실행
        {
            this.Invoke(new EventHandler(MyserialReceived));  //메인 쓰레드와 수신 쓰레드의 충돌 방지를 위해 Invoke 사용. MySerialReceived로 이동하여 추가 작업 실행
        }

        private void MyserialReceived(object s, EventArgs e) //수신데이터 읽기
        {
            int ReceiveData = serialPort.BytesToRead;//바이트 수를 읽어옴.
            byte[] b_tmp_buf = new byte[ReceiveData];//바이트형 배열을 만듬.
            string recv_str_asc = "";
            string recv_str_hex = "";
            serialPort.Read(b_tmp_buf, 0, ReceiveData); //serail포트의 데이터를 바이트수만큼 읽고 b_tmp_buf에 저장
            for(int i=0; i<ReceiveData; i++)
            {
                recv_str_hex += b_tmp_buf[i].ToString("X2")+" ";
                recv_str_asc += Convert.ToChar(b_tmp_buf[i]);
            }
            if (receive_type.SelectedIndex == 0)
            {
                //recv_str_asc = Encoding.Default.GetString(b_tmp_buf);//b_tmp_buf를 string형식으로 인코딩
                receive_box.Text = receive_box.Text + recv_str_asc + "\r\n";//인코딩한 string을 textbox에 출력
            }
            else
            {
                receive_box.Text = receive_box.Text + recv_str_hex + "\r\n";//인코딩한 string을 textbox에 출력
            }
           
            Debug.WriteLine(recv_str_hex+" , " + recv_str_asc);
        }

        private void btn_send_Click(object sender, EventArgs e) //보내기 버튼 실행
        {
            serialPort.Write(send_box.Text);
            send_box.Text = "";
        }

        private void btn_disconnect_Click(object sender, EventArgs e)//연결끊기 버튼 실행
        {
            if (serialPort.IsOpen)
            {
                serialPort.Close();
                status_text_box.Text = "포트가 닫혔습니다.";
                Set_port_box.Enabled = true;
                bautrate.Enabled = true;
                databit.Enabled = true;
                parity.Enabled = true;
                stopbit.Enabled = true;
            }
            else
            {
                status_text_box.Text = "포트가 이미 닫혀 있습니다";
            }
        }

        private void btn_delettext_Click(object sender, EventArgs e) //삭제버튼 실행
        {
            receive_box.Text = "";
        }
    }
}

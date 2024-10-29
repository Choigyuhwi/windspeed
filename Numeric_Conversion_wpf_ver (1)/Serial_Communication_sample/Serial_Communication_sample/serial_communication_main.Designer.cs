namespace Serial_Communication_sample
{
    partial class serial_communication_main
    {
        /// <summary>
        /// 필수 디자이너 변수입니다.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// 사용 중인 모든 리소스를 정리합니다.
        /// </summary>
        /// <param name="disposing">관리되는 리소스를 삭제해야 하면 true이고, 그렇지 않으면 false입니다.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form 디자이너에서 생성한 코드

        /// <summary>
        /// 디자이너 지원에 필요한 메서드입니다. 
        /// 이 메서드의 내용을 코드 편집기로 수정하지 마세요.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.Set_port_box = new System.Windows.Forms.ComboBox();
            this.btn_connet = new System.Windows.Forms.Button();
            this.btn_disconnect = new System.Windows.Forms.Button();
            this.status_text_box = new System.Windows.Forms.TextBox();
            this.receive_box = new System.Windows.Forms.TextBox();
            this.send_box = new System.Windows.Forms.TextBox();
            this.btn_send = new System.Windows.Forms.Button();
            this.serialPort = new System.IO.Ports.SerialPort(this.components);
            this.label1 = new System.Windows.Forms.Label();
            this.status_text = new System.Windows.Forms.Label();
            this.receiev_text = new System.Windows.Forms.Label();
            this.send_text = new System.Windows.Forms.Label();
            this.Baud_Rate = new System.Windows.Forms.Label();
            this.bautrate = new System.Windows.Forms.ComboBox();
            this.databit = new System.Windows.Forms.ComboBox();
            this.label2 = new System.Windows.Forms.Label();
            this.parity = new System.Windows.Forms.ComboBox();
            this.label3 = new System.Windows.Forms.Label();
            this.stopbit = new System.Windows.Forms.ComboBox();
            this.label4 = new System.Windows.Forms.Label();
            this.btn_delettext = new System.Windows.Forms.Button();
            this.receive_type = new System.Windows.Forms.ComboBox();
            this.SuspendLayout();
            // 
            // Set_port_box
            // 
            this.Set_port_box.BackColor = System.Drawing.SystemColors.Window;
            this.Set_port_box.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.Set_port_box.FormattingEnabled = true;
            this.Set_port_box.Location = new System.Drawing.Point(12, 60);
            this.Set_port_box.Name = "Set_port_box";
            this.Set_port_box.Size = new System.Drawing.Size(143, 20);
            this.Set_port_box.TabIndex = 0;
            // 
            // btn_connet
            // 
            this.btn_connet.Location = new System.Drawing.Point(12, 245);
            this.btn_connet.Name = "btn_connet";
            this.btn_connet.Size = new System.Drawing.Size(143, 34);
            this.btn_connet.TabIndex = 2;
            this.btn_connet.Text = "연결하기";
            this.btn_connet.UseVisualStyleBackColor = true;
            this.btn_connet.Click += new System.EventHandler(this.btn_connet_Click);
            // 
            // btn_disconnect
            // 
            this.btn_disconnect.Location = new System.Drawing.Point(12, 285);
            this.btn_disconnect.Name = "btn_disconnect";
            this.btn_disconnect.Size = new System.Drawing.Size(143, 34);
            this.btn_disconnect.TabIndex = 3;
            this.btn_disconnect.Text = "연결끊기";
            this.btn_disconnect.UseVisualStyleBackColor = true;
            this.btn_disconnect.Click += new System.EventHandler(this.btn_disconnect_Click);
            // 
            // status_text_box
            // 
            this.status_text_box.BackColor = System.Drawing.SystemColors.HighlightText;
            this.status_text_box.Location = new System.Drawing.Point(12, 362);
            this.status_text_box.Multiline = true;
            this.status_text_box.Name = "status_text_box";
            this.status_text_box.ReadOnly = true;
            this.status_text_box.ShortcutsEnabled = false;
            this.status_text_box.Size = new System.Drawing.Size(143, 55);
            this.status_text_box.TabIndex = 5;
            this.status_text_box.TabStop = false;
            // 
            // receive_box
            // 
            this.receive_box.BackColor = System.Drawing.SystemColors.HighlightText;
            this.receive_box.Cursor = System.Windows.Forms.Cursors.WaitCursor;
            this.receive_box.Location = new System.Drawing.Point(255, 60);
            this.receive_box.Multiline = true;
            this.receive_box.Name = "receive_box";
            this.receive_box.ReadOnly = true;
            this.receive_box.ScrollBars = System.Windows.Forms.ScrollBars.Vertical;
            this.receive_box.ShortcutsEnabled = false;
            this.receive_box.Size = new System.Drawing.Size(533, 165);
            this.receive_box.TabIndex = 7;
            this.receive_box.TabStop = false;
            this.receive_box.UseWaitCursor = true;
            // 
            // send_box
            // 
            this.send_box.Location = new System.Drawing.Point(255, 300);
            this.send_box.Multiline = true;
            this.send_box.Name = "send_box";
            this.send_box.Size = new System.Drawing.Size(533, 77);
            this.send_box.TabIndex = 9;
            // 
            // btn_send
            // 
            this.btn_send.Location = new System.Drawing.Point(667, 383);
            this.btn_send.Name = "btn_send";
            this.btn_send.Size = new System.Drawing.Size(121, 34);
            this.btn_send.TabIndex = 10;
            this.btn_send.Text = "보내기";
            this.btn_send.UseVisualStyleBackColor = true;
            this.btn_send.Click += new System.EventHandler(this.btn_send_Click);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(10, 45);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(86, 12);
            this.label1.TabIndex = 11;
            this.label1.Text = "COM포트 설정";
            // 
            // status_text
            // 
            this.status_text.AutoSize = true;
            this.status_text.Location = new System.Drawing.Point(10, 347);
            this.status_text.Name = "status_text";
            this.status_text.Size = new System.Drawing.Size(53, 12);
            this.status_text.TabIndex = 12;
            this.status_text.Text = "연결상태";
            // 
            // receiev_text
            // 
            this.receiev_text.AutoSize = true;
            this.receiev_text.Location = new System.Drawing.Point(253, 45);
            this.receiev_text.Name = "receiev_text";
            this.receiev_text.Size = new System.Drawing.Size(29, 12);
            this.receiev_text.TabIndex = 13;
            this.receiev_text.Text = "수신";
            // 
            // send_text
            // 
            this.send_text.AutoSize = true;
            this.send_text.Location = new System.Drawing.Point(253, 285);
            this.send_text.Name = "send_text";
            this.send_text.Size = new System.Drawing.Size(29, 12);
            this.send_text.TabIndex = 14;
            this.send_text.Text = "발신";
            // 
            // Baud_Rate
            // 
            this.Baud_Rate.AutoSize = true;
            this.Baud_Rate.Location = new System.Drawing.Point(10, 84);
            this.Baud_Rate.Name = "Baud_Rate";
            this.Baud_Rate.Size = new System.Drawing.Size(63, 12);
            this.Baud_Rate.TabIndex = 15;
            this.Baud_Rate.Text = "Baud Rate";
            // 
            // bautrate
            // 
            this.bautrate.Cursor = System.Windows.Forms.Cursors.Default;
            this.bautrate.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.bautrate.FormattingEnabled = true;
            this.bautrate.Items.AddRange(new object[] {
            "9600",
            "19200",
            "38400",
            "57600",
            "115200"});
            this.bautrate.Location = new System.Drawing.Point(12, 99);
            this.bautrate.Name = "bautrate";
            this.bautrate.Size = new System.Drawing.Size(143, 20);
            this.bautrate.TabIndex = 16;
            // 
            // databit
            // 
            this.databit.Cursor = System.Windows.Forms.Cursors.Default;
            this.databit.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.databit.FormattingEnabled = true;
            this.databit.Items.AddRange(new object[] {
            "7",
            "8"});
            this.databit.Location = new System.Drawing.Point(12, 139);
            this.databit.Name = "databit";
            this.databit.Size = new System.Drawing.Size(143, 20);
            this.databit.TabIndex = 18;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(10, 124);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(48, 12);
            this.label2.TabIndex = 17;
            this.label2.Text = "Data Bit";
            // 
            // parity
            // 
            this.parity.Cursor = System.Windows.Forms.Cursors.Default;
            this.parity.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.parity.FormattingEnabled = true;
            this.parity.Items.AddRange(new object[] {
            "None",
            "Odd",
            "Even"});
            this.parity.Location = new System.Drawing.Point(12, 179);
            this.parity.Name = "parity";
            this.parity.Size = new System.Drawing.Size(143, 20);
            this.parity.TabIndex = 20;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(10, 164);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(37, 12);
            this.label3.TabIndex = 19;
            this.label3.Text = "Parity";
            // 
            // stopbit
            // 
            this.stopbit.Cursor = System.Windows.Forms.Cursors.Default;
            this.stopbit.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.stopbit.FormattingEnabled = true;
            this.stopbit.Items.AddRange(new object[] {
            "1",
            "2"});
            this.stopbit.Location = new System.Drawing.Point(12, 219);
            this.stopbit.Name = "stopbit";
            this.stopbit.Size = new System.Drawing.Size(143, 20);
            this.stopbit.TabIndex = 22;
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(10, 204);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(48, 12);
            this.label4.TabIndex = 21;
            this.label4.Text = "Stop Bit";
            // 
            // btn_delettext
            // 
            this.btn_delettext.Location = new System.Drawing.Point(667, 231);
            this.btn_delettext.Name = "btn_delettext";
            this.btn_delettext.Size = new System.Drawing.Size(121, 34);
            this.btn_delettext.TabIndex = 23;
            this.btn_delettext.Text = "삭제";
            this.btn_delettext.UseVisualStyleBackColor = true;
            this.btn_delettext.Click += new System.EventHandler(this.btn_delettext_Click);
            // 
            // receive_type
            // 
            this.receive_type.BackColor = System.Drawing.SystemColors.Window;
            this.receive_type.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.receive_type.FormattingEnabled = true;
            this.receive_type.Items.AddRange(new object[] {
            "ASCII",
            "HEX"});
            this.receive_type.Location = new System.Drawing.Point(587, 231);
            this.receive_type.Name = "receive_type";
            this.receive_type.Size = new System.Drawing.Size(74, 20);
            this.receive_type.TabIndex = 24;
            // 
            // serial_communication_main
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.SystemColors.ActiveBorder;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.receive_type);
            this.Controls.Add(this.btn_delettext);
            this.Controls.Add(this.stopbit);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.parity);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.databit);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.bautrate);
            this.Controls.Add(this.Baud_Rate);
            this.Controls.Add(this.send_text);
            this.Controls.Add(this.receiev_text);
            this.Controls.Add(this.status_text);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.btn_send);
            this.Controls.Add(this.send_box);
            this.Controls.Add(this.receive_box);
            this.Controls.Add(this.status_text_box);
            this.Controls.Add(this.btn_disconnect);
            this.Controls.Add(this.btn_connet);
            this.Controls.Add(this.Set_port_box);
            this.Name = "serial_communication_main";
            this.Text = "Serial_communication";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.ComboBox Set_port_box;
        private System.Windows.Forms.Button btn_connet;
        private System.Windows.Forms.Button btn_disconnect;
        private System.Windows.Forms.TextBox status_text_box;
        private System.Windows.Forms.TextBox receive_box;
        private System.Windows.Forms.TextBox send_box;
        private System.IO.Ports.SerialPort serialPort;
        private System.Windows.Forms.Button btn_send;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label status_text;
        private System.Windows.Forms.Label receiev_text;
        private System.Windows.Forms.Label send_text;
        private System.Windows.Forms.Label Baud_Rate;
        private System.Windows.Forms.ComboBox bautrate;
        private System.Windows.Forms.ComboBox databit;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.ComboBox parity;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.ComboBox stopbit;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Button btn_delettext;
        private System.Windows.Forms.ComboBox receive_type;
    }
}


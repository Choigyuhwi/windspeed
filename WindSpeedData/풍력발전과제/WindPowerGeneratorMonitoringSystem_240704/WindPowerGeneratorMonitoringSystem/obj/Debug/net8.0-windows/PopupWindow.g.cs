﻿#pragma checksum "..\..\..\PopupWindow.xaml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "5CBB9B4A8DD111DEBAFDEABC14164817BB82B991"
//------------------------------------------------------------------------------
// <auto-generated>
//     이 코드는 도구를 사용하여 생성되었습니다.
//     런타임 버전:4.0.30319.42000
//
//     파일 내용을 변경하면 잘못된 동작이 발생할 수 있으며, 코드를 다시 생성하면
//     이러한 변경 내용이 손실됩니다.
// </auto-generated>
//------------------------------------------------------------------------------

using System;
using System.Diagnostics;
using System.Windows;
using System.Windows.Automation;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Controls.Ribbon;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Markup;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Media.Effects;
using System.Windows.Media.Imaging;
using System.Windows.Media.Media3D;
using System.Windows.Media.TextFormatting;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Windows.Shell;
using WindPowerGeneratorMonitoringSystem;


namespace WindPowerGeneratorMonitoringSystem {
    
    
    /// <summary>
    /// PopupWindow
    /// </summary>
    public partial class PopupWindow : System.Windows.Window, System.Windows.Markup.IComponentConnector {
        
        
        #line 22 "..\..\..\PopupWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.TextBox TextboxCompanyName;
        
        #line default
        #line hidden
        
        
        #line 24 "..\..\..\PopupWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.TextBox TextboxProductId;
        
        #line default
        #line hidden
        
        
        #line 26 "..\..\..\PopupWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.TextBox TextboxModemId;
        
        #line default
        #line hidden
        
        
        #line 28 "..\..\..\PopupWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Button BtnSave;
        
        #line default
        #line hidden
        
        
        #line 29 "..\..\..\PopupWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Button BtnModify;
        
        #line default
        #line hidden
        
        
        #line 30 "..\..\..\PopupWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Button BtnCancle;
        
        #line default
        #line hidden
        
        private bool _contentLoaded;
        
        /// <summary>
        /// InitializeComponent
        /// </summary>
        [System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [System.CodeDom.Compiler.GeneratedCodeAttribute("PresentationBuildTasks", "8.0.5.0")]
        public void InitializeComponent() {
            if (_contentLoaded) {
                return;
            }
            _contentLoaded = true;
            System.Uri resourceLocater = new System.Uri("/WindPowerGeneratorMonitoringSystem;component/popupwindow.xaml", System.UriKind.Relative);
            
            #line 1 "..\..\..\PopupWindow.xaml"
            System.Windows.Application.LoadComponent(this, resourceLocater);
            
            #line default
            #line hidden
        }
        
        [System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [System.CodeDom.Compiler.GeneratedCodeAttribute("PresentationBuildTasks", "8.0.5.0")]
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Never)]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Design", "CA1033:InterfaceMethodsShouldBeCallableByChildTypes")]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Maintainability", "CA1502:AvoidExcessiveComplexity")]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1800:DoNotCastUnnecessarily")]
        void System.Windows.Markup.IComponentConnector.Connect(int connectionId, object target) {
            switch (connectionId)
            {
            case 1:
            this.TextboxCompanyName = ((System.Windows.Controls.TextBox)(target));
            return;
            case 2:
            this.TextboxProductId = ((System.Windows.Controls.TextBox)(target));
            return;
            case 3:
            this.TextboxModemId = ((System.Windows.Controls.TextBox)(target));
            return;
            case 4:
            this.BtnSave = ((System.Windows.Controls.Button)(target));
            
            #line 28 "..\..\..\PopupWindow.xaml"
            this.BtnSave.Click += new System.Windows.RoutedEventHandler(this.ClickBtn_Save);
            
            #line default
            #line hidden
            return;
            case 5:
            this.BtnModify = ((System.Windows.Controls.Button)(target));
            
            #line 29 "..\..\..\PopupWindow.xaml"
            this.BtnModify.Click += new System.Windows.RoutedEventHandler(this.ClickBtn_Modify);
            
            #line default
            #line hidden
            return;
            case 6:
            this.BtnCancle = ((System.Windows.Controls.Button)(target));
            
            #line 30 "..\..\..\PopupWindow.xaml"
            this.BtnCancle.Click += new System.Windows.RoutedEventHandler(this.ClickBtn_Cancle);
            
            #line default
            #line hidden
            return;
            }
            this._contentLoaded = true;
        }
    }
}


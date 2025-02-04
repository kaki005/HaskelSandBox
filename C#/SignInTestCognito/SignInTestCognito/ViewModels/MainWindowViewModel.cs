using Livet;
using Livet.Commands;
using Livet.EventListeners;
using Livet.Messaging;
using Livet.Messaging.IO;
using Livet.Messaging.Windows;
using SignInTestCognito.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Diagnostics;
using System.Text.Json;
using Newtonsoft.Json;
using System.Net.Http;
using System.Text;

namespace SignInTestCognito.ViewModels
{
    public class MainWindowViewModel : ViewModel
    {
        public string PassWord
        {
            get => _passWord;
            set => RaisePropertyChangedIfSet(ref _passWord, value);
        }
        private string _passWord;
        public string UserName
        {
            get => _userName;
            set => RaisePropertyChangedIfSet(ref _userName, value);
        }
        private string _userName;
        public string EMail
        {
            get => _email;
            set => RaisePropertyChangedIfSet(ref _email, value);
        }
        private string _email;
        public int UserID
        {
            get => _userID;
            set => RaisePropertyChangedIfSet(ref _userID, value);
        }
        private int _userID;

        // Some useful code snippets for ViewModel are defined as l*(llcom, llcomn, lvcomm, lsprop, etc...).
        public void Initialize()
        {
        }


        // -------------------------------------------------------------------------------
        #region +ExecuteCommand：サンプル実行コマンド
        // -------------------------------------------------------------------------------
        /// <summary> Executeコマンドを実行します。 </summary>
        public async void Execute()
        {
            //var vm = new ChildWindowViewModel();
            //ShowDialogWindow(typeof(ChildWindow),vm);
            var client = new HttpClient();
            const string SIGNIN_URL = "https://ugehicj7t6.execute-api.ap-northeast-1.amazonaws.com/test";
            string token = "";
            var parameterUrl = $"{SIGNIN_URL}/?UserName={UserName}&PassWord={PassWord}";
            Debug.WriteLine(parameterUrl);
            try
            {
                var request = new HttpRequestMessage(HttpMethod.Get, parameterUrl);  // リクエストを送信
                var response = await client.SendAsync(request); // リクエストを送信
                response.EnsureSuccessStatusCode();             // 成功したかチェック
                var jsonStr  = await response.Content.ReadAsStringAsync();   // 成功したら本文を取り出す
                var lambda = JsonConvert.DeserializeObject<LambdaResponse>(jsonStr);
                token = lambda.Body;
                Debug.WriteLine(token);
            }
            catch (HttpRequestException ex)
            {
                Debug.WriteLine("\nException Caught!");
                Debug.WriteLine("Message :{0} ", ex.Message);
                return;
            }
            const string URL = "https://3u3afr1co2.execute-api.ap-northeast-1.amazonaws.com/test/";
            parameterUrl = $"{URL}?Name={"aiue"}&UserID={UserID}";
            try
            {
                var request = new HttpRequestMessage(HttpMethod.Get, parameterUrl);  // リクエストを送信
                request.Headers.Add("Authorization", token);    // ヘッダにアクセストークン追加
                var response = await client.SendAsync(request); // リクエストを送信
                response.EnsureSuccessStatusCode();             // 成功したかチェック
                string responseBody = await response.Content.ReadAsStringAsync();   // 成功したら本文を取り出す
                Debug.WriteLine(responseBody);                  // ログに表示
            }
            catch (HttpRequestException ex)
            {
                Debug.WriteLine("\nException Caught!");
                Debug.WriteLine("Message :{0} ", ex.Message);
            }
        }
        public ViewModelCommand ExecuteCommand => _executeCommand ?? (_executeCommand = new ViewModelCommand(Execute));
        private ViewModelCommand _executeCommand;
        #endregion (ExecuteCommand：サンプル実行コマンド)


        // ===================================================================================
        #region LambdaResponse：Lambda関数の返答クラス
        // ===================================================================================
        /// <summary>
        /// Lambda関数が戻り値として使用するクラスです。
        /// 実際にはJsonにシリアライズされて返されます。
        /// </summary>
        public class LambdaResponse
        {
            // ===============================================================================
            #region プロパティ
            // ===============================================================================
            /// <summary>Base64エンコードが行われているか</summary>
            [JsonProperty(PropertyName = "isBase64Encoded")]
            public bool IsBase64Encoded;

            /// <summary>HTTPのステータスコード</summary>
            [JsonProperty(PropertyName = "statusCode")]
            public int StatusCode;
            /// <summary>HTTPのヘッダ情報</summary>
            [JsonProperty(PropertyName = "headers")]
            public Dictionary<string, string> Headers;
            /// <summary>本体メッセージ</summary>
            [JsonProperty(PropertyName = "body")]
            public string Body;
            #endregion (プロパティ)
        }
        #endregion (LambdaResponseクラス)
    }
}

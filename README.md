# Expense Tracker
![image]()

## 功能描述
1. 使用者可以使用名字、email、密碼、確認密碼註冊再登入
2. 使用者可以使用facebook、google註冊並直接登入
3. 使用者必須登入才能使用記帳功能
4. 使用者登入後可以在首頁查看所有紀錄，包括：分類、費用名目、日期、費用
5. 使用者登入後可以依照類別尋找花費
6. 使用者可點擊
8. 使用者登入後點擊Edit編輯一家餐廳資料
9. 使用者登入後點擊Delete刪除一家餐廳
10. 使用者登入後可以使用排序功能排序瀏覽與搜尋資料的名字與ranking順序

## 軟體及模組版本
```
   "bcryptjs": "^2.4.3",
    "body-parser": "^1.20.0",
    "connect-flash": "^0.1.1",
    "dotenv": "^16.0.1",
    "express": "^4.18.1",
    "express-handlebars": "^6.0.6",
    "express-session": "^1.17.3",
    "method-override": "^3.0.0",
    "moment": "^2.29.3",
    "mongoose": "^6.4.0",
    "passport": "^0.4.1",
    "passport-facebook": "^3.0.0",
    "passport-google-oauth20": "^2.0.0",
    "passport-local": "^1.0.0"
```
## 安裝與下載
- 安裝nvm

- 下載至本地指定資料夾
```
git clone https://github.com/cincinfish/restaurantList
```
- 開啟終端機(Terminal)，進入專案資料
```
cd ../restaurantList
```
- 安裝所有相關套件
```
npm install
```
- 環境變數
 修改.env.example檔案，移除.example

- 匯入種子檔案
```
- npm run seed
```
- 輸入nodemon 指令值星執行
```
nodemon app.js
```
- 終端繫內出現下列訊息表示成功
```
Express is listening on localhost:3000
```
- 打開瀏覽器輸入下列網址即可查看專案
```
http://localhost:3000
```
## 測試帳號
user1
```
email: user1@example.com
password: 12345678
```
user2
```
email: user2@example.com
password: 12345678
```

# Chatapp_Client
## Demo Live
* Live App tại [Surge](http://chat-app-client.surge.sh/)
* Live Api tại [Heroku](https://chap-app-server.herokuapp.com/)
## Link Client
[ChatAppServer](https://github.com/duongvanthien2209/Chatapp_Server)
## Các chức năng chính
### Auth
***
* Đăng ký tài khoản (Bằng email)
* Đăng nhập
### Thông tin người dùng
***
* Thay đổi thông tin người dùng
* Thay đổi mật khẩu
* Thay đổi ảnh đại diện
* Thay đổi email
### Quảng lý phòng
***
* Tạo phòng
* Tìm kiếm phòng sẵn có
* Tham gia vào phòng
### Chat nhóm
***
* Tham gia phòng chat và chat online với mọi người trong phòng
### Thông báo
***
* Thông báo đăng nhập, thông báo lỗi khi đăng nhập có lỗi
* Thông báo đăng ký, hoặc có lỗi đăng ký
* Thông báo khi cập nhật thông tin thành công, hoặc có lỗi trong quá trình cập nhật
* Thông báo khi tạo phòng thành công
## Cài đặt cho client
### Install client dependencies
***
`npm install`
### Run React in client
***
`npm start`
### Build for production
*** 
`npm run build`
### Depploy App using Surge
***
#### Cài package Surge ở global
`npm i -g surge`
#### Chuyển tới thư mục build
`cd build`
#### Chạy câu lệnh
> `surge`
* Ở lần chạy đầu tiên bạn cần phải nhập email và password để tạo tài khoản
* Bạn có thể thay đổi domain bằng cách
> `domain: <project-name>.surge.sh` 
## Thông tin
### Author
***
Van Thien

# Redis là gì

Redis là 1 cơ sở dũ liệu <No SQL>
Dữ liệu của nó thì được lưu ở memory => Tốc độ xử lý rất nhanh
vì bình thường các csdl khác sẽ đọc từ disk sau đó mới đẩy vào cache ram
và thường thì được sử dụng cho khoá phân tán

# 2 Tính chất chính của redis

- Hiệu năng cao : Dữ liệu được lưu trong bộ nhớ, giúp giảm thời gian truy xuất so với việc đọc từ đĩa cứng.
  Redis hỗ trợ nhiều cấu trúc dữ liệu khác nhau như chuỗi, danh sách, tập hợp, bản đồ băm, và nhiều loại khác, giúp tối ưu hóa hiệu năng cho nhiều loại bài toán khác nhau.

- Tính đồng thời cao : Redis xử lý các yêu cầu trực tiếp từ bộ nhớ đệm, cho phép hiệu suất truy cập cao hơn nhiều so với việc truy cập trực tiếp từ cơ sở dữ liệu lưu trữ trên đĩa.
  Điều này giúp Redis chịu tải rất tốt trong môi trường có nhiều người dùng truy cập đồng thời, thích hợp để sử dụng làm bộ nhớ đệm cho một phần cơ sở dữ liệu.
  Chính vì những đặc điểm này, Redis thường được sử dụng để lưu trữ dữ liệu tạm thời, như các phiên làm việc (sessions), bộ nhớ đệm (cache), hoặc hàng đợi thông điệp (message queues).

# Hệ cơ sở dữ liệu phân tán

Hệ cơ sở dữ liệu phân tán được sử dụng để giảm thiểu xung đột dữ liệu và đảm bảo tính nhất quán khi có nhiều người dùng truy cập đồng thời vào cơ sở dữ liệu.

# Khoá bi quan (Pessimistic Locking)

Khóa bi quan được sử dụng trong các hệ thống nơi xung đột dữ liệu xảy ra thường xuyên. Cách hoạt động của nó là khi một người dùng muốn can thiệp vào cơ sở dữ liệu, hệ thống sẽ khóa lại (lock) tài nguyên đó cho đến khi giao dịch hiện tại hoàn tất. Các người dùng khác sẽ phải chờ đến khi khóa được giải phóng.

Nhược điểm: Có thể gây khó chịu cho người dùng vì họ phải chờ đợi khi tài nguyên bị khóa.

# Khoá lạc quan (Optimistic Locking)

Khóa lạc quan được sử dụng trong các hệ thống nơi xung đột dữ liệu ít xảy ra. Trong mô hình này, người dùng có thể đọc dữ liệu mà không cần khóa. Khi họ muốn cập nhật dữ liệu, hệ thống sẽ kiểm tra xem dữ liệu có bị thay đổi bởi giao dịch khác trong thời gian đó hay không. Nếu có xung đột, giao dịch sẽ bị từ chối và người dùng sẽ phải thử lại.

Ưu điểm: Cho phép nhiều người dùng truy cập đồng thời vào cơ sở dữ liệu mà không phải chờ đợi.
Nhược điểm: Có thể gặp vấn đề về bảo mật và dữ liệu nếu không được xử lý đúng cách, và cần cơ chế xử lý xung đột.

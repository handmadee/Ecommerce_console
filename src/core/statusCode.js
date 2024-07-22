module.exports = {
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7231#section-6.2.1
     *
     * Phản hồi tạm thời này cho biết mọi thứ cho đến thời điểm này đều OK và client nên tiếp tục với yêu cầu hoặc bỏ qua nếu yêu cầu đã hoàn tất.
     */
    CONTINUE: 100,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7231#section-6.2.2
     *
     * Mã này được gửi để đáp lại tiêu đề yêu cầu Upgrade của client, và chỉ ra giao thức mà server đang chuyển đổi sang.
     */
    SWITCHING_PROTOCOLS: 101,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc2518#section-10.1
     *
     * Mã này chỉ ra rằng server đã nhận và đang xử lý yêu cầu, nhưng chưa có phản hồi nào có sẵn.
     */
    PROCESSING: 102,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7231#section-6.3.1
     *
     * Yêu cầu đã thành công. Ý nghĩa của một thành công thay đổi tùy thuộc vào phương thức HTTP:
     * GET: Tài nguyên đã được lấy và được truyền trong thân thông điệp.
     * HEAD: Các tiêu đề thực thể có trong thân thông điệp.
     * POST: Tài nguyên mô tả kết quả của hành động được truyền trong thân thông điệp.
     * TRACE: Thân thông điệp chứa thông điệp yêu cầu như nhận bởi server.
     */
    OK: 200,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7231#section-6.3.2
     *
     * Yêu cầu đã thành công và một tài nguyên mới đã được tạo ra như kết quả của nó. Đây thường là phản hồi được gửi sau một yêu cầu PUT.
     */
    CREATED: 201,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7231#section-6.3.3
     *
     * Yêu cầu đã được nhận nhưng chưa được hành động. Nó không cam kết, có nghĩa là không có cách nào trong HTTP để sau đó gửi một phản hồi không đồng bộ chỉ ra kết quả của việc xử lý yêu cầu. Nó nhằm cho các trường hợp nơi quá trình hoặc server khác xử lý yêu cầu, hoặc cho xử lý hàng loạt.
     */
    ACCEPTED: 202,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7231#section-6.3.4
     *
     * Mã phản hồi này có nghĩa là tập hợp thông tin meta trả về không phải là tập hợp chính xác như có sẵn từ server gốc, mà được thu thập từ bản sao cục bộ hoặc bên thứ ba. Trừ trường hợp này, phản hồi 200 OK nên được ưa thích thay vì phản hồi này.
     */
    NON_AUTHORITATIVE_INFORMATION: 203,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7231#section-6.3.5
     *
     * Không có nội dung nào để gửi cho yêu cầu này, nhưng các tiêu đề có thể hữu ích. User-agent có thể cập nhật các tiêu đề được lưu trong bộ đệm cho tài nguyên này với các tiêu đề mới.
     */
    NO_CONTENT: 204,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7231#section-6.3.6
     *
     * Mã phản hồi này được gửi sau khi hoàn thành yêu cầu để yêu cầu user agent đặt lại chế độ xem tài liệu đã gửi yêu cầu này.
     */
    RESET_CONTENT: 205,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7233#section-4.1
     *
     * Mã phản hồi này được sử dụng vì tiêu đề phạm vi được gửi bởi client để tách tải xuống thành nhiều luồng.
     */
    PARTIAL_CONTENT: 206,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc2518#section-10.2
     *
     * Phản hồi Multi-Status truyền tải thông tin về nhiều tài nguyên trong các tình huống mà nhiều mã trạng thái có thể phù hợp.
     */
    MULTI_STATUS: 207,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7231#section-6.4.1
     *
     * Yêu cầu có nhiều hơn một phản hồi khả dĩ. User-agent hoặc người dùng nên chọn một trong số chúng. Không có cách chuẩn hóa nào để chọn một trong các phản hồi.
     */
    MULTIPLE_CHOICES: 300,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7231#section-6.4.2
     *
     * Mã phản hồi này có nghĩa là URI của tài nguyên được yêu cầu đã bị thay đổi. Có thể, URI mới sẽ được cung cấp trong phản hồi.
     */
    MOVED_PERMANENTLY: 301,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7231#section-6.4.3
     *
     * Mã phản hồi này có nghĩa là URI của tài nguyên được yêu cầu đã bị thay đổi tạm thời. Các thay đổi mới trong URI có thể được thực hiện trong tương lai. Do đó, URI này nên được sử dụng bởi client trong các yêu cầu tương lai.
     */
    MOVED_TEMPORARILY: 302,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7231#section-6.4.4
     *
     * Server gửi phản hồi này để chỉ dẫn client nhận tài nguyên được yêu cầu tại một URI khác với một yêu cầu GET.
     */
    SEE_OTHER: 303,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7232#section-4.1
     *
     * Điều này được sử dụng cho mục đích lưu trữ. Nó cho client biết rằng phản hồi không bị thay đổi. Vì vậy, client có thể tiếp tục sử dụng phiên bản được lưu trong bộ đệm của phản hồi.
     */
    NOT_MODIFIED: 304,
    /**
     * @deprecated
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7231#section-6.4.6
     *
     * Được định nghĩa trong một phiên bản trước của đặc tả HTTP để chỉ ra rằng một phản hồi yêu cầu phải được truy cập bởi một proxy. Nó đã bị loại bỏ do lo ngại về bảo mật liên quan đến cấu hình proxy trong dải.
     */
    USE_PROXY: 305,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7231#section-6.4.7
     *
     * Server gửi phản hồi này để chỉ dẫn client nhận tài nguyên được yêu cầu tại một URI khác với cùng phương thức được sử dụng trong yêu cầu trước. Điều này có cùng ngữ nghĩa với mã phản hồi HTTP 302 Found, ngoại trừ việc user agent không được thay đổi phương thức HTTP được sử dụng: nếu một POST đã được sử dụng trong yêu cầu đầu tiên, một POST phải được sử dụng trong yêu cầu thứ hai.
     */
    TEMPORARY_REDIRECT: 307,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7538#section-3
     *
     * Điều này có nghĩa là tài nguyên hiện đã được định vị vĩnh viễn tại một URI khác, được chỉ định bởi tiêu đề Location: HTTP Response. Điều này có cùng ngữ nghĩa như mã phản hồi HTTP 301 Moved Permanently, ngoại trừ việc user agent không được thay đổi phương thức HTTP được sử dụng: nếu một POST đã được sử dụng trong yêu cầu đầu tiên, một POST phải được sử dụng trong yêu cầu thứ hai.
     */
    PERMANENT_REDIRECT: 308,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7231#section-6.5.1
     *
     * Phản hồi này có nghĩa là server không thể hiểu yêu cầu do cú pháp không hợp lệ.
     */
    BAD_REQUEST: 400,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7235#section-3.1
     *
     * Mặc dù tiêu chuẩn HTTP chỉ định "unauthorized" (không được phép), ngữ nghĩa của phản hồi này là "unauthenticated" (chưa xác thực). Nghĩa là, client phải xác thực bản thân để nhận được phản hồi được yêu cầu.
     */
    UNAUTHORIZED: 401,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7231#section-6.5.2
     *
     * Mã phản hồi này được dự trữ cho việc sử dụng trong tương lai. Mục đích ban đầu của việc tạo ra mã này là sử dụng cho các hệ thống thanh toán kỹ thuật số, tuy nhiên hiện tại nó không được sử dụng.
     */
    PAYMENT_REQUIRED: 402,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7231#section-6.5.3
     *
     * Client không có quyền truy cập vào nội dung; tức là, nó không được phép, do tài khoản không đủ hoặc bị từ chối.
     */
    FORBIDDEN: 403,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7231#section-6.5.4
     *
     * Server không thể tìm thấy tài nguyên được yêu cầu. Điều này có thể là do URL không chính xác hoặc tài nguyên không tồn tại. Không có sự khác biệt nào giữa mã trạng thái này và mã 410 Gone.
     */
    NOT_FOUND: 404,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7231#section-6.5.5
     *
     * Phương thức yêu cầu không được hỗ trợ bởi server và không thể được xử lý. Các phương thức được biết đến bởi server là GET và HEAD nhưng không có yêu cầu nào cho POST hoặc phương thức nào khác.
     */
    METHOD_NOT_ALLOWED: 405,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7231#section-6.5.6
     *
     * Phản hồi này được gửi khi tiêu đề của yêu cầu không có khả năng thỏa mãn server.
     */
    NOT_ACCEPTABLE: 406,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7235#section-3.2
     *
     * Đây là mã phản hồi được sử dụng khi client phải xác thực bản thân để truy cập tài nguyên. Các client như trình duyệt có thể sử dụng thông tin này để tự động điền thông tin xác thực.
     */
    PROXY_AUTHENTICATION_REQUIRED: 407,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7231#section-6.5.7
     *
     * Mã phản hồi này được gửi bởi server khi nó không nhận được phản hồi kịp thời từ phía client. Điều này có thể xảy ra khi kết nối mạng quá chậm hoặc mất kết nối.
     */
    REQUEST_TIMEOUT: 408,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7231#section-6.5.8
     *
     * Mã phản hồi này có nghĩa là xung đột xảy ra trên server khi xử lý yêu cầu. Điều này thường xảy ra khi các yêu cầu đồng thời cố gắng thay đổi tài nguyên cùng một lúc.
     */
    CONFLICT: 409,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7231#section-6.5.9
     *
     * Mã phản hồi này có nghĩa là tài nguyên được yêu cầu không còn tồn tại trên server và không có địa chỉ chuyển tiếp nào được cung cấp. Điều này có thể là do tài nguyên đã bị xóa vĩnh viễn.
     */
    GONE: 410,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7231#section-6.5.10
     *
     * Mã phản hồi này được gửi khi server yêu cầu một điều kiện tiên quyết không thỏa mãn trong yêu cầu của client.
     */
    LENGTH_REQUIRED: 411,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7232#section-4.2
     *
     * Mã phản hồi này cho biết điều kiện tiên quyết của yêu cầu không được thỏa mãn. Điều này có thể xảy ra khi điều kiện `If-Match` hoặc `If-Unmodified-Since` không khớp.
     */
    PRECONDITION_FAILED: 412,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7231#section-6.5.11
     *
     * Mã phản hồi này được gửi khi yêu cầu của client quá lớn để server có thể xử lý.
     */
    PAYLOAD_TOO_LARGE: 413,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7231#section-6.5.12
     *
     * Mã phản hồi này được gửi khi URI được cung cấp trong yêu cầu của client quá dài để server có thể xử lý.
     */
    URI_TOO_LONG: 414,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7231#section-6.5.13
     *
     * Mã phản hồi này được gửi khi server không hỗ trợ định dạng truyền dữ liệu của yêu cầu.
     */
    UNSUPPORTED_MEDIA_TYPE: 415,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7233#section-4.4
     *
     * Mã phản hồi này được gửi khi phạm vi của yêu cầu không thỏa mãn yêu cầu của server. Điều này có thể xảy ra khi phạm vi không nằm trong giới hạn của tài nguyên được yêu cầu.
     */
    RANGE_NOT_SATISFIABLE: 416,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7231#section-6.5.14
     *
     * Mã phản hồi này được gửi khi điều kiện tiên quyết của yêu cầu không được thỏa mãn. Điều này có thể xảy ra khi điều kiện `If-Range` không khớp.
     */
    EXPECTATION_FAILED: 417,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc4918#section-11.2
     *
     * Mã phản hồi này cho biết rằng server không thể xử lý yêu cầu vì nó bị khóa.
     */
    LOCKED: 423,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc4918#section-11.5
     *
     * Mã phản hồi này cho biết rằng server không thể thực hiện yêu cầu do điều kiện thất bại.
     */
    FAILED_DEPENDENCY: 424,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc6585#section-3
     *
     * Mã phản hồi này cho biết rằng yêu cầu không tuân thủ chính sách server. Điều này có thể xảy ra khi yêu cầu vượt quá giới hạn tỷ lệ.
     */
    TOO_EARLY: 425,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7231#section-6.5.15
     *
     * Mã phản hồi này cho biết rằng yêu cầu không đáp ứng tiêu đề bắt buộc `Upgrade`.
     */
    UPGRADE_REQUIRED: 426,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc6585#section-4
     *
     * Mã phản hồi này được gửi khi yêu cầu của client bị từ chối vì lý do giới hạn tỷ lệ.
     */
    PRECONDITION_REQUIRED: 428,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc6585#section-5
     *
     * Mã phản hồi này được gửi khi client gửi quá nhiều yêu cầu trong một khoảng thời gian ngắn.
     */
    TOO_MANY_REQUESTS: 429,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc6585#section-6
     *
     * Mã phản hồi này được gửi khi server yêu cầu client thực hiện xác thực trước khi tiếp tục.
     */
    REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7725#section-3
     *
     * Mã phản hồi này được gửi khi server từ chối yêu cầu vì lý do pháp lý. Điều này có thể xảy ra khi tài nguyên bị cấm hoặc không hợp lệ.
     */
    UNAVAILABLE_FOR_LEGAL_REASONS: 451,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7231#section-6.6.1
     *
     * Mã phản hồi này cho biết rằng server gặp lỗi nội bộ và không thể hoàn thành yêu cầu.
     */
    INTERNAL_SERVER_ERROR: 500,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7231#section-6.6.2
     *
     * Mã phản hồi này cho biết rằng server không có khả năng thực hiện yêu cầu hiện tại.
     */
    NOT_IMPLEMENTED: 501,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7231#section-6.6.3
     *
     * Mã phản hồi này cho biết rằng server gặp lỗi từ phía gateway hoặc proxy server.
     */
    BAD_GATEWAY: 502,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7231#section-6.6.4
     *
     * Mã phản hồi này cho biết rằng server tạm thời không thể xử lý yêu cầu. Điều này có thể xảy ra khi server đang được bảo trì hoặc gặp sự cố quá tải.
     */
    SERVICE_UNAVAILABLE: 503,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7231#section-6.6.5
     *
     * Mã phản hồi này cho biết rằng server gặp sự cố từ phía upstream hoặc proxy server. Điều này có thể xảy ra khi có lỗi kết nối hoặc lỗi DNS.
     */
    GATEWAY_TIMEOUT: 504,
    /**
     * Tài liệu chính thức @ https://tools.ietf.org/html/rfc7231#section-6.6.6
     *
     * Mã phản hồi này cho biết rằng server không hỗ trợ phiên bản HTTP được sử dụng trong yêu cầu.
     */
    HTTP_VERSION_NOT_SUPPORTED: 505,
};

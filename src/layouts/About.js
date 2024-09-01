import React from "react";
import img from "../assets/iconAva.png";

function About() {
  return (
    <div className="containerAbout">
      <div className="containerAbout">
        <img src={img} alt="avatar" className="imgAbout" />
        <div className="titleNameAbout">Họ Tên: Nguyễn Văn A</div>
        <div className="itemMssvAbout">MSSV: 123123123123</div>
        <div className="itemClassABout">Lớp: ABCDEFGH</div>
        <div className="itemText">
          <p>
            Đây là trang website cập nhật liên tục các tài liệu mới và nổi bật.
            Bạn sẽ không bỏ lỡ bất kỳ thông tin quan trọng nào từ các tài liệu
            mới nhất và được yêu thích nhất.
          </p>
          <p>
            Công cụ tìm kiếm mạnh mẽ giúp bạn nhanh chóng tìm thấy tài liệu phù
            hợp với nhu cầu của mình chỉ với vài cú nhấp chuột
          </p>
          <p>
            Trang web của chúng tôi được thiết kế với giao diện dễ sử dụng, giúp
            bạn dễ dàng truy cập và quản lý các tài liệu yêu thích của mình.
          </p>
          <p>
            Tham gia cộng đồng của chúng tôi để thảo luận về các tài liệu, chia
            sẻ ý kiến và nhận xét. Chúng tôi khuyến khích sự tương tác và trao
            đổi ý tưởng giữa các thành viên.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;

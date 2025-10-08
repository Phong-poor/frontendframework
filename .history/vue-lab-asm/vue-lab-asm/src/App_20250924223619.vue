<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4 col-lg-3 bg-success text-white p-4">
        <div class="text-center">
          <img
            src="./assets/494794552_122125384928715789_8110410687630992787_n.jpg"
            alt="Avatar"
            class="img-fluid rounded-circle mb-3 border border-light"
            style="width: 160px; height: 160px; object-fit: cover;"
          />
          <h3 class="fw-bold">Trần Quốc Phong</h3>
          <p class="mb-1">Lập trình viên</p>
        </div>

        <hr class="border-light" />

        <p class="mb-1"><i class="fa-solid fa-phone"></i> 024 6690 5588</p>
        <p class="mb-1"><i class="fa-solid fa-envelope"></i> hoatro@cpnv.vn</p>
        <p class="mb-1"><i class="fa-solid fa-location-dot"></i>  Quận Đống Đa, Hà Nội</p>
        <p class="mb-1"><i class="fa-solid fa-calendar"></i>  24/09/1997</p>
        <p class="mb-3"><i class="fa-solid fa-circle-user"></i>  Nam</p>

        <h5 class="mt-4">Mục tiêu nghề nghiệp</h5>
        <p>
          Với 6 năm trong nghề lập trình, triển khai trực tiếp hơn 30 dự án, tôi mong muốn ứng tuyển vào vị trí Senior
          của Công ty để có thể áp dụng những kiến thức, kinh nghiệm lập trình của bản thân để nâng cấp sản phẩm và mang 
          lại những giá trị hữu ích cho doanh nghiệp. Đồng thời, mục tiêu phát triển trong vòng 2 năm tới của tôi sẽ trở
          thành một Lead giỏi.
        </p>

        <h5 class="mt-4">Kỹ năng</h5>
        <p>Kỹ năng giao tiếp</p>
        <div class="progress mb-2">
          <div class="progress-bar" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <p>Kỹ năng đàm phán</p>
        <div class="progress mb-2">
          <div class="progress-bar" role="progressbar" style="width: 60%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <p>Kỹ năng thuyết trình</p>
        <div class="progress">
          <div class="progress-bar" role="progressbar" style="width: 90%" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <h5 class="mt-4">Sở thích</h5>
        <ul>
          <li>Bóng đá</li>
          <li>Đọc sách</li>
          <li>Du lịch</li>
        </ul>
      </div>

      <div class="col-md-8 col-lg-9 bg-light p-4 rounded-end">
        <h4 class="fw-bold text-success"><i class="fa-solid fa-lightbulb"></i> Học vấn</h4>
        <div style="display: flex; justify-content: space-between;">
          <p>Công nghệ thông tin</p>
          <span>2014-2017</span>
        </div>
        <strong>Cao đẳng FPT Polytechnic</strong>
        <ul>
          <li>Tốt nghiệp loại Giỏi</li>
          <li>Đạt học bổng 2016 và 2017</li>
          <li>Đạt giải Nghiên cứu khoa học công nghệ</li>
        </ul>

        <h4 class="fw-bold text-success mt-4"><i class="fa-solid fa-users-rectangle"></i> Kinh nghiệm làm việc</h4>
        <div class="mb-3">
          <div style="display: flex; justify-content: space-between;">
            <strong>Front End Developer</strong>
            <span>2014-2017</span>
          </div>
          <strong>Công ty TNHH MTV SVNT</strong>
          <ul>
            <li>Quản lý các dự án phát triển trang web từ thiết kế ban đầu cho đến hoàn thiện, tối ưu mọi khả năng tương thích trên nhiều trình duyệt và nền tảng.</li>
            <li>Tham gia đánh giá và thử nghiệm các tính năng mới để đảm bảo web tương thích với các tính năng hiện có.</li>
          </ul>
        </div>
        <div class="mb-3">
          <strong>Flutter Developer</strong> - Công ty CP Công nghệ NDS (2019 - 2021)
          <ul>
            <li>Phát triển ứng dụng Mobile App đa nền tảng</li>
          </ul>
        </div>
        <div class="mb-3">
          <strong>Web Developer</strong> - Công ty CP TopCV (2017 - 2019)
          <ul>
            <li>Phát triển giao diện website</li>
          </ul>
        </div>

        <h4 class="fw-bold text-success mt-4">🏆 Danh hiệu & Giải thưởng</h4>
        <p>2023 - Nhân viên xuất sắc năm công ty NTD</p>
        <p>2020 - Nhân viên có cống hiến cao DEF</p>

        <h4 class="fw-bold text-success mt-4">💻 Chứng chỉ</h4>
        <p>PHP, MySQL, JavaScript</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// không cần code JS ở đây
</script>

<style>
body {
  background-color: #f0f2f5;
}
</style>
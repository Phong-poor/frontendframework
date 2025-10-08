<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4 col-lg-3 bg-success text-white p-4">
        <div class="text-center">
          <img src="./assets/494794552_122125384928715789_8110410687630992787_n.jpg" alt="Avatar"
            class="img-fluid rounded-circle mb-3 border border-light"
            style="width: 160px; height: 160px; object-fit: cover;" />
          <h3 class="fw-bold">Trần Quốc Phong</h3>
          <p class="mb-1">Lập trình viên</p>
        </div>

        <hr class="border-light" />

        <p class="mb-1">
          <i class="fa-solid fa-phone"></i>
          <span v-if="!editPhone" @click="editPhone = true" style="cursor: pointer;">
            {{ phone }}
          </span>
          <input v-else
                v-model="phone"
                @blur="editPhone = false"
                @keyup.enter="editPhone = false"
                type="text"
                class="form-control d-inline-block"
                style="width: 200px;" />
        </p>
        <p class="mb-1"><i class="fa-solid fa-envelope"></i> 
          <span v-if="!editEmail" @click="editEmail = true" style="cursor: pointer;">
            {{ email }}
          </span>
          <input v-else
                v-model="email"
                @blur="editEmail = false"
                @keyup.enter="editEmail = false"
                type="email"
                class="form-control d-inline-block"
                style="width: 250px;" />
        </p>
        <p class="mb-1"><i class="fa-solid fa-location-dot"></i> Phường Buôn Ma Thuột</p>
        <p class="mb-1"><i class="fa-solid fa-calendar"></i> 23/06/2006</p>
        <p class="mb-3"><i class="fa-solid fa-circle-user"></i> Nam</p>

        <h5 class="mt-4">Mục tiêu nghề nghiệp</h5>
        <p>
          Với 6 năm trong nghề lập trình, triển khai trực tiếp hơn 30 dự án, tôi mong muốn ứng tuyển vào vị trí Senior
          của Công ty để có thể áp dụng những kiến thức, kinh nghiệm lập trình của bản thân để nâng cấp sản phẩm và mang
          lại những giá trị hữu ích cho doanh nghiệp. Đồng thời, mục tiêu phát triển trong vòng 2 năm tới của tôi sẽ trở
          thành một Lead giỏi.
        </p>

        <h5 class="mt-4">Kỹ năng</h5>
        <p>Kỹ năng giao tiếp</p>
        <div class="progress mb-2"
            @mousedown="startDrag($event, 'giaoTiep')"
            @mousemove="onDrag($event, 'giaoTiep')"
            @mouseup="stopDrag">
          <div class="progress-bar"
              :style="{width: giaoTiep + '%'}"
              :aria-valuenow="giaoTiep"
              aria-valuemin="0" aria-valuemax="100">
          </div>
        </div>

        <p>Kỹ năng đàm phán</p>
        <div class="progress mb-2"
            @mousedown="startDrag($event, 'damPhan')"
            @mousemove="onDrag($event, 'damPhan')"
            @mouseup="stopDrag">
          <div class="progress-bar"
              :style="{width: damPhan + '%'}"
              :aria-valuenow="damPhan">
          </div>
        </div>

        <p>Kỹ năng thuyết trình</p>
        <div class="progress"
            @mousedown="startDrag($event, 'thuyetTrinh')"
            @mousemove="onDrag($event, 'thuyetTrinh')"
            @mouseup="stopDrag">
          <div class="progress-bar"
              :style="{width: thuyetTrinh + '%'}"
              :aria-valuenow="thuyetTrinh">
          </div>
        </div>
        <h5 class="mt-4">Sở thích</h5>
        <ul>
          <li>Bóng đá</li>
          <li>Chơi game</li>
          <li>Phiêu lưu</li>
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
            <li>Quản lý các dự án phát triển trang web từ thiết kế ban đầu cho đến hoàn thiện, tối ưu mọi khả năng tương
              thích trên nhiều trình duyệt và nền tảng.</li>
            <li>Tham gia đánh giá và thử nghiệm các tính năng mới để đảm bảo web tương thích với các tính năng hiện có.
            </li>
            <li>Hợp tác chặt chẽ với các lập trình viên và khách hàng để đáp ứng các yêu cầu, mục tiêu và chức năng mong
              muốn của dự án.</li>
            <li>Phát triển và tích hợp các chủ đề tùy chỉnh vào WordPress, PHP-Fusion và Concrete5.</li>
            <li>Tiến hành đào tạo cho khách hàng về cách xử lý hệ thống quản lý nội dung trang web.</li>
            <li>Cho phép quảng cáo trên toàn trang web bằng cách lập trình canvas HTML5 để tạo hoạt ảnh cho các phần tử
              trên nền web.</li>
            <li>Nghiên cứu, phát triển công nghệ tiên tiến để ứng dụng xây dựng các sản phẩm dịch vụ mới.</li>
            <li>Hỗ trợ các thành viên trong nhóm với các chức năng phức tạp, tham gia nhận xét, đánh giá source code của
              các thành viên trong nhóm.</li>
          </ul>
        </div>
        <div class="mb-3">
          <div style="display: flex; justify-content: space-between;">
            <strong>Flutter Developer</strong>
            <span>2019 - 2021</span>
          </div>
          <strong>Công ty CP Công nghệ NDS</strong>
          <ul>
            <li>Phát triển trang web thân thiện với người dùng giúp tăng lưu lượng truy cập, lượt xem trang và trải
              nghiệm người dùng trên trang tốt.</li>
            <li>Thực hiện bảo trì và cập nhật cho các trang web khách hàng hiện tại.</li>
            <li>Thực hiện thiết kế layout website, cắt HTML & CSS các sản phẩm Marketing.</li>
            <li>Viết và hệ thống tài liệu phần mềm và thông số kỹ thuật.</li>
            <li>Làm nhiều dự án đồng thời với tiêu chuẩn và hiệu suất cao.</li>
            <li>Tham gia vào dự án phát triển trang web chơi game trực tuyến lớn.</li>
            <li>Tích hợp các trang web với Facebook, Twitter và YouTube.</li>
          </ul>
        </div>

        <h4 class="fw-bold text-success mt-4"><i class="fa-solid fa-trophy"></i> Danh hiệu & Giải thưởng</h4>
        <p>2023 - Nhân viên xuất sắc năm công ty NTD</p>
        <p>2020 - Nhân viên có cống hiến cao DEF</p>

        <h4 class="fw-bold text-success mt-4">💻 Chứng chỉ</h4>
        <p>PHP, MySQL, JavaScript</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";


const phone = ref("0793 683 237");
const email = ref("phongtqpk04300@gmail.com");

const editPhone = ref(false);
const editEmail = ref(false);

const giaoTiep = ref(80);
const damPhan = ref(60);
const thuyetTrinh = ref(90);

let dragging = ref(false);
let currentField = ref(null);

function startDrag(event, field) {
  dragging.value = true;
  currentField.value = field;
  updateValue(event, field);
}

function onDrag(event, field) {
  if (!dragging.value || currentField.value !== field) return;
  updateValue(event, field);
}

function stopDrag() {
  dragging.value = false;
  currentField.value = null;
}

function updateValue(event, field) {
  const progressBar = event.currentTarget;
  const rect = progressBar.getBoundingClientRect();
  const percent = ((event.clientX - rect.left) / rect.width) * 100;
  const value = Math.max(0, Math.min(100, Math.round(percent)));

  if (field === "giaoTiep") giaoTiep.value = value;
  if (field === "damPhan") damPhan.value = value;
  if (field === "thuyetTrinh") thuyetTrinh.value = value;
}
</script>
<style scoped>
body {
  background-color: #f0f2f5;
}
</style>
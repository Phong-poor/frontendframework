<script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'


</script>

<template>
    <form>
        <h2>Đăng ký</h2>
        <div class="group">
            <label>Username</label>
            <input type="text">
        </div>
        <div class="group">
            <label>Email</label>
            <input type="email">
        </div>
        <div class="group">
            <label>Phone</label>
            <input type="number">
        </div>
        <div class="group">
            <label>Birthday</label>
            <input type="date">
        </div>
        <div class="group">
        <label>Gender</label>
            <div class="gender-options">
                <input type="radio" id="male" name="gender" value="male">
                <label for="male">Nam</label>

                <input type="radio" id="female" name="gender" value="female">
                <label for="female">Nữ</label>
            </div>
        </div>
        <div class="group">
            <label>Password</label>
            <input type="password">
        </div>
        <div class="group">
            <label>Comfirm password</label>
            <input type="password">
        </div>
    </form>
</template>

<style scoped>
    form {
        width: 500px;
        margin: 0 auto;
        border: 2px solid green;
        padding: 20px;
        margin-top: 100px;
    }

    form .group {
        display: flex;
        align-items: center;
        margin-top: 15px;
    }

    form .group label {
        width: 150px;
        font-weight: 500;
    }

    form .group input {
        flex: 1;
        padding: 6px;
        font-size: 14px;
    }
    .gender-options {
        display: flex;
        gap: 10px; /* khoảng cách giữa các nút */
        margin-top: 5px;
        }

        .gender-options input[type="radio"] {
        display: none; /* ẩn nút radio mặc định */
        }

        .gender-options label {
        padding: 8px 16px;
        border: 2px solid #ccc;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-weight: 500;
        }

        /* khi hover */
        .gender-options label:hover {
        border-color: #007bff;
        color: #007bff;
        }

        /* khi được chọn */
        .gender-options input[type="radio"]:checked + label {
        background-color: #007bff;
        color: white;
        border-color: #007bff;
        }
    h2 {
        text-align: center;
        margin-bottom: 20px;
    }
    button{
        margin-left: 175px;
        margin-top: 20px;
        padding: 10px;
        border-radius: 10px;
    }
</style>
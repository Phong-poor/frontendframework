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
                <div class="group gender">
                    <label>
                    <input type="radio" name="gender" value="male">
                    Nam
                    </label>
                    <label style="margin-left: 15px;">
                    <input type="radio" name="gender" value="female">
                    Nữ
                    </label>
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
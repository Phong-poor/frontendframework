<script setup>
    import {ref, onMounted, reactive} from 'vue';
    import { useRouter } from 'vue-router'
    import axios from 'axios';
 
    const users = ref([]);

    const user = reactive({
        username: '',
        email: '',
        role: ''
    })
    const editingId = ref(null);
    const editUser = (item) => {
        Object.assign(user, item);
        editingId.value = item.id;
    };
    onMounted(async () => {
        Loadulieu()
    })
    const handleDelete = async (id) => {
        const isConfirm = confirm(`bạn có muốn xoá id = ${id} này không ?`)
        if (isConfirm) {
            const response = await axios.delete(`http://localhost:3001/users/${id}`);
            if (response.status == 200) {
            Loadulieu()
            alert('xoá thành công')
            }

        }
    }
    const handleSubmit = async () => {
        if (!editingId.value) {
            alert('Chỉ được sửa người dùng hiện có, không thể thêm mới.');
            return;
        }

        const response = await axios.put(
            `http://localhost:3001/users/${editingId.value}`,
            { ...user }
        );

        if (response.status === 200) {
            await Loadulieu();
            clearData();
            alert('Cập nhật thành công');
        }
    };
    const Loadulieu = async () => {
        console.log(`the component is now mounted.`)
        const response = await axios.get('http://localhost:3001/users');
        if (response.status == 200) {
            users.value = response.data
        }
    }
    const clearData = () => {
        Object.assign(user, {
            username: '',
            email: '',
            role: ''
        })
        editingId.value = null;
    }
    const router = useRouter()

    const handleDangXuat = () => {
      localStorage.removeItem("currentUser")
      router.push("/login")
    }
</script>

<template>
    div.
</template>

<style scoped>
    html, body {
        height: 100%;
        margin: 0;
        background-color:#f8f9fa; 
    }
    :host {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
    header {
        flex-shrink: 0;
    }

    main {
        flex: 1;
    }

    footer {
        flex-shrink: 0;
    }
    .product-thumb { width:60px; height:60px; object-fit:cover; border-radius:.5rem; }
    .sticky-col { position: sticky; top: 1rem; }
    .catagory{
      margin-top: 10px;
      margin-left: 10px;
    }
    .product{
        margin-top: 10px;
    }
</style>
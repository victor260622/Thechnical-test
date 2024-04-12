<template>
    <div>
        <h1>Usuarios</h1>
        <ul class="flex flex-row gap-x-[28px] my-[24px] justify-center">
            <li v-for="user in paginatedUsers" :key="user.id" class="flex flex-col">
                {{ user.firstName }} {{ user.lastName }}
                <ManageItem @delete= "emitDeleteUser(user.id)" @view="viewUser(user)" />
            </li>
        </ul>
        <div class="flex justify-center space-x-2 mt-4">
            <button @click="prevPage" :disabled="currentPage <= 0"
                class="px-4 py-2 text-white bg-blue-500 rounded disabled:opacity-50">Anterior</button>
            <button @click="nextPage" :disabled="currentPage >= pageCount - 1"
                class="px-4 py-2 text-white bg-blue-500 rounded disabled:opacity-50">Siguiente</button>
        </div>
        <UserModal v-if="selectedUser" :user="selectedUser" @close="selectedUser = null" />
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'

const props = defineProps({
    users: Array
})

let selectedUser = ref(null)
const emit = defineEmits(['deleteUser'])
let currentPage = ref(0)
let itemsPerPage = 6
const emitDeleteUser = (userId) => {
    emit('deleteUser', userId)
}

let pageCount = computed(() => Math.ceil(props.users.length / itemsPerPage))
let paginatedUsers = computed(() => {
    let start = currentPage.value * itemsPerPage
    let end = start + itemsPerPage
    return props.users.slice(start, end)
})

const viewUser = (user) => {
    selectedUser.value = user
}

const deleteUser = (userId) => {
    props.users = props.users.filter(user => user.id !== userId)
}

const nextPage = () => {
    if (currentPage.value < pageCount.value - 1) {
        currentPage.value++
    }
}

const prevPage = () => {
    if (currentPage.value > 0) {
        currentPage.value--
    }
}
</script>

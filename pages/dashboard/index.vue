<template>
    <div class="flex h-screen w-full">
        <aside class="w-64 bg-gray-800 h-screen text-white p-6 flex flex-col justify-between">
            <div class="mb-8">
                <TopLogo />
                <UImage src="~/assets/img/logo.svg" alt="Logo" class="w-32 h-auto mb-4" />
                <UList class="flex flex-col">
                    <UListItem><button @click="selectedComponent = 'Usuarios'">Usuarios</button></UListItem>
                    <UListItem><button @click="selectedComponent = 'Productos'">Productos</button></UListItem>
                </UList>
            </div>
            <UButton class="flex justify-center " @click="logout">
                <p>LogOut</p>
            </UButton>
        </aside>

        <main class="flex-1 p-6">
            <header class="flex justify-between items-center mb-6">
                <div>
        <UInput v-model="searchQuery" type="text" placeholder="Buscar..." class="p-2 rounded border" />
      </div>
                <div class="flex items-center gap-x-[12px]">
                    <span>{{ userName }}</span>
                    <img src="~/assets/img/login-image.jpg" alt="User" class="w-8 h-8 rounded-full mr-2" />
                </div>
            </header>

            <section>
            </section>
            <component :is="selectedComponent" :users="filteredUsers" :products="filteredProducts" @deleteUser="deleteUser" @deleteProduct="deleteProduct" />
        </main>
    </div>
</template>



<script setup lang="ts">
import { ref, onMounted } from 'vue'
import fetchProducts from '~/plugins/fetchProducts';
import fetchUsers from '~/plugins/fetchUsers'

const users = ref([])
const products = ref([])
onMounted(async () => {
    const fetchedUsers = await fetchUsers()
    users.value = fetchedUsers.value 

    const fetchedProducts = await fetchProducts()
  products.value = fetchedProducts.value
})
definePageMeta({
    middleware: "auth"
})
const { $auth } = useNuxtApp();
const { logout } = useFirebaseAuth();
let email = $auth.currentUser?.email;
let userName = email ? email.split('@')[0] : 'Daptee';
let selectedComponent = ref('Usuarios');
const deleteUser = (userId: any) => {
    users.value = users.value.filter(user => user.id !== userId)
  }
const deleteProduct = (productId: any) => {
    products.value = products.value.filter(product => product.id !== productId)
  }

  let searchQuery = ref('')

  let filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value
  return users.value.filter(user => 
    (user.firstName && user.firstName.includes(searchQuery.value)) ||
    (user.lastName && user.lastName.includes(searchQuery.value))
  )
})


let filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value
  return products.value.filter(product => product.title.includes(searchQuery.value))
})
</script>
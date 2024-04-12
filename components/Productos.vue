<template>
  <div>
    <h2>Productos</h2>
    <ul class="flex flex-row gap-x-[22px] w-full justify-center" >
      <li v-for="product in paginatedProducts" :key="product.id " class="max-w-[250px] justify-center items-center" >
        <h3>{{ product.title }}</h3>
        <p>{{ product.description }}</p>
        <p>Precio: {{ product.price }}</p>
        <ManageItem @delete="emitDeleteProduct(product.id)"  @view="viewProduct(product)" />
      </li>
    </ul>
    <div class="flex justify-center space-x-2 mt-4">
  <button @click="prevPage" :disabled="currentPage <= 0" class="px-4 py-2 text-white bg-blue-500 rounded disabled:opacity-50">Anterior</button>
  <button @click="nextPage" :disabled="currentPage >= pageCount - 1" class="px-4 py-2 text-white bg-blue-500 rounded disabled:opacity-50">Siguiente</button>
</div>

<ProductModal v-if="selectedProduct" :product="selectedProduct" @close="selectedProduct = null" />
  
  </div>
</template>


  <script setup lang="ts">
  import { defineProps, ref, computed } from 'vue'
  import ProductModal from './ProductModal.vue'

  const isOpen = ref(false)

  const toggleDropdown = () => {
    isOpen.value = !isOpen.value
  }

  const closeDropdown = () => {
    isOpen.value = false
  }

  const dropdownRef = ref(null)

  
  const props = defineProps({
    products: Array
  })
  
  let selectedProduct = ref(null)
  let currentPage = ref(0)
  let itemsPerPage = 3

  const emit = defineEmits(['deleteProduct'])
  
  let pageCount = computed(() => Math.ceil(props.products.length / itemsPerPage))
  let paginatedProducts = computed(() => {
    let start = currentPage.value * itemsPerPage
    let end = start + itemsPerPage
    return props.products.slice(start, end)
  })
  
  const viewProduct = (product) => {
    selectedProduct.value = product
  }
  
  const emitDeleteProduct = (productId) => {
    emit('deleteProduct', productId)
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
  
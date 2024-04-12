import { defineNuxtPlugin } from '#app'
import { ref } from 'vue'

export default async function fetchProducts() {
    const products = ref([])
    const response = await fetch('https://dummyjson.com/products')
    if (!response.ok) {
      console.error('Error al obtener los productos:', response.status)
      return products
    }
    const data = await response.json()
    products.value = data.products
    return products
  }

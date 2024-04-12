import { defineNuxtPlugin } from '#app'
import { ref } from 'vue'

export default async function fetchUsers() {
  const users = ref([])
  const response = await fetch('https://dummyjson.com/users')
  if (!response.ok) {
    console.error('Error al obtener los usuarios:', response.status)
    return users
  }
  const data = await response.json()
  users.value = data.users
  return users
}


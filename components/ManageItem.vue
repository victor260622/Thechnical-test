<template>
    <Menu>
      <MenuButton class="text-[32px] " >
        ...
    </MenuButton>
      <MenuItems >  
        <section class="bg-white text-black text-center flex flex-col gap-y-[8px] w-[120px]">
            <MenuItem v-slot="{ active }" >
             <a
               :class='{ "bg-[#a3e635]": active }'
               class="py-[12px] px-[12px]"
               href="#"
               @click="emit('delete')"
             >
               Eliminar
             </a>
           </MenuItem>
           <MenuItem v-slot="{ active }">
             <a
               :class='{ "bg-[#a3e635]": active }'
               class="py-[12px] px-[12px]"
               href="#"
               @click="emit('view')"
             >
               Ver
             </a>
           </MenuItem>

        </section>    
      </MenuItems>
    </Menu>
  </template>
  
  <script setup lang="ts">
    import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
    import { defineEmits } from 'vue'
  
    const emit = defineEmits(['delete', 'view'])
  </script>
  
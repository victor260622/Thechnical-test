<template>
    <section class="flex w-full flex-col sm:flex-row items-center justify-center h-screen" >
        <UContainer class="space-y-4 w-1/2 h-1/2 p- flex justify-center 0">
            <UCard class="max-w-[365px] max-h-[350px] w-full" >
                <UForm :schema="schema" :state="state" class="" @submit="onSubmit">
                    <UFormGroup label="Usuario" name="user">
                        <UInput v-model="state.user" />
                    </UFormGroup>
            
                    <UFormGroup class="mt-[14px]" label="Password" name="password">
                        <UInput v-model="state.password" type="password" />
                    </UFormGroup>
            
                    <UButton type="submit" class="mt-[34px] w-full flex  justify-center">
                        <p>Login</p>
                    </UButton>
                </UForm>
            </UCard>
        </UContainer>
        
        <div class="w-1/2 flex justify-center">
            <div class="w-[400px] h-[400px] rounded-full overflow-hidden">
                <img src="~/assets/img/login-image.jpg" alt="Discover Nuxt 3" class="w-full h-full" />
            </div>
        </div>
    </section>
</template>


<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const { login } = useFirebaseAuth()


const schema = z.object({
    user: z.string().min(1),
    password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const state = reactive({
    user: undefined,
    password: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
        await login(event.data.user, event.data.password)

    } catch (error) {
        console.log(error)
    }
}

</script>
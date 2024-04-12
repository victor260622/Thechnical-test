import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"

export const useFirebaseAuth = () => {
    const {$auth} = useNuxtApp()

    const login = async (user: string, password: string) => {
        let email = user + '@daptee.com'
        try {
            const userCredential = await signInWithEmailAndPassword(
                $auth,
                email,
                password
            )
            const loger = userCredential.user;
            const toast = useToast()
            console.log(loger)
            toast.add({
                title: 'Redirigiendo...',
                timeout: 2000,
                callback: () => {
                    navigateTo('/dashboard')
                }
            })
        }catch(e){
            console.log(e)
        }
    }
    const logout = async () => {
        signOut($auth);
        navigateTo('/login');
    }

    const currentUser = () => new Promise((resolve)=>{
        const unsubscribe = onAuthStateChanged($auth, (user) => {
            unsubscribe();
            resolve(user);
          });
    })

    return {
        login,
        logout,
        currentUser

    }
}
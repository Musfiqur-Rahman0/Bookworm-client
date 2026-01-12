import { RouterProvider } from "react-router"
import router from "./routes/Router"
import { AuthProvider } from "./hooks/useAuth"


function App() {


  return (
    <AuthProvider> 
      <RouterProvider router={router} >
      
    </RouterProvider>
    </AuthProvider>
  )
}

export default App

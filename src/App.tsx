import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="container mx-auto min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Hello World</h1>
      </div>
      <Toaster />
    </ThemeProvider>
  )
}

export default App

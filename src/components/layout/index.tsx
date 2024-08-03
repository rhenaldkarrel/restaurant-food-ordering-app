import { Outlet } from "react-router-dom"

export function Layout() {
  return (
    <main className="max-w-[1024px] mx-auto min-h-screen px-4 py-6 relative">
      <Outlet />
    </main>
  )
}
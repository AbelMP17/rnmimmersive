import React, { Suspense } from 'react'
import Router from './router'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Suspense fallback={<div className="container-responsive py-16">Cargando...</div>}>
        <Router />
      </Suspense>
      <Footer />
    </div>
  )
}

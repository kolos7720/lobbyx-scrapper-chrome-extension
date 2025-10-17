import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'

function SidePanel() {
  return (
    <>
      <h1>Side Panel</h1>
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SidePanel />
  </StrictMode>,
)

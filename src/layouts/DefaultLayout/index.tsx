import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import { LayoutContainer } from './styles'

// Outlet é semelhante ao slot do vuejs para renderizar
// um conteúdo de forma dinâmica dentro do nosso componente
// com uma posição predefinada
export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  )
}

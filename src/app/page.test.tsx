/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from './page'

it('App Router: Works with Server Components', () => {
  render(<Home />)

  expect(
    screen.getByText(
      'Construyendo un Futuro Mejor: Monitoreo y Registro de Desafíos Comunitarios',
    ),
  ).toBeInTheDocument()

  expect(
    screen.getByText('© 2024 Traquéalo — Hecho en Puerto Rico'),
  ).toBeInTheDocument()
})

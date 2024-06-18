import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import { CustomNavLink } from './nav-link'

describe('Nav Link', () => {
  it('should highlight the nav link when is the current page link', () => {
    const wrapper = render(
      <>
        <CustomNavLink to="/">Início</CustomNavLink>
        <CustomNavLink to="/orders">Pedidos</CustomNavLink>
      </>,
      {
        wrapper: ({ children }) => {
          return <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
        },
      },
    )

    const homeLink = wrapper.getByText('Início')
    const ordersLink = wrapper.getByText('Pedidos')

    expect(homeLink.dataset.current).toEqual('true')
    expect(ordersLink.dataset.current).toEqual('false')
  })

  it('should highlight the other link when navigating', async () => {
    const user = userEvent.setup()

    const wrapper = render(
      <>
        <CustomNavLink to="/">Início</CustomNavLink>
        <CustomNavLink to="/orders">Pedidos</CustomNavLink>
      </>,
      {
        wrapper: ({ children }) => {
          return <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
        },
      },
    )

    const homeLink = wrapper.getByText('Início')
    const ordersLink = wrapper.getByText('Pedidos')

    await user.click(ordersLink)

    expect(homeLink.dataset.current).toEqual('false')
    expect(ordersLink.dataset.current).toEqual('true')
  })
})

import { render } from '@testing-library/react'

import { OrderStatusEnum } from '@/api/list-orders'

import { OrderStatus } from './order-status'

describe('Order Status', () => {
  it('should display the right order status pending', () => {
    const wrapper = render(<OrderStatus status={OrderStatusEnum.Pending} />)

    const statusText = wrapper.getByText('Pendente')
    const badgeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-slate-500')
  })

  it('should display the right order status processing', () => {
    const wrapper = render(<OrderStatus status={OrderStatusEnum.Processing} />)

    const statusText = wrapper.getByText('Em preparo')
    const badgeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-amber-500')
  })

  it('should display the right order status delivering', () => {
    const wrapper = render(<OrderStatus status={OrderStatusEnum.Delivering} />)

    const statusText = wrapper.getByText('Em entrega')
    const badgeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-amber-500')
  })

  it('should display the right order status delviered', () => {
    const wrapper = render(<OrderStatus status={OrderStatusEnum.Delivered} />)

    const statusText = wrapper.getByText('Entregue')
    const badgeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-emerald-500')
  })

  it('should display the right order status canceled', () => {
    const wrapper = render(<OrderStatus status={OrderStatusEnum.Canceled} />)

    const statusText = wrapper.getByText('Cancelado')
    const badgeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-rose-500')
  })
})

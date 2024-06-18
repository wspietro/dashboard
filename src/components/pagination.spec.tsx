import { render } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { ReactElement } from 'react'

import { Pagination } from './pagination'

function setup(jsx: ReactElement) {
  return {
    user: userEvent.setup(),
    wrapper: render(jsx),
  }
}

const onPageChangeCallback = vi.fn()

beforeEach(() => {
  onPageChangeCallback.mockClear()
})

describe('Pagination', () => {
  it('should display the right amount of pages and results', () => {
    const { wrapper } = setup(
      <Pagination
        pageIndex={0}
        perPage={10}
        totalCount={200}
        onPageChange={() => {}}
      />,
    )

    expect(wrapper.getByText('Página 1 de 20')).toBeInTheDocument()
    expect(wrapper.getByText('Total de 200 item(s)')).toBeInTheDocument()
  })

  it('should be able to navigate to the next page', async () => {
    const { user, wrapper } = setup(
      <Pagination
        pageIndex={0}
        perPage={10}
        totalCount={200}
        onPageChange={onPageChangeCallback}
      />,
    )

    const nextPageButton = wrapper.getByRole('button', {
      name: 'Próxima página',
    })

    await user.click(nextPageButton)

    expect(onPageChangeCallback).toHaveBeenCalled()
    expect(onPageChangeCallback).toHaveBeenCalledWith(1)
  })

  it('should call onPageChange with the correct page index when navigating to the end', async () => {
    const { user, wrapper } = setup(
      <Pagination
        pageIndex={0}
        perPage={10}
        totalCount={200}
        onPageChange={onPageChangeCallback}
      />,
    )

    const nextPageButton = wrapper.getByRole('button', {
      name: 'Última página',
    })

    await user.click(nextPageButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(19)
  })

  it('should disable the previous page button on the first page', () => {
    const { wrapper } = setup(
      <Pagination
        pageIndex={0}
        perPage={10}
        totalCount={200}
        onPageChange={onPageChangeCallback}
      />,
    )

    const prevPageButton = wrapper.getByRole('button', {
      name: 'Página anterior',
    })

    expect(prevPageButton).toBeDisabled()
  })
})

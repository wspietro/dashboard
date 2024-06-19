import { QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'

import { queryClient } from '@/lib/react-query'

import { SignIn } from '../auth/sign-in'

describe('Sign in', () => {
  it('should present email input value if email is available on url ', () => {
    const wrapper = render(<SignIn />, {
      wrapper: ({ children }) => {
        return (
          <MemoryRouter
            initialEntries={['/sign-in?email=pietro@contratasync.com']}
          >
            <QueryClientProvider client={queryClient}>
              <HelmetProvider>{children}</HelmetProvider>
            </QueryClientProvider>
          </MemoryRouter>
        )
      },
    })

    const emailInput = wrapper.getByLabelText('Seu e-mail:') as HTMLInputElement
    // expect(emailInput).toHaveValue('pietro@contratasync.com') também está correto
    expect(emailInput.value).toEqual('pietro@contratasync.com')
  })
})

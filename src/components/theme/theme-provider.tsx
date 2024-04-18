import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
}

// context do react
const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme', // nome que será salvo no local-storage
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    // caso o usuário já tenha algo salvo no local-storage ou o tema default
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  )

  useEffect(() => {
    const root = window.document.documentElement // busca o html do documento

    root.classList.remove('light', 'dark') // remove todas as possíveis classe

    if (theme === 'system') {
      // caso seja system, confere se existe a preferência dark
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme) // se não for system, utiliza o theme definido
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      // retorna a função que atualiza o local storage e o state, que dispara o useEffect
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  // função helper para utilizarmos o contexto
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}

import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const orderFilterSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
})

type OrderFilterSchema = z.infer<typeof orderFilterSchema>

export function OrderTableFilters() {
  const debouncedSearch = useDebouncedCallback(
    (name: string, value: string) => {
      handleFilter(name, value)
    },
    700,
  )
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const { register, control, reset } = useForm<OrderFilterSchema>({
    resolver: zodResolver(orderFilterSchema),
    values: {
      orderId: orderId ?? '',
      customerName: customerName ?? '',
      status: status ?? 'all',
    },
  })

  function handleFilter(inputName: string, inputValue: string) {
    setSearchParams((searchParams) => {
      if (inputValue === '' || inputValue === 'all') {
        searchParams.delete(inputName)
        return searchParams
      }
      searchParams.set(inputName, inputValue)
      searchParams.set('page', '1')
      return searchParams
    })
  }

  function handleClearFilters() {
    setSearchParams((searchParams) => {
      searchParams.delete('orderId')
      searchParams.delete('customerName')
      searchParams.delete('status')
      searchParams.set('page', '1')

      return searchParams
    })

    reset({
      orderId: '',
      customerName: '',
      status: 'all',
    })
  }

  return (
    <form className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filtros</span>
      <Input
        placeholder="ID do pedido"
        className="h-8 w-auto"
        {...register('orderId', {
          onChange: (e) => {
            debouncedSearch(e.target.name, e.target.value)
          },
        })}
      />
      <Input
        placeholder="Nome do cliente"
        className="h-8 w-[320px]"
        {...register('customerName', {
          onChange: (e) => {
            debouncedSearch(e.target.name, e.target.value)
          },
        })}
      />

      <Controller
        name="status"
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              defaultValue="All"
              name={name}
              onValueChange={(value) => {
                handleFilter('status', value)
                onChange()
              }}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue />
                <SelectContent>
                  <SelectItem value="all">Todos status</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="canceled">Cancelado</SelectItem>
                  <SelectItem value="processing">Processado</SelectItem>
                  <SelectItem value="delivering">Em entrega</SelectItem>
                  <SelectItem value="delivered">Entregue</SelectItem>
                </SelectContent>
              </SelectTrigger>
            </Select>
          )
        }}
      ></Controller>
      <Button
        type="button"
        variant="outline"
        size="xs"
        onClick={handleClearFilters}
        disabled={!orderId && !customerName && !status}
      >
        <X className="mr-2 h-4 w-4" />
        Remover Filtros
      </Button>
    </form>
  )
}

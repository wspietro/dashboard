import { Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function OrderTableFilters() {
  return (
    <form className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filtros</span>
      <Input placeholder="ID do pedido" className="h-8 w-auto" />
      <Input placeholder="Nome do client" className="h-8 w-[320px]" />
      <Select defaultValue="All">
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

      <Button type="submit" variant="secondary" size="xs">
        <Search className="mr-2 h-4 w-4" />
        Filtrar Resultados
      </Button>
      <Button type="button" variant="outline" size="xs">
        <X className="mr-2 h-4 w-4" />
        Remover Filtros
      </Button>
    </form>
  )
}

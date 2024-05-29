import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { cancelOrder } from '@/api/cancel-order'
import { ListOrdersResponse, Order, OrderStatusEnum } from '@/api/list-orders'
import { OrderStatus } from '@/components/order-status'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetails } from './order-details'

interface OrderTableRowProps {
  order: Order
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const queryClient = useQueryClient()

  const { mutateAsync: cancelOrderFn, isPending: isCancelOrderPending } =
    useMutation({
      mutationFn: cancelOrder,
      async onSuccess(_, { orderId }) {
        const ordersListCache = queryClient.getQueriesData<ListOrdersResponse>({
          queryKey: ['orders'],
        })

        ordersListCache.forEach(([cacheKey, cacheData]) => {
          if (!cacheData) {
            return
          }

          // altera todo o status para cancelado em todos os caches salvos no react query
          queryClient.setQueryData<ListOrdersResponse>(cacheKey, {
            ...cacheData,
            orders: cacheData.orders.map((order) => {
              if (order.orderId === orderId) {
                return { ...order, status: OrderStatusEnum.Canceled }
              }

              return order
            }),
          })
        })

        toast.success('Pedido cancelado com sucesso!')
      },
      onError(error) {
        toast.error('Erro ao cancelar o pedido.', {
          description: `${error.message}`,
        })
      },
    })

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails orderId={order.orderId} open={isDetailsOpen} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {(order.total / 100).toLocaleString('pt-Br', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell>
        <Button variant="outline" size="xs">
          <ArrowRight className="mr-2 h-3 w-3" />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button
          disabled={
            ![OrderStatusEnum.Pending, OrderStatusEnum.Processing].includes(
              order.status,
            )
          }
          variant="ghost"
          size="xs"
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
        >
          <X className="mr-2 h-3 w-3" />
          {isCancelOrderPending ? (
            <Skeleton className="h-4 w-12 bg-muted-foreground" />
          ) : (
            'Cancelar'
          )}
        </Button>
      </TableCell>
    </TableRow>
  )
}

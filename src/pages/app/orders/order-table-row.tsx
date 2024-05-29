import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { approveOrder } from '@/api/approve-order'
import { cancelOrder } from '@/api/cancel-order'
import { deliverOrder } from '@/api/deliver-order'
import { dispatchOrder } from '@/api/dispatch-order'
import { ListOrdersResponse, Order, OrderStatusEnum } from '@/api/list-orders'
import { OrderStatus } from '@/components/order-status'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetails } from './order-details'

interface OrderTableRowProps {
  order: Order
}

interface StatusInfo {
  text: string
  disabled: boolean
  function: (args: { orderId: string }) => void
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const queryClient = useQueryClient()

  function updateOrderStatusOnCache(orderId: string, status: OrderStatusEnum) {
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
            return { ...order, status }
          }

          return order
        }),
      })
    })
  }

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrderPending } =
    useMutation({
      mutationFn: approveOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, OrderStatusEnum.Processing)
        toast.success('Pedido Aprovado com sucesso!')
      },
      onError(error) {
        toast.error('Erro ao aprovar o pedido.', {
          description: `${error.message}`,
        })
      },
    })

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrderPending } =
    useMutation({
      mutationFn: dispatchOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, OrderStatusEnum.Delivering)
        toast.success('Pedido enviado com sucesso!')
      },
      onError(error) {
        toast.error('Erro ao enviar o pedido.', {
          description: `${error.message}`,
        })
      },
    })

  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrderPending } =
    useMutation({
      mutationFn: deliverOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, OrderStatusEnum.Delivered)
        toast.success('Pedido entregue com sucesso!')
      },
      onError(error) {
        toast.error('Erro ao entregar o pedido.', {
          description: `${error.message}`,
        })
      },
    })

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrderPending } =
    useMutation({
      mutationFn: cancelOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, OrderStatusEnum.Canceled)
        toast.success('Pedido cancelado com sucesso!')
      },
      onError(error) {
        toast.error('Erro ao cancelar o pedido.', {
          description: `${error.message}`,
        })
      },
    })

  const statusInfoMap: Record<OrderStatusEnum, StatusInfo> = {
    pending: {
      text: 'Aprovar',
      disabled: isApprovingOrderPending,
      function: approveOrderFn,
    },
    processing: {
      text: 'Em entrega',
      disabled: isDispatchingOrderPending,
      function: dispatchOrderFn,
    },
    delivering: {
      text: 'Entregue',
      disabled: isDeliveringOrderPending,
      function: deliverOrderFn,
    },
    canceled: {
      text: 'Aprovar',
      disabled: true,
      function: cancelOrderFn,
    },
    delivered: {
      text: 'Aprovar',
      disabled: true,
      function: deliverOrderFn,
    },
  }

  const statusInfo = statusInfoMap[order.status]

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
        <Button
          variant="outline"
          size="xs"
          disabled={statusInfo.disabled}
          onClick={() => statusInfo.function({ orderId: order.orderId })}
        >
          <ArrowRight className="mr-2 h-3 w-3" />
          {statusInfo.text}
        </Button>
      </TableCell>
      <TableCell>
        <Button
          disabled={
            ![OrderStatusEnum.Pending, OrderStatusEnum.Processing].includes(
              order.status,
            ) || isCancelingOrderPending
          }
          variant="ghost"
          size="xs"
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}

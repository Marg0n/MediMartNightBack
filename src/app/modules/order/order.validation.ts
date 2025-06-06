import { z } from 'zod';
import { paymentStatus, shippingStatus } from './order.constant';

const orderItemValidationSchema = z.object({
  product: z.string(),
  quantity: z.number(),
  price: z.number(),
  name: z.string(),
});

const orderValidationSchema = z.object({
  body: z.object({
    products: z
      .array(orderItemValidationSchema)
      .nonempty('Order must contain at least one product'),
    user: z.string(),
    totalPrice: z.number().optional(),
    shippingStatus: z.enum([...shippingStatus] as [string, ...string[]]).optional(),
    paymentStatus: z.enum([...paymentStatus] as [string, ...string[]]).optional(),
    transactionId: z.string().optional(),
    shippingCost: z.number().optional(),
    isDeleted: z.boolean().optional(),
  }),
});
const updateOrderValidationSchema = z.object({
  products: z.array(orderItemValidationSchema).optional(),
  user: z.string().optional(),
  totalPrice: z.number().optional(),
  shippingStatus: z
    .enum([...shippingStatus] as [string, ...string[]])
    .optional(),
  paymentStatus: z.enum([...paymentStatus] as [string, ...string[]]).optional(),
  transactionId: z.string().optional().optional(),
  isDeleted: z.boolean().optional().optional(),
});

export const OrderValidation = {
  orderValidationSchema,
  updateOrderValidationSchema,
};

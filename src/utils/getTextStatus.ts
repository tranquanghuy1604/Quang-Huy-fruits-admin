import { StatusDeliveryEnum } from '@/enums/app.enum';

export const getTagColor = (status: string) => {
  switch (status) {
    case StatusDeliveryEnum.waiting_confirm:
      return 'Chờ xác nhận';
    case StatusDeliveryEnum.waiting_delivery:
      return 'Đơn đã gửi';
    case StatusDeliveryEnum.pending:
      return 'Đang giao hàng';
    case StatusDeliveryEnum.finish:
      return 'Đã giao hàng';
    case StatusDeliveryEnum.deleted:
      return 'Đã hủy đơn';
  }
};

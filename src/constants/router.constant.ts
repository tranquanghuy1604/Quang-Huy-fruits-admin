export const routerConstants = {
  home: '/',
  login: '/login',
  users: '/nguoi-dung',
  orders: '/don-hang',
  promotion: '/khuyen-mai',
  product: '/san-pham',
  page404: '/404',
  page500: '/500',
};

export const routerPrivate: Array<string | Function> = [
  routerConstants.users,
  routerConstants.orders,
  routerConstants.promotion,
  routerConstants.product,
];

const PATTERN = async () => {
  const URLPattern = (await import('next/server')).URLPattern;
  return [
    new URLPattern({ pathname: '/users' }),
    new URLPattern({ pathname: '/orders' }),
    new URLPattern({ pathname: '/product' }),
    new URLPattern({ pathname: '/promotion' }),
  ];
};

export const isRouterPrivate = async (pathName: string) => {
  return routerPrivate.includes(pathName) || (await checkPattern(pathName));
};

export const checkPattern = async (pathName: string) => {
  const patterns = await PATTERN();
  for (let pattern of patterns) {
    if (pattern.test({ pathname: pathName })) {
      return true;
    }
  }
  return false;
};

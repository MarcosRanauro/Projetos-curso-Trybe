const SALE_ID_KEY = 'sale_id';
const PRODUCT_ID_KEY = 'product_id';

const salesFromDB = [
  {
    [SALE_ID_KEY]: 1,
    date: '2021-09-09T04:54:29.000Z',
    [PRODUCT_ID_KEY]: 1,
    quantity: 2,
  },
  {
    [SALE_ID_KEY]: 1,
    date: '2021-09-09T04:54:54.000Z',
    [PRODUCT_ID_KEY]: 2,
    quantity: 2,
  },
];

const saleFromDB = {
  [SALE_ID_KEY]: 1,
  date: '2021-09-09T04:54:29.000Z',
  [PRODUCT_ID_KEY]: 1,
  quantity: 2,
};

const salesFromModel = [
  {
    saleId: 1,
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];

const saleFromModel = {
  saleId: 1,
  date: '2021-09-09T04:54:29.000Z',
  productId: 1,
  quantity: 2,
};

const nextSaleId = {
  insertId: 2,
};

const saleFromService = {
  id: 2,
  itemsSold: [
    {
      productId: 1,
      quantity: 2,
    },
    {
      productId: 2,
      quantity: 3,
    },
  ],
};

module.exports = {
  salesFromDB,
  salesFromModel,
  saleFromDB,
  saleFromModel,
  nextSaleId,
  saleFromService,
};
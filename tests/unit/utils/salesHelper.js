const successCreateSale = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
}

const successGetAllSales = [
  {
    "saleId": 1,
    "productId": 1,
    "quantity": 5,
    "date": "2023-04-28T19:50:26.000Z"
  },
  {
    "saleId": 1,
    "productId": 2,
    "quantity": 10,
    "date": "2023-04-28T19:50:26.000Z"
  },
  {
    "saleId": 2,
    "productId": 3,
    "quantity": 15,
    "date": "2023-04-28T19:50:26.000Z"
  }
]

const successGetById = [
  {
    "productId": 1,
    "quantity": 5,
    "date": "2023-04-28T20:02:27.000Z"
  },
  {
    "productId": 2,
    "quantity": 10,
    "date": "2023-04-28T20:02:27.000Z"
  }
]

module.exports = { successCreateSale, successGetAllSales, successGetById };
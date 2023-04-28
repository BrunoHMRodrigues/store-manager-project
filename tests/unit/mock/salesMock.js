const mockCreateSale = [
  {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 3,
    "info": "",
    "serverStatus": 2,
    "warningStatus": 0
  },
  null
]

const mockGetAll = [
  [
    {
      saleId: 1,
      productId: 1,
      quantity: 5,
      date: '2023-04-28T19:50:26.000Z'
    },
    {
      saleId: 1,
      productId: 2,
      quantity: 10,
      date: '2023-04-28T19:50:26.000Z'
    },
    {
      saleId: 2,
      productId: 3,
      quantity: 15,
      date: '2023-04-28T19:50:26.000Z'
    }
  ],
  [
    {
      _buf: '<Buffer 01 00 00 01 04 3f 00 00 02 03 64 65 66 0c 53 74 6f 72 65 4d 61 6e 61 67 65 72 02 73 70 0e 73 61 6c 65 73 5f 70 72 6f 64 75 63 74 73 06 73 61 6c 65 49 ... 313 more bytes>',
      _clientEncoding: 'utf8',
      _catalogLength: 3,
      _catalogStart: 10,
      _schemaLength: 12,
      _schemaStart: 14,
      _tableLength: 2,
      _tableStart: 27,
      _orgTableLength: 14,
      _orgTableStart: 30,
      _orgNameLength: 7,
      _orgNameStart: 52,
      characterSet: 63,
      encoding: 'binary',
      name: 'saleId',
      columnLength: 11,
      columnType: 3,
      flags: 4097,
      decimals: 0
    },
    {
      _buf: '<Buffer 01 00 00 01 04 3f 00 00 02 03 64 65 66 0c 53 74 6f 72 65 4d 61 6e 61 67 65 72 02 73 70 0e 73 61 6c 65 73 5f 70 72 6f 64 75 63 74 73 06 73 61 6c 65 49 ... 313 more bytes>',
      _clientEncoding: 'utf8',
      _catalogLength: 3,
      _catalogStart: 77,
      _schemaLength: 12,
      _schemaStart: 81,
      _tableLength: 2,
      _tableStart: 94,
      _orgTableLength: 14,
      _orgTableStart: 97,
      _orgNameLength: 10,
      _orgNameStart: 122,
      characterSet: 63,
      encoding: 'binary',
      name: 'productId',
      columnLength: 11,
      columnType: 3,
      flags: 4097,
      decimals: 0
    },
    {
      _buf: '<Buffer 01 00 00 01 04 3f 00 00 02 03 64 65 66 0c 53 74 6f 72 65 4d 61 6e 61 67 65 72 02 73 70 0e 73 61 6c 65 73 5f 70 72 6f 64 75 63 74 73 06 73 61 6c 65 49 ... 313 more bytes>',
      _clientEncoding: 'utf8',
      _catalogLength: 3,
      _catalogStart: 150,
      _schemaLength: 12,
      _schemaStart: 154,
      _tableLength: 2,
      _tableStart: 167,
      _orgTableLength: 14,
      _orgTableStart: 170,
      _orgNameLength: 8,
      _orgNameStart: 194,
      characterSet: 63,
      encoding: 'binary',
      name: 'quantity',
      columnLength: 11,
      columnType: 3,
      flags: 4097,
      decimals: 0
    },
    {
      _buf: '<Buffer 01 00 00 01 04 3f 00 00 02 03 64 65 66 0c 53 74 6f 72 65 4d 61 6e 61 67 65 72 02 73 70 0e 73 61 6c 65 73 5f 70 72 6f 64 75 63 74 73 06 73 61 6c 65 49 ... 313 more bytes>',
      _clientEncoding: 'utf8',
      _catalogLength: 3,
      _catalogStart: 220,
      _schemaLength: 12,
      _schemaStart: 224,
      _tableLength: 1,
      _tableStart: 237,
      _orgTableLength: 5,
      _orgTableStart: 239,
      _orgNameLength: 4,
      _orgNameStart: 250,
      characterSet: 63,
      encoding: 'binary',
      name: 'date',
      columnLength: 19,
      columnType: 12,
      flags: 128,
      decimals: 0
    }
  ]
]

const mockGetById = [
  [
    {
      productId: 1,
      quantity: 5,
      date: '2023-04-28T20:02:27.000Z'
    },
    {
      productId: 2,
      quantity: 10,
      date: '2023-04-28T20:02:27.000Z'
    }
  ],
  [
    {
      _buf: '<Buffer 01 00 00 01 03 45 00 00 02 03 64 65 66 0c 53 74 6f 72 65 4d 61 6e 61 67 65 72 02 73 70 0e 73 61 6c 65 73 5f 70 72 6f 64 75 63 74 73 09 70 72 6f 64 75 ... 212 more bytes>',
      _clientEncoding: 'utf8',
      _catalogLength: 3,
      _catalogStart: 10,
      _schemaLength: 12,
      _schemaStart: 14,
      _tableLength: 2,
      _tableStart: 27,
      _orgTableLength: 14,
      _orgTableStart: 30,
      _orgNameLength: 10,
      _orgNameStart: 55,
      characterSet: 63,
      encoding: 'binary',
      name: 'productId',
      columnLength: 11,
      columnType: 3,
      flags: 20489,
      decimals: 0
    },
    {
      _buf: '<Buffer 01 00 00 01 03 45 00 00 02 03 64 65 66 0c 53 74 6f 72 65 4d 61 6e 61 67 65 72 02 73 70 0e 73 61 6c 65 73 5f 70 72 6f 64 75 63 74 73 09 70 72 6f 64 75 ... 212 more bytes>',
      _clientEncoding: 'utf8',
      _catalogLength: 3,
      _catalogStart: 83,
      _schemaLength: 12,
      _schemaStart: 87,
      _tableLength: 2,
      _tableStart: 100,
      _orgTableLength: 14,
      _orgTableStart: 103,
      _orgNameLength: 8,
      _orgNameStart: 127,
      characterSet: 63,
      encoding: 'binary',
      name: 'quantity',
      columnLength: 11,
      columnType: 3,
      flags: 4097,
      decimals: 0
    },
    {
      _buf: '<Buffer 01 00 00 01 03 45 00 00 02 03 64 65 66 0c 53 74 6f 72 65 4d 61 6e 61 67 65 72 02 73 70 0e 73 61 6c 65 73 5f 70 72 6f 64 75 63 74 73 09 70 72 6f 64 75 ... 212 more bytes>',
      _clientEncoding: 'utf8',
      _catalogLength: 3,
      _catalogStart: 153,
      _schemaLength: 12,
      _schemaStart: 157,
      _tableLength: 1,
      _tableStart: 170,
      _orgTableLength: 5,
      _orgTableStart: 172,
      _orgNameLength: 4,
      _orgNameStart: 183,
      characterSet: 63,
      encoding: 'binary',
      name: 'date',
      columnLength: 19,
      columnType: 12,
      flags: 128,
      decimals: 0
    }
  ]
]

module.exports = { mockCreateSale, mockGetAll, mockGetById };
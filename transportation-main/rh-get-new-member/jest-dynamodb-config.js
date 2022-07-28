module.exports = {
  tables: [
    {
      AttributeDefinitions: [
        {
          AttributeName: 'circulo_member_id',
          AttributeType: 'S',
        },
        {
          AttributeName: 'service_provider',
          AttributeType: 'S',
        },
        {
          AttributeName: 'status',
          AttributeType: 'S',
        },
      ],
      TableName: 'passenger',
      KeySchema: [
        {
          AttributeName: 'circulo_member_id',
          KeyType: 'HASH',
        },
      ],
      TableStatus: 'ACTIVE',
      CreationDateTime: '2021-09-13T15:47:39.511000-05:00',
      ProvisionedThroughput: {
        LastDecreaseDateTime: '2021-09-13T15:48:52.359000-05:00',
        NumberOfDecreasesToday: 0,
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
      TableSizeBytes: 918,
      ItemCount: 4,
      TableArn: 'arn:aws:dynamodb:us-east-2:395441376902:table/passenger',
      TableId: 'dd392e49-5121-47a1-9d70-0dda27688fb6',
      GlobalSecondaryIndexes: [
        {
          IndexName: 'service_provider-index',
          KeySchema: [
            {
              AttributeName: 'service_provider',
              KeyType: 'HASH',
            },
          ],
          Projection: {
            ProjectionType: 'ALL',
          },
          IndexStatus: 'ACTIVE',
          ProvisionedThroughput: {
            NumberOfDecreasesToday: 0,
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
          IndexSizeBytes: 918,
          ItemCount: 4,
          IndexArn:
            'arn:aws:dynamodb:us-east-2:395441376902:table/passenger/index/service_provider-index',
        },
        {
          IndexName: 'status-index',
          KeySchema: [
            {
              AttributeName: 'status',
              KeyType: 'HASH',
            },
          ],
          Projection: {
            ProjectionType: 'ALL',
          },
          IndexStatus: 'ACTIVE',
          ProvisionedThroughput: {
            NumberOfDecreasesToday: 0,
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
          IndexSizeBytes: 918,
          ItemCount: 4,
          IndexArn: 'arn:aws:dynamodb:us-east-2:395441376902:table/passenger/index/status-index',
        },
      ],
    },
  ],
};

/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCollectionCard = /* GraphQL */ `
  query GetCollectionCard($id: ID!) {
    getCollectionCard(id: $id) {
      id
      cardID
      quantity
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listCollectionCards = /* GraphQL */ `
  query ListCollectionCards(
    $filter: ModelCollectionCardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCollectionCards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        cardID
        quantity
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const searchCollectionCards = /* GraphQL */ `
  query SearchCollectionCards(
    $filter: SearchableCollectionCardFilterInput
    $sort: [SearchableCollectionCardSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableCollectionCardAggregationInput]
  ) {
    searchCollectionCards(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        cardID
        quantity
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
              __typename
            }
          }
        }
        __typename
      }
      __typename
    }
  }
`;
export const getCard = /* GraphQL */ `
  query GetCard($id: ID!) {
    getCard(id: $id) {
      id
      name
      color
      text
      cost
      number
      alternate
      setID
      set {
        id
        name
        releaseType
        releaseOrder
        createdAt
        updatedAt
        __typename
      }
      image
      cardType
      attribute
      power
      life
      counter
      trigger
      characterType
      rotation
      rarity
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listCards = /* GraphQL */ `
  query ListCards(
    $filter: ModelCardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        color
        text
        cost
        number
        alternate
        setID
        image
        cardType
        attribute
        power
        life
        counter
        trigger
        characterType
        rotation
        rarity
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const cardsBySetID = /* GraphQL */ `
  query CardsBySetID(
    $setID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    cardsBySetID(
      setID: $setID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        color
        text
        cost
        number
        alternate
        setID
        image
        cardType
        attribute
        power
        life
        counter
        trigger
        characterType
        rotation
        rarity
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const searchCards = /* GraphQL */ `
  query SearchCards(
    $filter: SearchableCardFilterInput
    $sort: [SearchableCardSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableCardAggregationInput]
  ) {
    searchCards(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        name
        color
        text
        cost
        number
        alternate
        setID
        image
        cardType
        attribute
        power
        life
        counter
        trigger
        characterType
        rotation
        rarity
        createdAt
        updatedAt
        __typename
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
              __typename
            }
          }
        }
        __typename
      }
      __typename
    }
  }
`;
export const getSet = /* GraphQL */ `
  query GetSet($id: ID!) {
    getSet(id: $id) {
      id
      name
      releaseType
      cards {
        nextToken
        __typename
      }
      releaseOrder
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listSets = /* GraphQL */ `
  query ListSets(
    $filter: ModelSetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        releaseType
        releaseOrder
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const searchSets = /* GraphQL */ `
  query SearchSets(
    $filter: SearchableSetFilterInput
    $sort: [SearchableSetSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableSetAggregationInput]
  ) {
    searchSets(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        name
        releaseType
        releaseOrder
        createdAt
        updatedAt
        __typename
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
              __typename
            }
          }
        }
        __typename
      }
      __typename
    }
  }
`;

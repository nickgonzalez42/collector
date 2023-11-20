/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCollectionCard = /* GraphQL */ `
  query GetCollectionCard($id: ID!) {
    getCollectionCard(id: $id) {
      id
      collectionID
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
        collectionID
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
export const getCollection = /* GraphQL */ `
  query GetCollection($id: ID!) {
    getCollection(id: $id) {
      id
      CollectionCards {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listCollections = /* GraphQL */ `
  query ListCollections(
    $filter: ModelCollectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCollections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
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
export const collectionCardsByCollectionID = /* GraphQL */ `
  query CollectionCardsByCollectionID(
    $collectionID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCollectionCardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    collectionCardsByCollectionID(
      collectionID: $collectionID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        collectionID
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
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getSet = /* GraphQL */ `
  query GetSet($id: ID!) {
    getSet(id: $id) {
      id
      name
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

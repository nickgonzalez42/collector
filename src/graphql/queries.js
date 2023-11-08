/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      image
      type
      attribute
      power
      life
      counter
      trigger
      set {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listCards = /* GraphQL */ `
  query ListCards($filter: ModelCardFilterInput, $limit: Int, $nextToken: String) {
    listCards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        color
        text
        cost
        number
        alternate
        type
        setID
        image
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
    cardsBySetID(setID: $setID, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        color
        text
        cost
        number
        alternate
        type
        setID
        image
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listSets = /* GraphQL */ `
  query ListSets($filter: ModelSetFilterInput, $limit: Int, $nextToken: String) {
    listSets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

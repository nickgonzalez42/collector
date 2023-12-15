/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCollectionCard = /* GraphQL */ `
  subscription OnCreateCollectionCard(
    $filter: ModelSubscriptionCollectionCardFilterInput
    $owner: String
  ) {
    onCreateCollectionCard(filter: $filter, owner: $owner) {
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
export const onUpdateCollectionCard = /* GraphQL */ `
  subscription OnUpdateCollectionCard(
    $filter: ModelSubscriptionCollectionCardFilterInput
    $owner: String
  ) {
    onUpdateCollectionCard(filter: $filter, owner: $owner) {
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
export const onDeleteCollectionCard = /* GraphQL */ `
  subscription OnDeleteCollectionCard(
    $filter: ModelSubscriptionCollectionCardFilterInput
    $owner: String
  ) {
    onDeleteCollectionCard(filter: $filter, owner: $owner) {
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
export const onCreateCard = /* GraphQL */ `
  subscription OnCreateCard($filter: ModelSubscriptionCardFilterInput) {
    onCreateCard(filter: $filter) {
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
export const onUpdateCard = /* GraphQL */ `
  subscription OnUpdateCard($filter: ModelSubscriptionCardFilterInput) {
    onUpdateCard(filter: $filter) {
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
export const onDeleteCard = /* GraphQL */ `
  subscription OnDeleteCard($filter: ModelSubscriptionCardFilterInput) {
    onDeleteCard(filter: $filter) {
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
export const onCreateSet = /* GraphQL */ `
  subscription OnCreateSet($filter: ModelSubscriptionSetFilterInput) {
    onCreateSet(filter: $filter) {
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
export const onUpdateSet = /* GraphQL */ `
  subscription OnUpdateSet($filter: ModelSubscriptionSetFilterInput) {
    onUpdateSet(filter: $filter) {
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
export const onDeleteSet = /* GraphQL */ `
  subscription OnDeleteSet($filter: ModelSubscriptionSetFilterInput) {
    onDeleteSet(filter: $filter) {
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

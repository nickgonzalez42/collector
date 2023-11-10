/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      image
      cardType
      attribute
      power
      life
      counter
      triggerText
      characterType
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
      image
      cardType
      attribute
      power
      life
      counter
      triggerText
      characterType
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
      image
      cardType
      attribute
      power
      life
      counter
      triggerText
      characterType
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
export const onCreateSet = /* GraphQL */ `
  subscription OnCreateSet($filter: ModelSubscriptionSetFilterInput) {
    onCreateSet(filter: $filter) {
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
export const onUpdateSet = /* GraphQL */ `
  subscription OnUpdateSet($filter: ModelSubscriptionSetFilterInput) {
    onUpdateSet(filter: $filter) {
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
export const onDeleteSet = /* GraphQL */ `
  subscription OnDeleteSet($filter: ModelSubscriptionSetFilterInput) {
    onDeleteSet(filter: $filter) {
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

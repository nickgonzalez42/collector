/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCollectionCard = /* GraphQL */ `
  mutation CreateCollectionCard($input: CreateCollectionCardInput!, $condition: ModelCollectionCardConditionInput) {
    createCollectionCard(input: $input, condition: $condition) {
      id
      collectionID
      cardID
      quantity
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateCollectionCard = /* GraphQL */ `
  mutation UpdateCollectionCard($input: UpdateCollectionCardInput!, $condition: ModelCollectionCardConditionInput) {
    updateCollectionCard(input: $input, condition: $condition) {
      id
      collectionID
      cardID
      quantity
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteCollectionCard = /* GraphQL */ `
  mutation DeleteCollectionCard($input: DeleteCollectionCardInput!, $condition: ModelCollectionCardConditionInput) {
    deleteCollectionCard(input: $input, condition: $condition) {
      id
      collectionID
      cardID
      quantity
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createCollection = /* GraphQL */ `
  mutation CreateCollection($input: CreateCollectionInput!, $condition: ModelCollectionConditionInput) {
    createCollection(input: $input, condition: $condition) {
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
export const updateCollection = /* GraphQL */ `
  mutation UpdateCollection($input: UpdateCollectionInput!, $condition: ModelCollectionConditionInput) {
    updateCollection(input: $input, condition: $condition) {
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
export const deleteCollection = /* GraphQL */ `
  mutation DeleteCollection($input: DeleteCollectionInput!, $condition: ModelCollectionConditionInput) {
    deleteCollection(input: $input, condition: $condition) {
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
export const createCard = /* GraphQL */ `
  mutation CreateCard($input: CreateCardInput!, $condition: ModelCardConditionInput) {
    createCard(input: $input, condition: $condition) {
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
export const updateCard = /* GraphQL */ `
  mutation UpdateCard($input: UpdateCardInput!, $condition: ModelCardConditionInput) {
    updateCard(input: $input, condition: $condition) {
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
export const deleteCard = /* GraphQL */ `
  mutation DeleteCard($input: DeleteCardInput!, $condition: ModelCardConditionInput) {
    deleteCard(input: $input, condition: $condition) {
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
export const createSet = /* GraphQL */ `
  mutation CreateSet($input: CreateSetInput!, $condition: ModelSetConditionInput) {
    createSet(input: $input, condition: $condition) {
      id
      name
      releaseOrder
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
export const updateSet = /* GraphQL */ `
  mutation UpdateSet($input: UpdateSetInput!, $condition: ModelSetConditionInput) {
    updateSet(input: $input, condition: $condition) {
      id
      name
      releaseOrder
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
export const deleteSet = /* GraphQL */ `
  mutation DeleteSet($input: DeleteSetInput!, $condition: ModelSetConditionInput) {
    deleteSet(input: $input, condition: $condition) {
      id
      name
      releaseOrder
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

import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { Button, Flex, Heading, Text, TextField, View } from "@aws-amplify/ui-react";
import { createCollection as createCollectionMutation } from "../graphql/mutations";
import { listCollections } from "../graphql/queries";

const CollectionTest = ({ signOut }) => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetchCollections();
  }, []);

  async function fetchCollections() {
    try {
      const apiData = await API.graphql({ query: listCollections });
      console.log("API Data:", apiData);
      const collectionsFromAPI = apiData.data.listCollections.items;
      console.log("Collections:", collectionsFromAPI);
      setCollections(collectionsFromAPI);
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  }

  async function createCollection(event) {
    event.preventDefault();
    const input = {
      /* your input fields here */
    };
    try {
      const response = await API.graphql({
        query: createCollectionMutation,
        variables: { input },
      });
      console.log(createCollectionMutation);
      console.log("Create Collection Response:", response);
      fetchCollections();
      event.target.reset();
    } catch (error) {
      console.error("Error creating collection:", error);
    }
  }

  return (
    <View className="App">
      <Heading level={1}>My Notes App</Heading>
      <View as="form" margin="3rem 0" onSubmit={createCollection}>
        <Flex direction="row" justifyContent="center">
          <Button type="submit" variation="primary">
            Create Collection
          </Button>
        </Flex>
      </View>
      <Heading level={2}>Current Notes</Heading>
      <View margin="3rem 0">
        {collections.map((collection) => (
          <Flex key={collection.id} direction="row" justifyContent="center" alignItems="center">
            <Text as="strong" fontWeight={700}>
              {collection.id}
            </Text>
          </Flex>
        ))}
      </View>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default CollectionTest;

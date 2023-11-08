import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { API } from "aws-amplify";
import { Button, Flex, Heading, Text, TextField, View, withAuthenticator } from "@aws-amplify/ui-react";
import { listSets } from "./graphql/queries";
import { CardIndex } from "./CardIndex";
import "./App.css";
import "./tailwind.generated.css";

const App = ({ signOut }) => {
  const [sets, setSets] = useState([]);

  useEffect(() => {
    fetchSets();
  }, []);

  async function fetchSets() {
    const apiData = await API.graphql({ query: listSets });
    const setsFromAPI = apiData.data.listSets.items;
    setSets(setsFromAPI);
  }

  return (
    <div className="App">
      <header className="App-header">Set</header>
      {sets.map((set) => (
        <p>{set.name}</p>
      ))}
    </div>
    // <View className="App">
    //   <Heading level={1}>Sets</Heading>
    //   <Heading level={2}>Current Sets</Heading>
    //   <View margin="3rem 0">
    //     {sets.map((set) => (
    //       <Flex key={set.id || set.name} direction="row" justifyContent="center" alignItems="center">
    //         <Text as="strong" fontWeight={700}>
    //           {set.name}
    //         </Text>
    //         <CardIndex setId={set.id} />
    //       </Flex>
    //     ))}
    //   </View>
    //   <Button onClick={signOut}>Sign Out</Button>
    // </View>
  );
};

// export default withAuthenticator(App);
export default App;

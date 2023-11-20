import React, { useEffect } from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Authenticator } from "@aws-amplify/ui-react";
import { API, graphqlOperation } from "aws-amplify";
import { listCollections } from "../graphql/queries";
import { createCollection as createCollectionMutation } from "../graphql/mutations";
import { Button } from "@aws-amplify/ui-react";

function LoginTest() {
  const [collections, setCollections] = React.useState([]);

  useEffect(() => {
    fetchCollections();
  }, []);

  async function fetchCollections() {
    try {
      const collectionData = await API.graphql(graphqlOperation(listCollections));
      const collections = collectionData.data.listCollections.items;

      setCollections(collections);
    } catch (err) {
      console.log("error fetching collections", err);
    }
  }

  // React.useEffect(() => {
  //   async function fetchCollections() {
  //     try {
  //       const collectionData = await API.graphql(graphqlOperation(listCollections));
  //       const collections = collectionData.data.listCollections.items;

  //       setCollections(collections);
  //     } catch (err) {
  //       console.log("error fetching collections", err);
  //     }
  //   }

  //   fetchCollections();
  // });

  async function createCollection() {
    const input = {
      /* your input fields here */
    };
    try {
      const response = await API.graphql({
        query: createCollectionMutation,
        variables: { input },
      });
      console.log("Create Collection Response:", response);
      fetchCollections();
    } catch (error) {
      console.error("Error creating collection:", error);
    }
  }

  return (
    <div>
      <Authenticator>
        {({ signOut, user }) => (
          <main>
            <h1>Hello {user.username}</h1>
            <button onClick={signOut}>Sign out</button>
          </main>
        )}
      </Authenticator>
      {collections.map((collection) => (
        <p>{collection.id}</p>
      ))}
      <Button onClick={createCollection}>Create Collection</Button>
    </div>
  );
}

export default withAuthenticator(LoginTest);

// import { Authenticator } from "@aws-amplify/ui-react";
// import "@aws-amplify/ui-react/styles.css";
// export default function App() {
//   return (
//     <div>
//       <Authenticator>
//         {({ signOut, user }) => (
//           <main>
//             <h1>Hello {user.username}</h1>
//             <button onClick={signOut}>Sign out</button>
//           </main>
//         )}
//       </Authenticator>
//     </div>
//   );
// }

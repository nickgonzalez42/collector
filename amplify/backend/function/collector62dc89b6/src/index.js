/* Amplify Params - DO NOT EDIT
	API_COLLECTOR_GRAPHQLAPIENDPOINTOUTPUT
	API_COLLECTOR_GRAPHQLAPIIDOUTPUT
	API_COLLECTOR_GRAPHQLAPIKEYOUTPUT
	AUTH_COLLECTOREEADF39A_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

// import crypto from "@aws-crypto/sha256-js";
// import { defaultProvider } from "@aws-sdk/credential-provider-node";
// import { SignatureV4 } from "@aws-sdk/signature-v4";
// import { HttpRequest } from "@aws-sdk/protocol-http";
// import { default as fetch, Request } from "node-fetch";

// const GRAPHQL_ENDPOINT = process.env.API_COLLECTOR_GRAPHQLAPIENDPOINTOUTPUT;
// const AWS_REGION = process.env.AWS_REGION || "us-east-2";
// const GRAPHQL_API_KEY = process.env.API_COLLECTOR_GRAPHQLAPIKEYOUTPUT;
// const { Sha256 } = crypto;

// const query = /* GraphQL */ `
//   query ListSets($filter: ModelSetFilterInput, $limit: Int, $nextToken: String) {
//     listSets(filter: $filter, limit: $limit, nextToken: $nextToken) {
//       items {
//         id
//         name
//         releaseOrder
//         createdAt
//         updatedAt
//         __typename
//       }
//       nextToken
//       __typename
//     }
//   }
// `;
// const mutation = /* GraphQL */ `
//   mutation CreateCollection($input: CreateCollectionInput!, $condition: ModelCollectionConditionInput) {
//     createCollection(input: $input, condition: $condition) {
//       id
//       CollectionCards {
//         nextToken
//         __typename
//       }
//       createdAt
//       updatedAt
//       owner
//       __typename
//     }
//   }
// `;

// /**
//  * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
//  */

// export const handler = async (event) => {
//   console.log("Authentication successful");
//   console.log("Trigger function =", event.triggerSource);
//   console.log("User pool = ", event.userPoolId);
//   console.log("App client ID = ", event.callerContext.clientId);
//   console.log("User ID = ", event.userName); //THIS WORKS FOR USER ID

//   console.log(`EVENT: ${JSON.stringify(event)}`);
//   console.log(`API KEY: ${GRAPHQL_API_KEY}`);

//   const endpoint = new URL(GRAPHQL_ENDPOINT);

//   const signer = new SignatureV4({
//     credentials: defaultProvider(),
//     region: AWS_REGION,
//     service: "appsync",
//     sha256: Sha256,
//   });

//   const queryRequestToBeSigned = new HttpRequest({
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "x-api-key": GRAPHQL_API_KEY,
//       host: endpoint.host,
//     },
//     hostname: endpoint.host,
//     body: JSON.stringify({ query }),
//     path: endpoint.pathname,
//   });

//   const variables = {
//     input: {
//       owner: event.userName,
//     },
//   };

//   const mutationRequestToBeSigned = new HttpRequest({
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       host: endpoint.host,
//     },
//     hostname: endpoint.host,
//     body: JSON.stringify({ mutation, variables }),
//     path: endpoint.pathname,
//   });

//   const signed = await signer.sign(queryRequestToBeSigned);
//   const request = new Request(endpoint, signed);

//   let statusCode = 200;
//   let body;
//   let response;

//   try {
//     response = await fetch(request);
//     body = await response.json();
//     console.log("WORKED?");
//     JSON.stringify(body, null, 4);
//     if (body.errors) statusCode = 400;
//   } catch (error) {
//     console.log(error.message);
//     statusCode = 500;
//     body = {
//       errors: [
//         {
//           message: error.message,
//         },
//       ],
//     };
//   }

//   return {
//     statusCode,
//     //  Uncomment below to enable CORS requests
//     // headers: {
//     //   "Access-Control-Allow-Origin": "*",
//     //   "Access-Control-Allow-Headers": "*"
//     // },
//     body: JSON.stringify(body),
//   };
// };

import { default as fetch, Request } from "node-fetch";
import AWS from "aws-sdk";

const GRAPHQL_ENDPOINT = process.env.API_COLLECTOR_GRAPHQLAPIENDPOINTOUTPUT;

const query = /* GraphQL */ `
  mutation MyMutation {
    createCollection(input: {}) {
      id
    }
  }
`;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  // const cognitoIdentityId = event.requestContext.identity.cognitoIdentityId;
  const cognitoIdentityId = event.userName;

  try {
    // Assume the IAM role associated with the Cognito user
    const sts = new AWS.STS();
    const assumedRole = await sts
      .assumeRole({
        RoleArn: "arn:aws:iam::581262876082:role/collectorLambdaRoleeb48f61c-staging",
        RoleSessionName: cognitoIdentityId,
      })
      .promise();

    console.log("ROLE");
    console.log(assumedRole);

    // Use the temporary credentials to make the GraphQL mutation request
    const credentials = {
      accessKeyId: assumedRole.Credentials.AccessKeyId,
      secretAccessKey: assumedRole.Credentials.SecretAccessKey,
      sessionToken: assumedRole.Credentials.SessionToken,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    };

    const request = new Request(GRAPHQL_ENDPOINT, options);

    const response = await fetch(request);
    const responseBody = await response.json();

    // Handle the GraphQL response as needed
    console.log("GraphQL Response:", responseBody);

    return {
      statusCode: 200,
      body: JSON.stringify("Mutation successful"),
    };
  } catch (error) {
    console.error("Error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify("Error occurred"),
    };
  }
};

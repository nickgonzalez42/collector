/* Amplify Params - DO NOT EDIT
	API_COLLECTOR_GRAPHQLAPIENDPOINTOUTPUT
	API_COLLECTOR_GRAPHQLAPIIDOUTPUT
	API_COLLECTOR_GRAPHQLAPIKEYOUTPUT
	AUTH_COLLECTOREEADF39A_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import crypto from "@aws-crypto/sha256-js";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { HttpRequest } from "@aws-sdk/protocol-http";
import { default as fetch, Request } from "node-fetch";

const GRAPHQL_ENDPOINT = process.env.API_COLLECTOR_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || "us-east-2";
const GRAPHQL_API_KEY = process.env.API_COLLECTOR_GRAPHQLAPIKEYOUTPUT;
const { Sha256 } = crypto;

const query = /* GraphQL */ `
  query ListSets($filter: ModelSetFilterInput, $limit: Int, $nextToken: String) {
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

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  console.log(`API KEY: ${GRAPHQL_API_KEY}`);

  const endpoint = new URL(GRAPHQL_ENDPOINT);

  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: "appsync",
    sha256: Sha256,
  });

  const requestToBeSigned = new HttpRequest({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": GRAPHQL_API_KEY,
      host: endpoint.host,
    },
    hostname: endpoint.host,
    body: JSON.stringify({ query }),
    path: endpoint.pathname,
  });

  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(endpoint, signed);

  let statusCode = 200;
  let body;
  let response;

  try {
    response = await fetch(request);
    body = await response.json();
    if (body.errors) statusCode = 400;
  } catch (error) {
    statusCode = 500;
    body = {
      errors: [
        {
          message: error.message,
        },
      ],
    };
  }

  return {
    statusCode,
    //  Uncomment below to enable CORS requests
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Headers": "*"
    // },
    body: JSON.stringify(body),
  };
};

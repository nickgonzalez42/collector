/* Amplify Params - DO NOT EDIT
	API_COLLECTOR_CARDTABLE_ARN
	API_COLLECTOR_CARDTABLE_NAME
	API_COLLECTOR_GRAPHQLAPIENDPOINTOUTPUT
	API_COLLECTOR_GRAPHQLAPIIDOUTPUT
	API_COLLECTOR_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import crypto from "@aws-crypto/sha256-js";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { HttpRequest } from "@aws-sdk/protocol-http";
import { default as fetch, Request } from "node-fetch";

const GRAPHQL_ENDPOINT = process.env.API_COLLECTOR_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_COLLECTOR_GRAPHQLAPIKEYOUTPUT;
const AWS_REGION = process.env.AWS_REGION || "us-east-1";
const { Sha256 } = crypto;

const createCard = /* GraphQL */ `
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
      createdAt
      updatedAt
      __typename
    }
  }
`;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const cardData = {
    name: "Shanks",
    color: "PURPLE",
    text: "[Activate: Main] [Once Per Turn] DON!! −3 (You may return the specified number of DON!! cards from your field to your DON!! deck.): All of your {FILM} type Characters gain +2000 power during this turn.",
    cost: null,
    number: "ST05-001",
    alternate: false,
    setID: "9d4ca89f-8604-4ed3-a1fd-4358763c6ae9",
    image: "ST05/ST05-001.png",
    cardType: "LEADER",
    attribute: "SLASH",
    power: 5000,
    life: 5,
    counter: null,
    trigger: null,
    characterType: ["FILM", "RED_HAIRED_PIRATES", "THE_FOUR_EMPERORS"],
    rotation: 1,
  };

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
    body: JSON.stringify({
      query: createCard,
      variables: {
        input: cardData,
      },
    }),
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

  console.log(body);
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

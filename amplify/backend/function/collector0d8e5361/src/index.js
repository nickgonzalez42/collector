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
import AWS from "aws-sdk";
import csvParser from "csv-parser";

const s3 = new AWS.S3();

const GRAPHQL_ENDPOINT = process.env.API_COLLECTOR_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_COLLECTOR_GRAPHQLAPIKEYOUTPUT;
const AWS_REGION = process.env.AWS_REGION || "us-east-2";
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
      rarity
      createdAt
      updatedAt
      __typename
    }
  }
`;

function processCard(card) {
  card.color = card.color.split("/");
  card.characterType = card.characterType.split("/");
  if (card.cost) {
    card.cost = parseInt(card.cost);
  } else {
    card.cost = null;
  }
  if (card.life) {
    card.life = parseInt(card.life);
  } else {
    card.life = null;
  }
  if (card.counter) {
    card.counter = parseInt(card.counter);
  } else {
    card.counter = null;
  }
  if (!card.attribute) {
    card.attribute = null;
  }
  if (!card.trigger) {
    card.trigger = null;
  }
  if (!card.power) {
    card.power = null;
  }
  return card;
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const endpoint = new URL(GRAPHQL_ENDPOINT);

  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: "appsync",
    sha256: Sha256,
  });

  let statusCode = 200;
  let body;

  try {
    const bucket = event.Records[0].s3.bucket.name;
    const key = event.Records[0].s3.object.key;

    // Read the CSV file from S3
    const params = { Bucket: bucket, Key: key };
    const file = s3.getObject(params).createReadStream();
    const results = [];

    await new Promise((resolve, reject) => {
      file
        .pipe(csvParser())
        .on("data", function (data) {
          data = processCard(data);

          results.push(data);
        })
        .on("end", () => {
          resolve();
        })
        .on("error", (error) => {
          reject(error);
        });
    });

    for (const obj of results) {
      console.log(obj);
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
            input: obj, // Use the current object from the CSV
          },
        }),
        path: endpoint.pathname,
      });

      const signed = await signer.sign(requestToBeSigned);
      const request = new Request(endpoint, signed);

      const response = await fetch(request);
      const responseBody = await response.json();
      console.log(responseBody);

      if (responseBody.errors) {
        statusCode = 400;
        body = responseBody;
        break; // Stop processing on the first error
      }
    }
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

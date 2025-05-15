import { GoogleGenAI } from "@google/genai";
import { ID, Query } from "appwrite";
import { data, type ActionFunctionArgs } from "react-router";
import { appwriteConfig, database } from "~/appwrite/client";
import { createProduct } from "~/lib/stripe";
import { parseMarkdownToJson, parseTripData } from "~/lib/utils";

export const action = async ({ request }: ActionFunctionArgs) => {
  const {
    country,
    numberOfDays,
    travelStyle,
    interests,
    budget,
    groupType,
    userId,
  } = await request.json();

  const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  const unsplashApiKey = process.env.UNSPLASH_ACCESS_KEY!;

  try {
    const prompt = `Generate a ${numberOfDays}-day travel itinerary for ${country} based on the following user information:
        Budget: '${budget}'
        Interests: '${interests}'
        TravelStyle: '${travelStyle}'
        GroupType: '${groupType}'
        Return the itinerary and lowest estimated price in a clean, non-markdown JSON format with the following structure:
        {
        "name": "A descriptive title for the trip",
        "description": "A brief description of the trip and its highlights not exceeding 100 words",
        "estimatedPrice": "Lowest average price for the trip in USD, e.g.$price",
        "duration": ${numberOfDays},
        "budget": "${budget}",
        "travelStyle": "${travelStyle}",
        "country": "${country}",
        "interests": ${interests},
        "groupType": "${groupType}",
        "bestTimeToVisit": [
          '🌸 Season (from month to month): reason to visit',
          '☀️ Season (from month to month): reason to visit',
          '🍁 Season (from month to month): reason to visit',
          '❄️ Season (from month to month): reason to visit'
        ],
        "weatherInfo": [
          '☀️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
          '🌦️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
          '🌧️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
          '❄️ Season: temperature range in Celsius (temperature range in Fahrenheit)'
        ],
        "location": {
          "city": "name of the city or region",
          "coordinates": [latitude, longitude],
          "openStreetMap": "link to open street map"
        },
        "itinerary": [
        {
          "day": 1,
          "location": "City/Region Name",
          "activities": [
            {"time": "Morning", "description": "🏰 Visit the local historic castle and enjoy a scenic walk"},
            {"time": "Afternoon", "description": "🖼️ Explore a famous art museum with a guided tour"},
            {"time": "Evening", "description": "🍷 Dine at a rooftop restaurant with local wine"}
          ]
        },
        ...
        ]
    }`;

    const textResult = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    if (!textResult.text) {
      throw new Error("No text result from Gemini AI");
    }

    const trip = parseMarkdownToJson(textResult.text);

    const imageResponse = await fetch(
      `https://api.unsplash.com/search/photos?query=${country} ${interests} ${travelStyle}&client_id=${unsplashApiKey}`
    );

    const imageUrls = (await imageResponse.json()).results
      .slice(0, 3)
      .map((result: any) => result.urls?.regular || null);

    const result = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.tripCollectionId,
      ID.unique(),
      {
        tripDetails: JSON.stringify(trip),
        createdAt: new Date().toISOString(),
        imageUrls,
        userId,
      }
    );

    const tripDetails = parseTripData(result.tripDetails) as Trip;
    const tripPrice = parseInt(tripDetails.estimatedPrice.replace("$", ""), 10);
    const paymentLink = await createProduct(
      tripDetails.name,
      tripDetails.description,
      imageUrls,
      tripPrice,
      result.$id
    );

    await database.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.tripCollectionId,
      result.$id,
      {
        payment_link: paymentLink.url,
      }
    );

    const userData = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", userId), Query.select(["$id", "tripsCreated"])]
    );

    const { $id, tripsCreated } = userData.documents[0];
    const currentTrips = tripsCreated;

    await database.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      $id,
      {
        tripsCreated: currentTrips + 1,
      }
    );

    return data({ id: result.$id });
  } catch (e) {
    console.error("Error generating travel plan: ", e);
  }
};

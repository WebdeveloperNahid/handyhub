import { ObjectId } from "mongodb";
import { userCollection } from "../config/db";

export const updateProfile = async (
    userId: string,
    name: string,
    image: string
) => {
    const result = await userCollection.updateOne(
        { _id: new ObjectId(userId) },
        {
            $set: {
                name,
                image,
                updatedAt: new Date(),
            },
        }
    );

    return result;
};
"use server";

import User from "@/backend/models/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";

export async function getAdmin() {
  try {
    connectToDatabase();
    const admin = await User.findOne({ role: "ADMIN" });
    return admin;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUserById(params: any) {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();
    const { clerkId, updateData, path } = params;
    let updateQuery: any = {};

    if (updateData.skills) {
      updateQuery = {
        ...updateQuery,
        "skills.title": updateData.skills.title,
        "skills.desc": updateData.skills.desc,
        "skills.metaTitle": updateData.skills.metaTitle,
        "skills.metaDesk": updateData.skills.metaDesk,
        "skills.skillsItem.public": updateData.skills.skillsItem.public,
        "skills.skillsItem.pro": updateData.skills.skillsItem.pro,
      };
    } else {
      updateQuery = updateData;
    }

    await User.findOneAndUpdate(
      { clerkId },
      { $set: updateQuery },
      { new: true }
    );

    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // TODO: delete user data, etc.

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

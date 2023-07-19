import { TRPCError } from "@trpc/server";
import prisma from "../utils/prisma";
import { CreateUser, LoginUser } from "./userTypes";
import bcrypt from "bcrypt";

export const findUsers = async () => {
  const allUsers = await prisma.user.findMany({});
  return allUsers;
};

export const findUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

export const createUser = async (data: CreateUser) => {
  const saltRounds = 10;

  try {
    const hash = await bcrypt.hash(data.password, saltRounds);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hash,
      },
    });

    return user;
  } catch (err) {
    console.error("Error creating user:", err);
  }
};

export const loginUser = async (data: LoginUser) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (!user) {
    return new TRPCError({ code: "BAD_REQUEST", message: "Email not found" });
  }

  const result = await bcrypt.compare(data.password, user.password);

  if (result) {
    return user.name + "has logged in successfully";
  }
};

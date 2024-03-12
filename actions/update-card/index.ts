"use server"

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { InputType, ReturnType } from "./types";
import { UpdateCard } from "./schema";


const handler = async (data: InputType) : Promise<ReturnType> => {
  const { orgId, userId } = auth();

  if(!orgId || !userId) {
    return {
      error: "No autorizado",
    }
  };

  const { id, boardId, ...values} = data;

  let card;

  try {
    card = await db.card.update({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
      data: {
        ...values,
      }
    })
  } catch(error) {
    return {
      error: "Hubo un error al actualizar la tarjeta.",
    };
  }
  
  revalidatePath(`board/${boardId}`);
  return {data: card};
}

export const updateCard = createSafeAction(UpdateCard, handler);
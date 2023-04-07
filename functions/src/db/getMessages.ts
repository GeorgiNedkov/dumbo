import { PrismaClient } from "@prisma/client";

export async function getMessages(
  id: string,
  prismaClient: PrismaClient
): Promise<any | undefined> {
  const [project, messages] = await Promise.all([
    prismaClient.messagingVideo.findFirst({
      where: {
        id: id,
      },
    }),
    prismaClient.mSG.findMany({
      where: {
        messagingVideoId: id,
      },
      orderBy: {
        index: "asc",
      },
    }),
  ]);

  if (project) {
    (
      project as {
        [key: string]: unknown;
      }
    )["messages"] = messages;

    return project;
  }

  return null;
}

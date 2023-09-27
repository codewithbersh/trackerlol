import { getCurrentUser } from "@/actions/get-current-user";
import { utapi } from "uploadthing/server";

export async function DELETE(
  _req: Request,
  { params: { imageId } }: { params: { imageId: string } }
) {
  const user = await getCurrentUser();

  await utapi.deleteFiles(imageId);
}

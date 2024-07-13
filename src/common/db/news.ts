import { prisma } from "@/common/lib/prisma";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
  getBlob,
} from "firebase/storage";
import { storage } from "@/common/lib/firebase";
import { TNews } from "../types/news";

export async function createNews(data: TNews) {
  try {
    const fileRef = ref(storage, `files/${data.image.name}`);
    const uploadTask = uploadBytesResumable(fileRef, data.image);
    await new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          reject(error);
        },
        () => {
          resolve(uploadTask.snapshot.ref);
        }
      );
    });
    const image = await getDownloadURL(fileRef);
    await prisma.news.create({
      data: {
        content: data.content,
        image: image,
      },
    });

    return {
      status: 201,
      message: "success create news",
      data: data,
    };
  } catch (error) {
    return {
      status: 500,
      message: (error as Error).message,
    };
  }
}

export async function getNews() {
  try {
    const res = await prisma.news.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return {
      status: 200,
      message: "success get news",
      data: res,
    };
  } catch (error) {
    return {
      res: 500,
      message: (error as Error).message,
    };
  }
}

export async function updateNews(data: TNews) {
  try {
    let imageUrl: string | undefined;

    if (data.image) {
      const existingNews = await prisma.news.findUnique({
        where: { id: data.id },
        select: { image: true },
      });

      if (existingNews?.image) {
        const imageRef = ref(storage, existingNews.image);
        await deleteObject(imageRef);
      }

      const fileRef = ref(storage, `files/${data.image.name}`);
      const uploadTask = uploadBytesResumable(fileRef, data.image);
      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => reject(error),
          () => resolve(uploadTask.snapshot.ref)
        );
      });

      imageUrl = await getDownloadURL(fileRef);
    }

    const updateData: { content?: string; image?: string } = {};
    if (data.content !== undefined) {
      updateData.content = data.content;
    }
    if (imageUrl !== undefined) {
      updateData.image = imageUrl;
    }

    await prisma.news.update({
      data: updateData,
      where: { id: data.id },
    });

    return {
      status: 200,
      message: "Success update news",
    };
  } catch (error) {
    return {
      status: 500,
      message: (error as Error).message,
    };
  }
}

export async function deleteNews(id: string) {
  try {
    const parsedId = JSON.parse(id).id;
    const news = await prisma.news.findUnique({
      where: {
        id: parsedId,
      },
    });
    const deletedImage = ref(storage, news?.image);
    await deleteObject(deletedImage);
    await prisma.news.delete({
      where: {
        id: parsedId,
      },
    });
    return {
      status: 200,
      message: "success delete news",
    };
  } catch (error) {
    return {
      status: 500,
      message: (error as Error).message,
    };
  }
}

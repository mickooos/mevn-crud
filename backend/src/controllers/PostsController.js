import prisma from "../config/PrismaClient.js";
import fs from "fs";

export const getProducts = async (req, res) => {
  try {
    const products = await prisma.products.findMany({
      where: { user_id: req.user.userId },
      select: {
        productId: true,
        name: true,
        price: true,
        categories: true,
        desc: true,
        image: true,
      },
    });
    if (!products)
      return res.status(404).send({ message: "Produk Tidak Ditemukan" });
    res.status(200).json({ products: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await prisma.products.findUnique({
      where: { user_id: req.user.userId, productId: req.params.id },
      select: {
        productId: true,
        name: true,
        price: true,
        categories: true,
        desc: true,
        image: true,
      },
    });
    res.status(200).json({ product: product });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, categories, desc } = req.body;
  try {
    const product = await prisma.products.create({
      data: {
        name,
        price: Number(price),
        categories,
        desc,
        image: req.file.filename,
        user_id: req.user.userId,
      },
    });
    res.status(201).json({ message: "Produk Berhasil Ditambahkan!", product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { name, price, categories, desc } = req.body;
  let newImage = null;

  try {
    if (req.file) {
      newImage = req.file.filename;
      try {
        const path = `../frontend/src/uploads/${req.body.oldImage}`;
        fs.unlinkSync(path);
      } catch (error) {
        console.log(error);
      }
    } else {
      newImage = req.body.oldImage;
    }

    const product = await prisma.products.update({
      where: {
        user_id: req.user.userId,
        productId: req.params.id,
      },
      data: {
        name,
        price: Number(price),
        categories,
        desc,
        image: newImage,
      },
    });
    res.status(200).json({ message: "Produk Berhasil Diubah!", product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const isExist = await prisma.products.findFirst({
    where: { productId: req.params.id },
  });
  if (!isExist)
    return res.status(404).json({ message: "Produk Tidak Ditemukan" });

  try {
    const path = `../frontend/src/uploads/${isExist.image}`;
    fs.unlinkSync(path);
    await prisma.products.delete({
      where: {
        user_id: req.user.userId,
        productId: req.params.id,
      },
    });
    res.status(200).json({ message: "Produk Berhasil Dihapus" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

interface ProductForm {
  colorName: string;
  colorImage: File | null;
  colorImageName: string;
  disc: string;
  price: number;
  category: string;
  fabrics: { file: File | null; name: string }[];
  frontPockets: { file: File | null; name: string }[];
  backPockets: { file: File | null; name: string }[];
}

const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState<ProductForm>({
    colorName: "",
    colorImage: null,
    colorImageName: "",
    disc: "",
    price: 0,
    category: "Male",
    fabrics: [{ file: null, name: "" }],
    frontPockets: [{ file: null, name: "" }],
    backPockets: [{ file: null, name: "" }],
  });

const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { id, value, files } = e.target as HTMLInputElement;

  const [type, index] = id.split("-");

  if (type === "colorImage") {
    setFormData((prevData) => ({
      ...prevData,
      colorImage: files ? files[0] : null,
    }));
  } else if (type === "colorImageName") {
    setFormData((prevData) => ({
      ...prevData,
      colorImageName: value,
    }));
  } else if (type === "category") {
    setFormData((prevData) => ({
      ...prevData,
      category: value,
    }));
  } else if (type.startsWith("fabric")) {
    const idx = Number(index);
    const updatedFabrics = [...formData.fabrics];
    if (id.startsWith("fabricFile")) {
      updatedFabrics[idx] = {
        ...updatedFabrics[idx],
        file: files ? files[0] : null,
      };
    } else if (id.startsWith("fabricName")) {
      updatedFabrics[idx] = { ...updatedFabrics[idx], name: value };
    }
    setFormData((prevData) => ({ ...prevData, fabrics: updatedFabrics }));
  } else if (type.startsWith("frontPocket")) {
    const idx = Number(index);
    const updatedFrontPockets = [...formData.frontPockets];
    if (id.startsWith("frontPocketFile")) {
      updatedFrontPockets[idx] = {
        ...updatedFrontPockets[idx],
        file: files ? files[0] : null,
      };
    } else if (id.startsWith("frontPocketName")) {
      updatedFrontPockets[idx] = { ...updatedFrontPockets[idx], name: value };
    }
    setFormData((prevData) => ({
      ...prevData,
      frontPockets: updatedFrontPockets,
    }));
  } else if (type.startsWith("backPocket")) {
    const idx = Number(index);
    const updatedBackPockets = [...formData.backPockets];
    if (id.startsWith("backPocketFile")) {
      updatedBackPockets[idx] = {
        ...updatedBackPockets[idx],
        file: files ? files[0] : null,
      };
    } else if (id.startsWith("backPocketName")) {
      updatedBackPockets[idx] = { ...updatedBackPockets[idx], name: value };
    }
    setFormData((prevData) => ({
      ...prevData,
      backPockets: updatedBackPockets,
    }));
  } else {
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }
};

  const handleAddMore = (type: "fabrics" | "frontPockets" | "backPockets") => {
    setFormData((prevData) => ({
      ...prevData,
      [type]: [...prevData[type], { file: null, name: "" }],
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.colorImage) return;

    const uploadImage = async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "myPreset"); // Replace with your Cloudinary preset

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dd8arokjv/image/upload", // Replace with your Cloudinary cloud name
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      return data.secure_url;
    };

    const colorImageUrl = await uploadImage(formData.colorImage);

    const fabricUrls = await Promise.all(
      formData.fabrics.map(async (fabric) =>
        fabric.file
          ? { url: await uploadImage(fabric.file), name: fabric.name }
          : null
      )
    );

    const frontPocketUrls = await Promise.all(
      formData.frontPockets.map(async (frontPocket) =>
        frontPocket.file
          ? { url: await uploadImage(frontPocket.file), name: frontPocket.name }
          : null
      )
    );

    const backPocketUrls = await Promise.all(
      formData.backPockets.map(async (backPocket) =>
        backPocket.file
          ? { url: await uploadImage(backPocket.file), name: backPocket.name }
          : null
      )
    );

    const productData = {
      colorName: formData.colorName,
      colorImage: colorImageUrl,
      colorImageName: formData.colorImageName,
      disc: formData.disc,
      price: formData.price,
      category: formData.category,
      fabrics: fabricUrls.filter((url) => url !== null),
      frontPockets: frontPocketUrls.filter((url) => url !== null),
      backPockets: backPocketUrls.filter((url) => url !== null),
    };

    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (response.ok) {
      setFormData({
        colorName: "",
        colorImage: null,
        colorImageName: "",
        disc: "",
        price: 0,
        category: "Male",
        fabrics: [{ file: null, name: "" }],
        frontPockets: [{ file: null, name: "" }],
        backPockets: [{ file: null, name: "" }],
      });
      alert("Product submitted successfully!");
    } else {
      alert("Error submitting product.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[60vw] mt-20 mb-20 space-y-4 p-24 bg-white rounded-lg shadow-md mx-auto"
    >
      <div>
        <label
          htmlFor="colorName"
          className="block text-sm font-medium text-gray-700"
        >
          Color Name
        </label>
        <input
          type="text"
          id="colorName"
          value={formData.colorName}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="colorImage"
          className="block text-sm font-medium text-gray-700"
        >
          Color Image
        </label>
        <input
          type="file"
          id="colorImage"
          onChange={handleChange}
          className="mt-1 block w-full text-gray-700"
        />
      </div>

      <div>
        <label
          htmlFor="colorImageName"
          className="block text-sm font-medium text-gray-700"
        >
          Color Image Name
        </label>
        <input
          type="text"
          id="colorImageName"
          value={formData.colorImageName}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="disc"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <input
          type="text"
          id="disc"
          value={formData.disc}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price
        </label>
        <input
          type="number"
          id="price"
          value={formData.price}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, price: Number(e.target.value) }))
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <select
          id="category"
          value={formData.category}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Fabric Images
        </label>
        {formData.fabrics.map((fabric, index) => (
          <div key={index} className="mb-4">
            <input
              type="file"
              id={`fabricFile-${index}`}
              onChange={handleChange}
              className="block w-full text-gray-700"
            />
            <input
              type="text"
              id={`fabricName-${index}`}
              value={fabric.name}
              onChange={handleChange}
              placeholder="Fabric Name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddMore("fabrics")}
          className="text-blue-500"
        >
          Add More Fabric Images
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Front Pocket Images
        </label>
        {formData.frontPockets.map((frontPocket, index) => (
          <div key={index} className="mb-4">
            <input
              type="file"
              id={`frontPocketFile-${index}`}
              onChange={handleChange}
              className="block w-full text-gray-700"
            />
            <input
              type="text"
              id={`frontPocketName-${index}`}
              value={frontPocket.name}
              onChange={handleChange}
              placeholder="Front Pocket Name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddMore("frontPockets")}
          className="text-blue-500"
        >
          Add More Front Pocket Images
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Back Pocket Images
        </label>
        {formData.backPockets.map((backPocket, index) => (
          <div key={index} className="mb-4">
            <input
              type="file"
              id={`backPocketFile-${index}`}
              onChange={handleChange}
              className="block w-full text-gray-700"
            />
            <input
              type="text"
              id={`backPocketName-${index}`}
              value={backPocket.name}
              onChange={handleChange}
              placeholder="Back Pocket Name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddMore("backPockets")}
          className="text-blue-500"
        >
          Add More Back Pocket Images
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md shadow-md hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default ProductForm;

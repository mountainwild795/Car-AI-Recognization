// import React from "react";

// import "./App.css";
"use client";

import { useState, useEffect, useRef } from "react";
import { fetchCarInfo } from "@utils";

import { ref, uploadBytes, getDownloadURL, listAll, list } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";

type carInfoObj = {
  make: {
    name: string;
    confidence: number;
  };
  model: {
    name: string;
    confidence: number;
  };
  color: {
    name: string;
    confidence: number;
  };
};

const CarRecognization = () => {
  const [imageUpload, setImageUpload] = useState<FileList | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [carInfo, setCarInfo] = useState<carInfoObj | null>(null);
  const [file, setFile] = useState<string>("");
  const [isShowImage, setIsShowImage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const makeRef = useRef<HTMLInputElement>(null!);
  const modelRef = useRef<HTMLInputElement>(null!);
  const colorRef = useRef<HTMLInputElement>(null!);

  // const imagesListRef = ref(storage, "images/");
  const uploadFile = () => {
    if (imageUpload == null) return;
    setIsLoading(true);
    const imageRef = ref(storage, `images/${imageUpload[0].name + v4()}`);
    uploadBytes(imageRef, imageUpload[0]).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        // setImageUrls((prev) => [...prev, url]);
        setImageUrl(url);
      });
    });
  };

  useEffect(() => {
    if (imageUrl !== "") {
      findCarType();
    }
  }, [imageUrl]);

  // useEffect(() => {
  //   listAll(imagesListRef).then((response) => {
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setImageUrls((prev) => [...prev, url]);
  //       });
  //     });
  //   });
  // }, []);

  const findCarType = async () => {
    const carInfo = await fetchCarInfo(imageUrl);
    setCarInfo(carInfo.objects[0].vehicleAnnotation.attributes.system);
    setIsLoading(false);
  };

  const findInstock = () => {};

  type fileObj = {};

  useEffect(() => {}, [isShowImage]);

  return (
    <div className="home__car-recognization">
      <div className="w-3/4 mx-auto">
        {/* <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
          Select Car Image
        </label> */}

        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            {/* <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" /> */}
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                <span>select a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={(event) => {
                    setImageUpload(event.target.files);
                    const obj = event.target.files ? event.target.files[0] : ({} as Blob);
                    setIsShowImage(false);
                    setFile(URL.createObjectURL(obj));
                    makeRef.current.value = "";
                    modelRef.current.value = "";
                    colorRef.current.value = "";
                  }}
                />
                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
              </label>
              {/* <p className="pl-1">or drag and drop</p> */}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-6  flex justify-center items-center h-[300px] w-[450px] border-dashed border-2 border-indigo-600">
        {/* {imageUrls.map((url) => {
          console.log(url);
          return <img className="w-2/4 object-contain" src={url} />;
        })} */}
        {!isLoading ? (
          file ? (
            <img className="object-contain h-[300px] w-[400px] " src={file ? file : imageUrl} />
          ) : null
        ) : (
          <div className="h-full bg-white">
            <div className="flex justify-center items-center h-full">
              <img className="h-16 w-16" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt="" />
            </div>
          </div>
        )}
      </div>
      <div className="mt-6 flex justify-center">
        {/* <input
          type="file"
          onChange={(event) => {
            setImageUpload(event.target.files);
            const obj = event.target.files ? event.target.files[0] : ({} as Blob);
            setIsShowImage(false);
            setFile(URL.createObjectURL(obj));
          }}
        /> */}
        <button
          onClick={uploadFile}
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Image AI Recognization
        </button>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-2 sm:col-start-1">
          <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
            MAKE:
          </label>
          <div className="mt-2">
            <input
              ref={makeRef}
              disabled
              type="text"
              name="make"
              id="make"
              value={carInfo?.make.name}
              autoComplete="address-level2"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
            MODEL:
          </label>
          <div className="mt-2">
            <input
              ref={modelRef}
              disabled
              value={carInfo?.model.name}
              type="text"
              name="model"
              id="model"
              autoComplete="address-level1"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
            COLOR:
          </label>
          <div className="mt-2">
            <input
              ref={colorRef}
              disabled
              value={carInfo?.color.name}
              type="text"
              name="color"
              id="color"
              autoComplete="color"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarRecognization;

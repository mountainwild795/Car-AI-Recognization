"use client";

import { useState } from "react";
import Image from "next/image";
import { Button, Modal, Form, Radio, Input } from "antd";
import { FileAddOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { calculateCarRent, generateCarImageUrl } from "@utils";
import { CarProps } from "@types";
import CustomButton from "./CustomButton";
import CarDetails from "./CarDetails";

interface CarCardProps {
  car: CarProps;
}

type FieldType = {
  make?: string;
  model?: string;
  year?: number;
};

const CarCard = ({ car }: CarCardProps) => {
  const { city_mpg, year, make, model, transmission, drive, cylinders, fuel_type } = car;

  const carRent = calculateCarRent(city_mpg, year);

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const handleAddCar = () => {
    setOpen(true);
  };

  const handleEditCar = () => {
    setOpen(true);
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="car-card group">
        <div className="car-card__content">
          <h2 className="car-card__content-title">
            {make} {model} - {year}
          </h2>
        </div>
        {/* <p className="flex mt-6 text-[32px] leading-[38px] font-extrabold">
        <span className="self-start text-[14px] leading-[17px] font-semibold">$</span>
        {carRent}
        <span className="self-end text-[14px] leading-[17px] font-medium">/day</span>
      </p> */}
        <div className="relative w-full h-40 my-3 object-contain">
          <Image src="/car-image.jpg" alt="car image" fill priority className="object-contain" />
        </div>
        <div className="mt-6 w-full flex justify-end invisible group-hover:visible ">
          {/* <ul>
          <li>YEAR: {year}</li>
          <li>DRIVE: {drive}</li>
          <li>CYLINDERS: {cylinders}</li>
          <li>TYPE: {fuel_type}</li>
          <li>CLASS: {car.class}</li>
        </ul> */}
          <div className="m-2 p-2 w-[60px] text-center bg-blue-700 text-white shadow-sm rounded-md hover:cursor-pointer" onClick={handleAddCar}>
            <FileAddOutlined />
          </div>
          <div className="m-2 p-2 w-[60px] text-center bg-blue-700 text-white shadow-sm rounded-md hover:cursor-pointer">
            <EditOutlined onClick={handleEditCar} />
          </div>
          <div className="m-2 p-2 w-[60px] text-center bg-blue-700 text-white shadow-sm rounded-md hover:cursor-pointer">
            <DeleteOutlined />
          </div>
        </div>
        <div className="relative flex w-full mt-2">
          {/* <div className='flex group-hover:invisible w-full justify-between text-grey'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image src='/steering-wheel.svg' width={20} height={20} alt='steering wheel' />
            <p className='text-[14px] leading-[17px]'>
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>
          <div className="car-card__icon">
            <Image src="/tire.svg" width={20} height={20} alt="seat" />
            <p className="car-card__icon-text">{drive.toUpperCase()}</p>
          </div>
          <div className="car-card__icon">
            <Image src="/gas.svg" width={20} height={20} alt="seat" />
            <p className="car-card__icon-text">{city_mpg} MPG</p>
          </div>
        </div> */}

          {/* <div className="car-card__btn-container">
          <CustomButton
            title="Details"
            containerStyles="w-2/4 py-[16px] bg-secondary-orange"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            // rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
        </div> */}
        </div>
        {/* <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} /> */}
        {/* <Button type="primary" onClick={showModal}>
        // Open Modal with async logic //{" "}
      </Button> */}
      </div>
      <Modal title="Car Details" open={open} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel}>
        <Form
          name="Car Info"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item<FieldType> label="Make" name="make" rules={[{ required: true, message: "Please input car make!" }]}>
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label="Model" name="model" rules={[{ required: true, message: "Please input car model!" }]}>
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label="Year" name="year" rules={[{ required: true, message: "Please input car year!" }]}>
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CarCard;


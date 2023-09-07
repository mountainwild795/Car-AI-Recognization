"use client";

import { useState } from "react";
import Image from "next/image";
import { Button, Modal, Form, Radio, Input, Spin } from "antd";
import { FileAddOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { saveCar, editCar, deleteCar, fetchCars, calculateCarRent, generateCarImageUrl } from "@utils";
import { CarProps } from "@types";
import CustomButton from "./CustomButton";
import CarDetails from "./CarDetails";
import { useForm } from "antd/es/form/Form";

interface CarCardProps {
  car: CarProps;
  // setCars: React.Dispatch<React.SetStateAction<never[]>>;
}

type FieldType = {
  make?: string;
  model?: string;
  year?: number;
};

const CarCard = ({ car }: CarCardProps) => {
  const { city_mpg, year, make, model, transmission, drive, cylinders, fuel_type } = car;

  // const carRent = calculateCarRent(city_mpg, year);

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [isEditting, setIsEditting] = useState(false);

  const [form] = useForm();

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
    setIsEditting(false);
  };

  const handleEditCar = () => {
    setOpen(true);
    setIsEditting(true);
  };

  const handleDeleteCar = () => {
    setPageLoading(true);
    try {
      setTimeout(async () => {
        await deleteCar(car._id);
        setPageLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    } finally {
      setPageLoading(false);
    }
  };

  const onFinish = async (values: any) => {
    try {
      let res;
      setLoading(true);
      if (!isEditting) {
        saveCar(values);
      } else {
        editCar(car._id, values);
      }
      // const data = await fetchCars();
      // const cars = data.json();
      // setAllCars(cars);
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
      }, 2000);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onReset = () => {
    console.log("reset");

    form.resetFields();
  };

  return (
    <>
      <Spin tip="Deleting from Database..." spinning={pageLoading}>
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
            <div className="car-card__actions-container">
              <div className="m-2 p-2 w-[60px] text-center bg-blue-700 text-white shadow-sm rounded-md hover:cursor-pointer" onClick={handleAddCar}>
                <FileAddOutlined />
              </div>
              <div className="m-2 p-2 w-[60px] text-center bg-blue-700 text-white shadow-sm rounded-md hover:cursor-pointer">
                <EditOutlined onClick={handleEditCar} />
              </div>
              <div className="m-2 p-2 w-[60px] text-center bg-blue-700 text-white shadow-sm rounded-md hover:cursor-pointer">
                <DeleteOutlined onClick={handleDeleteCar} />
              </div>
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
              // handleClick={() => setIsOpen(true)}
            />
          </div> */}
          </div>
          {/* <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} /> */}
          {/* <Button type="primary" onClick={showModal}>
        // Open Modal with async logic //{" "}
      </Button> */}
        </div>
      </Spin>
      <Modal title="Car Details" open={open} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel} footer={null}>
        <Spin tip="Saving To Database..." spinning={loading}>
          <Form
            form={form}
            name="Car Info"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ make: car.make, model: car.model, year: car.year.toString() }}
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
              <Button className="bg-blue-500" type="primary" htmlType="submit">
                Submit
              </Button>

              {/* <Button className="bg-slate-400 ml-4" type="primary" onClick={onReset}>
                Reset
              </Button> */}
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </>
  );
};

export default CarCard;

/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  TextInput,
  NumberInput,
  Select,
  MultiSelect,
} from "@mantine/core";
import { updateItem, getEvents } from "../../ItemsAxios";
import classes from "./ContainedInputs.module.css";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import ImageDropZone from "./ImageDropZone";

const options = [
  "Decoration",
  "Furniture",
  "Catering",
  "Ceiling",
  "Food Enhancement",
  "Cakes",
  "Performer",
  "Lighting",
  "Coordination",
  "Host",
  "Hair & Makeup",
  "Sound System",
  "Photo & Video",
  "Equipment",
  "Flowers",
  "Transport",
  "Styling",
  "Full Package",
].map((item) => ({ label: item, value: item }));

const ItemEdit = ({ itemId, initialData, close, opened }) => {
  // States for all fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [perUnitExcess, setPerUnitExcess] = useState(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [pax, setPax] = useState(0);
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);

  // Populate initial data when editing
  useEffect(() => {
    console.log(+":initial data" + initialData);
    if (initialData) {
      setName(initialData.name || "");
      setDescription(initialData.description || "");
      setPrice(initialData.price || 0);
      setPerUnitExcess(initialData.perUnitExcess || 0);
      setCategory(initialData.category || "");
      setType(initialData.type || "");
      setPax(initialData.pax || 0);

      // Populate selectedEvents with IDs as strings
      if (initialData.recommendedForEvents) {
        setSelectedEvents(
          initialData.recommendedForEvents.map((e) => e.id.toString())
        );
      }
    }
  }, [initialData]);

  useEffect(() => {
    getEvents()
      .then((res) => {
        console.log("Updated item:", res.data);
        setEvents(res?.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const eventOptions = events.map((e) => ({
    label: e.eventName, // what user sees
    value: e.id.toString(), // must be string for MultiSelect
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemDetails = {
      name,
      description,
      price,
      perUnitExcess,
      category,
      type,
      pax,
      recommendedForEvents: selectedEvents.map((id) => Number(id)),
    };
    console.log(JSON.parse(JSON.stringify(itemDetails)));
    console.log(itemId);

    // alert(JSON.stringify(itemDetails, null, 2));

    updateItem({ id: itemId, item: itemDetails })
      .then((res) => {
        console.log("Updated item:", res.data);
        close();
      })
      .catch((err) => console.error(err));
  };

  return (
    <Modal opened={opened} onClose={close} title="Edit Item" centered>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <ImageDropZone />
        <TextInput
          label="Name"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          // classNames={classes}
          labelProps={{ sx: { pointerEvents: "auto" } }}
          variant="default"
          withAsterisk
        />

        <TextInput
          label="Description"
          placeholder="Item description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          // classNames={classes}
          variant="default"
          labelProps={{ sx: { pointerEvents: "auto" } }}
          withAsterisk
        />

        <NumberInput
          label="Price"
          value={price}
          onChange={setPrice}
          precision={2}
          min={0}
          placeholder="0.00"
        />

        <NumberInput
          label="Per Unit Excess"
          value={perUnitExcess}
          onChange={setPerUnitExcess}
          precision={2}
          min={0}
          placeholder="0.00"
        />

        {/* <TextInput
          label="Category"
          placeholder="e.g. Rental, Food, Furniture"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        /> */}

        <Select
          label="Category"
          placeholder="Select type"
          data={options}
          value={category}
          onChange={setCategory}
        />

        <Select
          label="Type"
          placeholder="Select type"
          data={[
            { label: "Package", value: "package" },
            { label: "Add-on", value: "add-on" },
            { label: "Performer", value: "performer" },
          ]}
          value={type}
          onChange={setType}
        />

        <NumberInput label="Pax" value={pax} onChange={setPax} min={0} />

        <MultiSelect
          label="Recommend for Events like:"
          placeholder="Select type(s)"
          data={eventOptions}
          value={selectedEvents} // array of selected IDs
          onChange={setSelectedEvents}
        />

        <Button type="submit" fullWidth>
          Update Item
        </Button>
      </form>
    </Modal>
  );
};

export default ItemEdit;

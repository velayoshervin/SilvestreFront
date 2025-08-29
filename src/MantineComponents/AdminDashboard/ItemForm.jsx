import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  TextInput,
  NumberInput,
  Select,
  MultiSelect,
} from "@mantine/core";
import { getEvents } from "../../ItemsAxios";
import ImageDropZone from "./ImageDropZone";

const categoryOptions = [
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

const typeOptions = [
  { label: "Package", value: "package" },
  { label: "Add-on", value: "add-on" },
  { label: "Performer", value: "performer" },
];

const ItemForm = ({ opened, close, onSubmit }) => {
  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [perUnitExcess, setPerUnitExcess] = useState(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [pax, setPax] = useState(0);
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);

  // Fetch events
  useEffect(() => {
    getEvents()
      .then((res) => setEvents(res?.data || []))
      .catch((err) => console.error(err));
  }, []);

  const eventOptions = events.map((e) => ({
    label: e.eventName,
    value: e.id.toString(),
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

    onSubmit(itemDetails); // parent handles create or update
    close();
  };

  return (
    <Modal opened={opened} onClose={close} title="Item Form" centered>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <ImageDropZone />

        <TextInput
          label="Name"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="default"
          withAsterisk
        />

        <TextInput
          label="Description"
          placeholder="Item description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="default"
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

        <Select
          label="Category"
          placeholder="Select category"
          data={categoryOptions}
          value={category}
          onChange={setCategory}
        />

        <Select
          label="Type"
          placeholder="Select type"
          data={typeOptions}
          value={type}
          onChange={setType}
        />

        <NumberInput label="Pax" value={pax} onChange={setPax} min={0} />

        <MultiSelect
          label="Recommend for Events:"
          placeholder="Select events"
          data={eventOptions}
          value={selectedEvents}
          onChange={setSelectedEvents}
        />

        <Button type="submit" fullWidth>
          Submit
        </Button>
      </form>
    </Modal>
  );
};

export default ItemForm;

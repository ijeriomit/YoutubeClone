<template>
  <h1>Poll Page</h1>
  <form @submit.prevent="formSubmit()">
    <label for="pollQ">{{ formData.pollTitleField.label }}</label>
    <input
      type="text"
      :name="formData.pollTitleField.name"
      :id="formData.pollTitleField.id"
      v-model="formData.pollTitleField.value"
    />
    <label for="desc">{{ formData.pollDescField.label }}</label>
    <input
      type="text"
      :name="formData.pollDescField.name"
      :id="formData.pollDescField.id"
      v-model="formData.pollDescField.value"
    />
    <div>
      <label for="options">{{ formData.pollOptionsField.label }}</label>
      <input
        type="text"
        :name="formData.pollOptionsField.name"
        :id="formData.pollOptionsField.id"
        v-model="formData.pollOptionsField.currOptionValue"
      />
      <button @click.prevent="addOption()">AddOption</button>
      <div
        v-for="(option, index) in formData.pollOptionsField.optionValues"
        :key="index"
      >
        {{ option }}
      </div>
    </div>
    <button @click="formSubmit()">Submit</button>
  </form>

  <h2>Modify Forms</h2>
</template>
<script setup>
import { reactive } from "vue";

const formData = reactive({
  pollTitleField: {
    label: "Title",
    name: "pollT",
    id: "pollT",
    validations: [{ required: true, message: "Test is Required" }],
    value: "",
  },
  pollOptionsField: {
    label: "Enter poll option",
    name: "options",
    id: "options",
    validations: [{ required: true, message: "Options is Required" }],
    currOptionValue: "",
    optionValues: [],
  },
  pollDescField: {
    label: "Description ",
    name: "desc",
    id: "desc",
    validations: [{ required: true, message: "Description is Required" }],
    value: "",
  },
});
function createPoll() {
  return {
    pollTitle: formData.pollTitleField.value,
    options: formData.pollOptionsField.optionValues,
    description: formData.pollDescField.value,
  };
}
function addOption() {
  const currOptionValue = formData.pollOptionsField.currOptionValue;
  formData.pollOptionsField.optionValues.push(currOptionValue);
  // formData.pollOptionsField.currOptionValue = "";
  console.log("added option: ", currOptionValue);
}
async function formSubmit() {
  console.log("form submitted");
  try {
    const response = await fetch("http://localhost:8383/createPoll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createPoll()),
    });
    console.log(response.status);
  } catch (e) {
    console.error("problem sending data", e);
  }
}
async function getForms() {
  try {
    const response = await fetch("http://localhost:8383/getSubmittedPolls", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.status, response.body);
  } catch (e) {
    console.error("problem sending data", e);
  }
}
</script>

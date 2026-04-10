<script setup>
import { ref } from 'vue';
const result = ref("");
const request = async() => {
  try {
    result.value = "requesting..."
      const resp = await fetch("/api/echo")
  if (!resp.ok) {
    alert("request failed");
    return; 
  }
  const data = await resp.text();
  result.value = data
  } catch (e) {
    alert("request failed: "+ JSON.stringify(e));
  }
};
</script>

<template>
  <div>
    <h1>Proxy Test</h1>
    <p>Result: {{ result }}</p>
    <button @click="request">request</button>
  </div>
</template>

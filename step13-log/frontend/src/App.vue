<script setup>
import { ref } from 'vue';
const result = ref("");
const username = ref("jack");
document.title = `[${process.env.NODE_ENV}]${document.title}`;
const request = async () => {
  try {
    result.value = "requesting..."
    const resp = await fetch("/api/echo")
    if (!resp.ok) {
      alert("request failed");
      return;
    }
    const { data } = await resp.json();
    result.value = data
  } catch (e) {
    alert("request failed: " + JSON.stringify(e));
  }
};
const createUser = async () => {
  try {
    const resp = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username.value }),
    });
    alert("user created successfully");
  } catch (e) {
    alert("request failed: " + JSON.stringify(e));
  }
};

const count = ref(0);
const increment = async () => {
  try {
    const resp = await fetch("/api/redis/increment", {
      method: "POST",
    });
    if (!resp.ok) {
      alert("request failed");
      return;
    }
    alert("count incremented successfully");
  } catch (e) {
    alert("request failed: " + JSON.stringify(e));
  }
};
const getCount = async () => {
  try {
    const resp = await fetch("/api/redis");
    if (!resp.ok) {
      alert("request failed");
      return;
    }
    const { value } = await resp.json();
    count.value = value;
  } catch (e) {
    alert("request failed: " + JSON.stringify(e));
  }
};  
</script>

<template>
  <div style="display: flex; flex-direction: row; gap: 10px;">
    <h3>0413 18:19</h3>
    <section>
      <button @click="request">get users</button>
      <ul>
        <li v-for="item in result" :key="item.id">{{ item.username }}</li>
      </ul>
    </section>
    <section>
      <input type="text" v-model="username">
      <button @click="createUser">create user</button>
    </section>
    <section>
      <p>Count: {{ count }}</p>
      <button @click="getCount">get count</button>
      <button @click="increment">increment</button>
    </section>
  </div>
</template>

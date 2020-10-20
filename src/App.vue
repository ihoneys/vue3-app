<template>
  <div>
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <HelloWorld msg="Hello Vue 3.0 + Vite" /> -->
    <input type="text" v-model="input" />
    <button @click="setQuery">搜索</button>
    <div v-if="loading">Loading.....</div>
    <div v-else-if="error">Something went wrong</div>
    <ul>
      <li v-for="item of hits" :key="item.objectID">
        <a href="item.url">{{ item.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { toRefs, ref, reactive, onMounted, watchEffect } from "vue";
export default {
  setup() {
    // const state = reactive({
    //   hits: [],
    //   query: "vue",
    //   query: "vue",
    // });
    const state = reactive({
      hits: [],
      query: "vue",
      input: "vue",
      error: false,
      loading: false,
    });
    const fetchData = async (query) => {
      state.error = false;
      state.loading = true;
      try {
        const data = await fetch(
          `https://hn.algolia.com/api/v1/search?query=${query}`
        ).then((rsp) => rsp.json());
        state.hits = data.hits;
      } catch (error) {
        state.error = true;
      }
      state.loading = false;
    };
    // const stop = watchEffect(() => {
    //   if (state.query === "vue3") stop();
    //   fetchData(state.query);
    // });
    onMounted(() => {
      watchEffect(() => {
        fetchData(state.query);
      });
    });
    const setQuery = () => {
      state.query = state.input;
    };
    return { ...toRefs(state), setQuery };
  },
};
</script>

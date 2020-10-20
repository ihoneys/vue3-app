import { toRefs, reactive, isRef } from "vue";
export default (options) => {
  const { url, manul = false, params = {} } = options;
  const state = reactive({
    data: {},
    error: false,
    loading: false,
  });
  const run = async () => {
    let query = "";
    Object.keys(params).forEach((key) => {
      const val = params[key];
      const value = isRef(val) ? val.value : val;
      query += `${key}=${value}&`;      
    });
    state.error = false;
    state.loading = true;
    try {
      const result = await fetch(`${url}?${query}`).then((rsp) => rsp.json());
      state.data = result;
    } catch (error) {
      state.error = true;
    }
    state.loading = false;
    onMounted(() => {
      !manual && run();
    });
  };
  return {
    run,
    ...toRefs(state),
  };
};

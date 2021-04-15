import { ref, reactive, watch } from "vue";

const not = (val) => !val;

export function useField(field) {
  const valid = ref(true);
  const value = ref(field.value);
  const errors = reactive({});

  const reassign = (val) => {
    Object.keys(field.validators ?? {}).map((name) => {
      const isValid = field.validators[name](val);
      errors[name] = not(isValid);
    });
  };

  watch(value, reassign);
  reassign(field.value);
  return { value, valid, errors };
}

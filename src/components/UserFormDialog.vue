<template>
  <v-dialog v-model="showDialog" persistent max-width="600px">
    <v-card>
      <v-card-text>
        Valor actual de showDialog: {{ showDialog }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="emitClose">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    modelValue: Boolean,
  },
  computed: {
    showDialog: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
  methods: {
    emitClose() {
      this.$emit('update:modelValue', false);
      console.log("Dialog closed");
    },
  },
};
</script>

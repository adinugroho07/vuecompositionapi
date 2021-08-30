<template>
  <div>
    <h2>{{ userName }}</h2>
    <h3>{{ age }}</h3>
  </div>
</template>

<script>
import {
  computed,
  inject,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from 'vue';

export default {
  props: ['firstName', 'lastName'],
  setup(props, context) {
    const uName = computed(function () {
      return props.firstName + ' ' + props.lastName;
    });

    //ini adalah contoh penggunaan inject, pola nya adalah inject(key yang di provide);
    //di inject ini tidak di sarankan untuk mengolah yang di ambil dari inject ini, tetapi jika ingin melakukan perubahan data
    //atau ada logic yang ingin di execute harus di lakukan sebelum data di kirim ole provide sehingga data yang di kirim oleh
    //provide adalah data yang siap di gunakan.
    const age = inject('userAge');

    console.log(context);

    onBeforeMount(function () {
      console.log('onBeforeMount');
    });

    onMounted(function () {
      console.log('onMounted');
    });

    onBeforeUpdate(function () {
      console.log('onBeforeUpdate');
    });

    onUpdated(function () {
      console.log('onUpdated');
    });

    onBeforeUnmount(function () {
      console.log('onBeforeUnmount');
    });

    onUnmounted(function () {
      console.log('onUnmounted');
    });

    // context.emit('save-data', 1); // this.$emit('save-data', 1);

    return { userName: uName, age };
  },
  // computed: {
  //   userName() {
  //     return this.firstName + ' ' + this.lastName;
  //   }
  // }
};
</script>
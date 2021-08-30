<template>
  <section class="container">
    <h2>{{ userName }}</h2>
    <button @click="toogleRef">Show/Hide Ref</button>
    <button @click="toogleReactive">Show/Hide Reactive</button>
    <button @click="toogleGoals">Show/Hide Goals</button>
  </section>
  <section class="container">
    <user-data
      class="test"
      :first-name="firstName"
      :last-name="lastName"
    ></user-data>
    <button @click="setAge">Change Age</button>
    <div>
      <input type="text" placeholder="First Name" v-model="firstName" />
      <input type="text" placeholder="Last Name" ref="lastNameInput" />
      <button @click="setLastName">Set Last Name</button>
    </div>
  </section>
  <section class="container">
    <div>
      <h2>{{ fullname }}</h2>
    </div>
    <div>
      <label for="firstname">First Name </label>
      <!-- <input type="text" id="firstname" @input="firstName" /> -->
      <input type="text" id="firstname" v-model.trim="namadepan" />
    </div>
    <div>
      <label for="lastname">Last Name </label>
      <!-- <input type="text" id="lastname" @input="lastName" /> -->
      <input type="text" id="lastname" v-model.trim="namabelakang" />
    </div>
  </section>
  <section class="container">
    <div>
      <p>Available Funds : {{ funds }}</p>
      <p>Total Expense : {{ expense }}</p>
      <hr />
      <p>Funds Left : {{ expenseleft }}</p>
    </div>
    <div>
      <label for="amount">Amount </label><br />
      <input type="number" id="amount" v-model.number="amount" />
    </div>
    <div>
      <button type="button" @click="addExpense">Add Expense</button>
    </div>
  </section>
  <section class="container" v-if="objRef.show">
    <h2>{{ objRef.name }}</h2>
    <h2>{{ objRef.age }}</h2>
  </section>
  <section class="container" v-if="objReact.show">
    <h2>{{ objReact.name }}</h2>
    <h2>{{ objReact.age }}</h2>
  </section>
  <section class="container" v-if="goals.show">
    <h2>Our Goals</h2>
    <ul>
      <li v-for="item in goals.data" :key="item.id">{{ item.goal }}</li>
    </ul>
  </section>
</template>

<script>
/*
form options API to composition API.
mengubah properties data(), methods(),computed,wacth menjadi 1 properties saja, yaitu setup().
untuk porps,emits dan component tidak ada yang berubah pada composition API ini.
setup ini akan di execute dan di buat pada proses awal(pada saat component initialization proses) 
jadi sebelum data(),methods,computed dan watch di buat.
setup mempunyai parameter, yaitu props dan context. cth -> setup(props,context)
props nya adalah untuk mengakses seluruh props yang ada
context nya adalah untuk mengakses 3 point penting, yaitu attrs,emit dan slots. 
jadinya untuk emit -> context.emit('nama-emit', valuetoemit);


ref() bisa juga di panggil sebagai reference, tapi bukan menreference ke DOM
tetapi sebuah value yang kita bisa mereferensi dari value tersebut.
contoh: const nama = ref('adi'); . maka var nama adalah adi.
ref create reactive value.

ref() akan di encapsulate dengan object.
cth: pada const objRef di bawah, maka pemanggilannya adalah objRef.value.name

reactive adalah sama dengan ref namun khusus untuk object dan data yang di isikan harus object, jadi tidak di encapsulate. 
cth : pada const objReact di bawah, maka pemanggilannya akan objReact.name

pada dasar nya object yang kita isi kan pada ref atau reactive akan bersifat reactive object nya, bukan value yang ada di dalam
object nya, oleh karena itu kita butuh untuk memparsing object nya supaya menjadi reactive bukan value yang ada di dalam object tersebut
kita parsing. 
cth : pada variable objReact di bawah -> objReact: objReact . kita memparsing object nya, bukan value nya (objReact: objReact.name)
      sehingga pada dom varibale objReact ini menjadi reactive.

untuk mengecek apakah suatu variable itu reactive atau tidak kita bisa menggunakan helper isRef atau isReactive. cara nya harus
di import terlebih dahulu helper nya -> import {isRef,isReactive} from 'vue' , kemudian di gunakan untuk pengecekan variable
isRef(variable untuk di check), isReactive(variable untuk check) dan hasil kembalian dari pengecekan ini adalah true atau false     

dalam options API ini juga bisa menggukan this.$route dan this.$router untuk navigasi.
pertama kita harus import hooks yang ada pada vue router, cth -> import {userRoute,useRouter} from 'vue-router'
setelah itu obj yang sudah kita import bisa kita gunakan, cth -> const route = userRoute(); route.params.id; 
untuk penggunaan router sama perlu di inport dulu hooks nya, cth import {userRoute,useRouter} from 'vue-router'
setelah itu obj yang sudah kita import bisa kita gunakan , cth -> const router = userRouter(); router.push('/url);
*/

import { ref, reactive, computed, watch, provide } from 'vue';
import UserData from './components/UserData.vue';

export default {
  components: {
    UserData,
  },
  setup() {
    const funds = ref(1000);
    const expense = ref(0);
    const amount = ref(0);
    const uAge = ref(31);

    const firstName = ref('');
    const lastName = ref('');

    /*
    di bawah ini adalah contoh penggunaan $ref pada options API. jadi pada dom ref="lastNameInput", lalu pada setup cukup di tuliskan 
    nama refs nya yang nanti nya refs tersebut akan di assign oleh ref(). dan untuk pengaksesannya adalah lastNameInput.value.value
    karena di refs yang ada pada dom akan di wrap oleh ref() sehingga ada 2 object yang warap makanya dia butuh value.value .
    .value pertama as ref(), .value kedua as refs.
    */
    const lastNameInput = ref(null);

    const uname = ref('Adi Nugroho');
    //var namadepan dan namabelakang akan langsung di bind oleh v-model, namun var ini harus di regiskan dulu di return di bawah.
    const namadepan = ref('');
    const namabelakang = ref('');
    const goals = reactive({
      show: true,
      data: [
        { id: 1, goal: 'Mastering Vue Js' },
        { id: 2, goal: 'Mastering Ract Js' },
        { id: 3, goal: 'Mastering Spring Boot' },
        { id: 4, goal: 'Mastering Laravel' },
        { id: 5, goal: 'Mastering Android And Swift' },
      ],
    });
    const objRef = ref({
      name: 'Adi from ref',
      age: 30,
      show: false,
    });

    const objReact = reactive({
      name: 'Adi from reactive',
      age: 24,
      show: false,
    });

    //ini adalah contoh penggunaan dari provide, pola nya adalah provide(key,value);
    provide('userAge', uAge);

    // di bawah ini contoh input binding dengan @input.
    // const firstName = (event) => {
    //   namadepan.value = event.target.value;
    // };

    // const lastName = (event) => {
    //   namabelakang.value = event.target.value;
    // };

    //contoh pembuatan computed
    const combineName = computed(() => {
      return namadepan.value + ' ' + namabelakang.value;
    });

    const fullname = computed(() => {
      return 'Hello ' + combineName.value;
    });

    const expenseleft = computed(() => {
      return funds.value - expense.value;
    });

    /*
    di bawah ini adalah contoh pemanggilan method pada composition API dan untuk bisa di akses oleh dom sama seperti variable
    di harus di daftarkan pada return di bawah, jadi nama method harus di daftarkan di return bawah. dan untuk mengakses method yang
    sudah di registrasi kan atau di buat sama dengan cara penggunaan/pemanggilan method pada options Api (pake @click="nama method")
    */
    function toogleRef() {
      objRef.value.show = !objRef.value.show;
      console.log(objRef.value.show);
    }

    function toogleReactive() {
      objReact.show = !objReact.show;
      console.log(objReact.show);
    }

    function setLastName() {
      lastName.value = lastNameInput.value.value;
    }

    const addExpense = () => {
      expense.value = expense.value + amount.value;
    };

    const toogleGoals = () => {
      goals.show = !goals.show;
    };

    watch(expense, (newValue) => {
      if (newValue > funds.value) {
        alert('You Are Broke');
      }
    });
    // setTimeout(() => {
    //   objRef.value.name = 'Adi from reference';
    //   objRef.value.age = 27;
    //   objReact.name = 'Adi from reactive timeout';
    //   objReact.age = 25;
    // }, 2000);

    return {
      userName: uname,
      objRef: objRef,
      objReact: objReact,
      firstName,
      lastName,
      lastNameInput,
      uAge,
      funds,
      amount,
      expense,
      namadepan,
      namabelakang,
      toogleRef: toogleRef,
      toogleReactive: toogleReactive,
      toogleGoals: toogleGoals,
      addExpense,
      setLastName,
      expenseleft,
      goals,
      fullname,
    };
  },
  // data() {
  //   return {
  //     userName: 'Maximilian',
  //   };
  // },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}

.container {
  margin: 3rem auto;
  max-width: 30rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  text-align: center;
}

li {
  text-align: left;
}
</style>
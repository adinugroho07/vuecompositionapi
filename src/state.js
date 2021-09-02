import { createStore } from 'vuex';

const store = createStore({
    state: () => ({
        counter: 0
    }),
    mutations: {
        addCounter: (state) => {
            state.counter++;
        },
        minusCounter: (state) => {
            state.counter -= 1;
        }
    },
    getters: {
        getCounter: (state) => {
            return state.counter;
        }
    },
    actions: {
        actionsAdd(context) {
            context.commit('addCounter');
        },
        actionsDecrease(context) {
            context.commit('minusCounter');
        }
    }
});

export default store;
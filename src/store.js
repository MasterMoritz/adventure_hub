import Vue from "vue";
import Vuex from "vuex";
import gql from "graphql-tag";

Vue.use(Vuex);

const currentEditModule = {
  namespaced: true,
  state: {
    adventure: {
      id: -1,
      title: ""
    },
    page: {
      id: -1
    }
  },
  mutations: {
    currentAdventure(state, data) {
      state.adventure.id = data.id;
      state.adventure.title = data.title;
    }
  },
  actions: {
    async currentAdventure(context, payload) {
      const result = await payload.apolloClient.query({
        query: gql`
           query GetData($key: Int!) {
            adventure(where: {adventureKey: {_eq: $key}}) {
              adventureKey
              name
            }
          }
        `,
        variables: {
          key: payload.id
        }
      });
      context.commit('currentAdventure', {
        id: result.data["adventure"][0]['adventureKey'],
        title: result.data["adventure"][0]['name']
      });
    }
  }
}

export default new Vuex.Store({
  modules: {
    edit: currentEditModule
  }
});

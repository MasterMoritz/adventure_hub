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
    },
    currentPage(state, data) {
      state.page.id = data.id;
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
            page(order_by: {page_nr: asc}, limit: 1, where: {adventure_key: {_eq: $key}}) {
              page_id
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
      context.commit('currentPage', {
        id: result.data["page"][0]['page_id']
      });
    },
    async changeCurrentPage(context, payload) {
      const result = await payload.apolloClient.query({
        query: gql`
           query GetData($key: Int!, $pageNr: Int!) {
            page(where: {adventure_key: {_eq: $key}, page_nr: {_eq: $pageNr}}, limit: 1) {
              page_id
            }
          }
        `,
        variables: {
          key: context.state.adventure.id,
          pageNr: payload.pageNr
        }
      });
      context.commit('currentPage', {
        id: result.data["page"][0]['page_id']
      });
    }
  }
}

const currentPlayModule = {
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
    },
    currentPage(state, data) {
      state.page.id = data.id;
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
            page(order_by: {page_nr: asc}, limit: 1, where: {adventure_key: {_eq: $key}}) {
              page_id
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
      context.commit('currentPage', {
        id: result.data["page"][0]['page_id']
      });
    },
    async changeCurrentPage(context, payload) {
      const result = await payload.apolloClient.query({
        query: gql`
           query GetData($key: Int!, $pageNr: Int!) {
            page(where: {adventure_key: {_eq: $key}, page_nr: {_eq: $pageNr}}, limit: 1) {
              page_id
            }
          }
        `,
        variables: {
          key: context.state.adventure.id,
          pageNr: payload.pageNr
        }
      });
      context.commit('currentPage', {
        id: result.data["page"][0]['page_id']
      });
    }
  }
}

export default new Vuex.Store({
  modules: {
    edit: currentEditModule,
    play: currentPlayModule
  }
});

export const state = () => ({
  people: [],
  selected: null,
  peopleSelected: [],
  e: null

})

export const mutations = {
  setPeople (state, values) {
    state.people = values
  },
  setSelected (state, id) {
    state.selected = id
  },
  setPeopleSingle (state, value) {
    state.peopleSelected = value
  },
  SET_DATA (state, value) {
    state.e = value
  }
}

export const getters = {
  getPeople: (state) => (name, film, specie) => {
    return state.people.filter((user) => {
      return user.films.includes(film) &&
      (!name || user.name.toString().toLowerCase().startsWith((name).toString().toLowerCase())) &&
      (!specie || user.species.includes(specie))
    })
  },

  getSelected: (state) => {
    return state.selected
  }
}

export const actions = {
  async getIP ({ commit }) {
    const data = await this.$axios.$get('people')
    commit('SET_DATA', data)
  }
}

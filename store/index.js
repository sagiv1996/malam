export const state = () => ({
  people: [],
  selected: null,
  films: []
})

export const mutations = {
  SET_PEOPLE (state, values) {
    state.people = values
  },
  SET_DATA (state, value) {
    state.selected = value
  },
  SET_FILMS (state, value) {
    state.films.push(value)
  },
  REST_FILMS (state) {
    state.films = []
  },
  REMOVE_PEOPLE (state) {
    const index = state.people.findIndex(p => p.url === state.selected.url)
    state.people.splice(index, 1)
  },
  CREATE_PEOPLE (state, people) {
    state.people.push(people)
  },
  EDIT_PEOPLE (state, people) {
    const index = state.people.findIndex(p => p.url === people.url)
    state.people[index] = people
  }
}

export const getters = {
  getPeople: state => (name, film, specie) => {
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
  async loadData ({ commit }, selected) {
    const data = await this.$axios.$get(`people/${selected}`)
    commit('SET_DATA', data)
    commit('REST_FILMS')
    if (data.films) {
      data.films.forEach(async (film) => {
        const f = await this.$axios.$get(`films/${film}`)
        commit('SET_FILMS', f)
      })
    }
  }
}

/*Info about user*/
import firebase from "firebase/app";

export default {
    state: {
        info: {}
    },
    mutations: {
        setInfo(state, info) {
            state.info = info
        },
        clearInfo(state) {
            state.info = {} //чтобы на фронтенде не кэшировалось что-либо в state, когда будем делать logout
        }
    },
    actions: {
        async fetchInfo({dispatch, commit}) {
            try{
                const uid = await dispatch('getUserID')
                const info =  (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
                commit('setInfo', info)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateInfo({dispatch, commit, getters}, toUpdate) {
            try{
                const uid = await dispatch('getUserID')
                const updateData = {...getters.info, ...toUpdate}
                await firebase.database().ref(`/users/${uid}/info`).update(updateData)
                commit('setInfo', updateData)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    },
    getters: {
        info: state => state.info
    }
}
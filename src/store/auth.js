/*Auth and register*/
import firebase from "firebase/app";
export default {
    actions: {
        async login({dispatch, commit}, {email, password}) {
            try{
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch(e) {
                commit('setError', e) //commit позволяет изменять state, вызывая mutations
                throw e
            }
        },
        async register({dispatch, commit}, {email, password, name}) {
            try{
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await dispatch('getUserID') //к action в vuex обращение происходит черз dispatch
                await firebase.database().ref(`/users/${uid}/info`).set({
                    bill: 10000,
                    name
                })
            } catch(e) {
                commit('setError', e)
                throw e
            }
        },
        getUserID() {
            const user = firebase.auth().currentUser
            return user ? user.uid : null
        },
        async logout({commit}) {
            await firebase.auth().signOut() //эти методы так же возвращают промис
            commit('clearInfo')
        }
    }
}
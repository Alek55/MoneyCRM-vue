import firebase from "firebase/app";

export default {
    actions: {
        async createCategory({commit, dispatch}, {title, limit}) {
            try{
                const uid = await dispatch('getUserID')
                const category = await firebase.database().ref(`/users/${uid}/categories`).push({title, limit}) //если categoreis не сущетвует, то firebase его сам создаст
                const cats = Object.keys(category).map(key => {
                    return {
                        title: categories[key].title,
                        limit: categories[key].limit,
                        id: key
                    }
                })
                return cats
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchCategories({commit, dispatch}) {
            try{
                const uid = await dispatch('getUserID')
                const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}
                return Object.keys(categories).map(key => ({...categories[key], id: key}))
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchCategoryById({commit, dispatch}, id) {
            try{
                const uid = await dispatch('getUserID')
                const category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val() || {}
                return {...category, id}
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateCategory({commit, dispatch}, {title, limit, id}) {
            try{
                const uid = await dispatch('getUserID')
                await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title, limit})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    }
}
import axios from 'axios';
import Vue from 'vue';

const state = {
    users: [],
    userPosts: {},
    searchTerm: '',
};

const getters = {
    getUsers: state => state.users,
    getUserPosts: state => userId => state.userPosts[userId] || [],
    filteredUsers: state => {
        console.log("trr", state.searchTerm, typeof state.searchTerm);
        if (typeof state.searchTerm === 'string') {
            const searchTerm = state.searchTerm.trim().toLowerCase();
            if (searchTerm === '') {
                return state.users;
            }
            return state.users.filter(user => user.name.toLowerCase().includes(searchTerm));
        }
    },
};

const actions = {
    async fetchUsers({commit}) {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            commit('setUsers', response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },
    async fetchUserPosts({commit}, userId) {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
            commit('setUserPosts', {userId, userPosts: response.data});
        } catch (error) {
            console.error('Error fetching user posts:', error);
            throw error;
        }
    },
    updateSearchTerm({commit}, searchTerm) {
        commit('setSearchTerm', searchTerm);
    },
};

const mutations = {
    setUsers(state, users) {
        state.users = users;
    },
    setUserPosts(state, {userId, userPosts}) {
        Vue.set(state.userPosts, userId, userPosts);
    },
    setSearchTerm(state, searchTerm) {
        state.searchTerm = searchTerm;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};

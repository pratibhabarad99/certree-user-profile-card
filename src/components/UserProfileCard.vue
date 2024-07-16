<template>
    <v-container class="py-6">
        <UserSearch @getSearchString="handleSearchInput"/>
        <commonLoader v-if="isLoading"/>
        <v-row v-if="filteredUsers.length > 0">
            <v-col :key="user.id" cols="12" lg="4" md="4" sm="6" v-for="user in filteredUsers">
                <v-card class="user-card">
                    <div class="card-header">
                        <v-avatar size="120">
                            <img alt="Profile Picture" class="rounded-full"
                                 src="https://banner2.cleanpng.com/20180329/zue/kisspng-computer-icons-user-profile-person-5abd85306ff7f7.0592226715223698404586.jpg">
                        </v-avatar>
                    </div>
                    <div class="card-body">
                        <h2 :style="{ color: getUsernameColor(user) }" class="text-2xl font-semibold">{{ user.name
                            }}</h2>
                        <p class="text-gray-200">{{ user.company?.name }}</p>
                        <div class="mt-4">
                            <p class="text-sm text-gray-300"><strong>Username:</strong> {{ user.username }}</p>
                            <p class="text-sm text-gray-300"><strong>Email:</strong> {{ user.email }}</p>
                            <p class="text-sm text-gray-300"><strong>Phone:</strong> {{ user.phone }}</p>
                            <p class="text-sm text-gray-300"><strong>Website:</strong> <a
                                    :href="'http://' + user.website" target="_blank">{{ user.website }}</a></p>
                        </div>
                        <div class="mt-4">
                            <p class="text-sm text-gray-300"><strong>Address:</strong> {{ user.address.suite }}, {{
                                user.address.street }}, {{ user.address.city }}, {{ user.address.zipcode }}</p>
                            <p class="text-sm text-gray-300"><strong>Company:</strong> {{ user.company.name }}</p>
                            <p class="text-sm text-gray-300"><strong>Company Details:</strong> {{
                                user.company.catchPhrase }} - {{ user.company.bs }}</p>
                        </div>
                        <div class="mt-4 flex justify-center items-center">
                            <v-btn @click="togglePostsVisibility(user.id)" class="custom-btn" dark>
                                <template v-if="showPosts[user.id]">
                                    Hide Posts
                                    <v-icon>mdi-chevron-up</v-icon>
                                </template>
                                <template v-else>
                                    Show Posts
                                    <v-icon>mdi-chevron-down</v-icon>
                                </template>
                            </v-btn>
                        </div>
                        <transition name="fade">
                            <div class="mt-4 posts-container" v-if="showPosts[user.id]">
                                <commonLoader v-if="isLoadingPosts && loadingUserId === user.id"/>
                                <v-row class="post-list">
                                    <template v-if="user.posts.length > 0">
                                        <v-col :key="post.id" cols="12" v-for="(post) in user.posts">
                                            <UserPost :post="post">
                                                <!-- Custom content for each post -->
                                                <h3 class="text-lg font-semibold">{{ post.title }}</h3>
                                                <p class="text-gray-700">{{ post.body }}</p>
                                            </UserPost>
                                        </v-col>
                                        <p class="text-center text-gray-600" v-if="user.posts.length === 0">No posts
                                            available for this user.</p>
                                    </template>
                                    <template v-else>
                                        <p class="text-center text-gray-600">No posts available for this user.</p>
                                    </template>
                                </v-row>
                            </div>
                        </transition>
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col cols="12">
                <p class="text-center text-gray-600">No users found with the search term "{{ searchTerm }}"</p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import axios from 'axios';
    import UserSearch from './UserSearch.vue';
    import commonLoader from './commonLoader.vue';
    import UserPost from './UserPost.vue';

    export default {
        name: 'UserProfileCard',
        components: {
            UserSearch,
            commonLoader,
            UserPost,
        },
        data() {
            return {
                showPosts: {},
                searchTerm: '',
                users: [],
                isLoading: false,
                isLoadingPosts: false,
                loadingUserId: null,
            };
        },
        computed: {
            filteredUsers() {
                const searchTerm = this.searchTerm.trim().toLowerCase();
                if (!searchTerm) {
                    return this.users;
                }
                return this.users.filter(user => user.name.toLowerCase().includes(searchTerm));
            },
        },
        methods: {
            async fetchUsers() {
                try {
                    this.isLoading = true;
                    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                    this.users = response.data.map(user => ({
                        ...user,
                        posts: [],
                    }));
                } catch (error) {
                    console.error('Error fetching users:', error);
                } finally {
                    this.isLoading = false;
                }
            },
            handleSearchInput(searchTerm) {
                this.isLoading = true;
                setTimeout(() => {
                    this.searchTerm = searchTerm;
                    this.isLoading = false;
                }, 1000);
            },
            async togglePostsVisibility(userId) {
                if (this.showPosts[userId]) {
                    this.showPosts[userId] = false;
                } else {
                    this.isLoadingPosts = true;
                    this.loadingUserId = userId;
                    setTimeout(() => {
                        this.fetchUserPosts(userId);
                    }, 1000);
                }
            },
            async fetchUserPosts(userId) {
                try {
                    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
                    const updatedUsers = this.users.map(user => {
                        if (user.id === userId) {
                            return {
                                ...user,
                                posts: response.data,
                            };
                        }
                        return user;
                    });
                    this.users = updatedUsers;
                    this.showPosts[userId] = true; // Show posts after fetching
                } catch (error) {
                    console.error('Error fetching user posts:', error);
                } finally {
                    this.isLoadingPosts = false;
                    this.loadingUserId = null;
                }
            },
            getUsernameColor(user) {
                if (user.company && user.company.name === 'SomeCompany') {
                    return '#ff5722';
                }
                return '#ffffff';
            },
        },
        created() {
            this.fetchUsers();
        },
    };
</script>

<style scoped>
    .user-card {
        border-radius: 12px;
        padding: 20px;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        max-width: 350px;
        background: #333;
        color: #fff;
    }

    .user-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
    }

    .card-header {
        display: flex;
        justify-content: center;
        margin-bottom: 16px;
    }

    .card-body {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }

    .custom-btn {
        background-color: #ff5722;
        color: #ffffff;
    }

    .custom-btn:hover {
        background-color: #f4511e;
    }

    .v-avatar img {
        border-radius: 50%;
    }

    .text-gray-200 {
        color: #ccc;
    }

    .text-sm {
        font-size: 0.875rem;
    }

    .posts-container {
        max-height: 300px;
        overflow-y: auto;
        padding-right: 16px;
    }

    .posts-container::-webkit-scrollbar {
        width: 8px;
    }

    .posts-container::-webkit-scrollbar-track {
        background: #4a4a4a;
        border-radius: 10px;
    }

    .posts-container::-webkit-scrollbar-thumb {
        background-color: #666;
        border-radius: 10px;
    }

    .posts-container::-webkit-scrollbar-thumb:hover {
        background-color: #888;
    }

    .post-list {
        flex-wrap: wrap;
    }

    .post-card {
        margin-bottom: 16px;
        padding: 16px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        background-color: #fff;
        width: 100%;
    }

    @media (min-width: 768px) {
        .post-card {
            width: calc(100% - 6px);
        }
    }
</style>

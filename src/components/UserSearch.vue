<template>
    <div class="search-container">
        <v-container class="py-6">
            <v-row align="center" justify="center">
                <v-col cols="12" md="8" sm="10">
                    <v-text-field
                            @input="handleInput"
                            class="search-input"
                            dense
                            hide-details
                            outlined
                            solo
                            v-model="searchTerm"
                    >
                        <template v-slot:append-inner>
                            <div class="placeholder" v-if="!searchTerm">Search Users</div>
                        </template>
                    </v-text-field>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: 'UserSearch',
        data() {
            return {
                searchTerm: '',
            };
        },
        methods: {
            handleInput() {
                this.$emit('getSearchString', this.searchTerm.length ? this.searchTerm.trim() : '');
            },
        },
    };
</script>

<style scoped>
    .search-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .search-input {
        border-radius: 25px !important;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        background: white !important;
        color: black !important;
        padding-left: 20px !important;
    }

    .search-input .v-input__control .v-input__slot {
        border-radius: 25px !important;
        border: none !important;
    }

    .search-input .v-input__control .v-input__slot::before,
    .search-input .v-input__control .v-input__slot::after {
        border: none !important;
    }

    .search-input .v-label {
        display: none !important;
    }

    .placeholder {
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        color: #b0b0b0;
        opacity: 1;
        pointer-events: none;
    }

    .search-input input::placeholder {
        color: transparent;
    }

    .search-input input {
        padding: 10px 20px !important;
    }
</style>

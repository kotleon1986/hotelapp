export const API_ENDPOINTS = {
    auth: {
        login: {
            method: "post",
            url: "/auth/login"
        },
        register: {
            method: "post",
            url: "/auth/register"
        },
        profile: {
            method: 'post',
            url: "/auth/profile"
        }
    },


    admin: {
        hotel: {
            details: {
                method: "get",
                url: "/admin/hotel"
            },
            update: {
                method: "post",
                url: "/admin/hotel"
            },
            list: {
                method: "get",
                url: "/admin/hotel/list"
            }
        },
        rooms: {
            data: {
                method: "get",
                url: "/admin/rooms"
            },
            get: {
                method: "get",
                url: "/admin/rooms"
            },
            list: {
                method: "get",
                url: "/admin/rooms/list"
            },
            create: {
                method: "post",
                url: "/admin/rooms"
            },
            update: {
                method: "post",
                url: "/admin/rooms"
            },
            delete: {
                method: "delete",
                url: "/admin/rooms"
            }
        },
        roomTypes: {
            data: {
                method: "get",
                url: "/admin/room-types"
            },
            list: {
                method: "get",
                url: "/admin/room-types/list"
            },
            get: {
                method: "get",
                url: "/admin/room-types"
            },
            create: {
                method: "post",
                url: "/admin/room-types"
            },
            update: {
                method: "put",
                url: "/admin/room-types"
            },
            delete: {
                method: "delete",
                url: "/admin/room-types"
            }
        },
        priceList: {
            data: {
                method: "get",
                url: "/admin/price-list"
            },
            get: {
                method: "get",
                url: "/admin/price-list"
            },
            create: {
                method: "post",
                url: "/admin/price-list"
            },
            update: {
                method: "put",
                url: "/admin/price-list"
            },
            delete: {
                method: "delete",
                url: "/admin/price-list"
            }
        },
        bookings: {
            data: {
                method: "get",
                url: "/admin/bookings"
            },
            get: {
                method: "get",
                url: "/admin/bookings"
            },
            create: {
                method: "post",
                url: "/admin/bookings"
            },
            update: {
                method: "put",
                url: "/admin/bookings"
            },
            delete: {
                method: "delete",
                url: "/admin/bookings"
            }
        },
        users: {
            list: {
                method: "get",
                url: "/admin/users/list"
            }
        }
    }
};

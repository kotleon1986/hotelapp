import axios from "axios";
import StoreHelper from "../../helpers/store-helper";

import { API_ENDPOINTS } from "./api.config";

import _ from "lodash";

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const Api = {
    request(endpoint, params, body) {
        const { method, url } = _.get(API_ENDPOINTS, endpoint);

        return axios[method](this.url(url, params), body || params)
            .then(res => {
                StoreHelper.clearErrors();

                if (res.data.message) {
                    StoreHelper.setFlash(res.data);
                }

                return res.data;
            })
            .catch(err => {
                if (err.response.status === 401) {
                    window.location.href = "/login";
                    throw err.response;
                }

                if (err.response.data.message) {
                    StoreHelper.setFlash(err.response.data);
                }

                if (err.response.data.errors) {
                    StoreHelper.setErrors(err.response.data.errors);
                }

                throw err.response;
            });
    },

    url(url, params) {
        url = `${process.env.REACT_APP_API_URL}${url}`;
        if (Number(params)) {
            url += `/${params}`;
        } else if (Array.isArray(params)) {
            params.forEach(param => (url += `/${param}`));
        }

        return url;
    },

    setAuthToken(token) {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    },

    image(imageUrl) {
        if (!imageUrl || !imageUrl.length) {
            return `${process.env.REACT_APP_BASE_URL}/images/no-image.jpg`
        }

        const root = process.env.REACT_APP_API_URL.replace("/api", '');
        const imagePath = imageUrl.replace("public/", '').replace('\\', '/');
        return `${root}/${imagePath}`;
    }
};

export default Api;

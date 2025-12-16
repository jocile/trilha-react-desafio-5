import axios from 'axios';

export const api  = axios.create({
    baseURL: 'https://ubjcldatmwpdldznijaf.supabase.co/rest/v1/',
    headers: {
        apikey: "sb_publishable_NpPDHfLA9mkqSYo_vu5tXg_4bRx680n",
        authorization: "Bearer sb_publishable_NpPDHfLA9mkqSYo_vu5tXg_4bRx680n"
    }
})
import { api } from '../services/api'

export const getPosts = async () => {
    const {data} = await api.get('/posts'); 

    if(data){
        return data;
    }

    return []
}

export const getPostBySlug = async (id) => {

    // Busca um post específico pela coluna `id` usando Supabase REST
    if (!id) return null;

    try {
        const { data } = await api.get(`/posts?id=eq.${encodeURIComponent(id)}`);
        if (Array.isArray(data) && data.length > 0) {
            return data[0];
        }
        return null;
    } catch (error) {
        // log mínimo; ajustar conforme necessidade de observabilidade
        // não lança para não quebrar quem chama sem tratamento
        // console.error('getPostBySlug error', error);
        return null;
    }
}
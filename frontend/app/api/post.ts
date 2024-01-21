import axios from 'axios'
import UserApi from './user';
import { Id } from 'react-toastify';

interface Noticia {
    id: number;
    titulo_post: string;
    autor_post: number;
    autor_post_nome: string;
    autor_imagem_post: string;
    conteudo_post: string;
    criacao: string;
    imagem_post: string;
    comentarios: [number];
}


interface Profile {
    id: number,
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    foto_perfil: string,
    post_permissoes: boolean,
}

interface Comentario {
    id: number;
    post_comentario: number;
    autor_comentario: number;
    autor_comentario_nome: string;
    imagem_autor_comentario: string;
    conteudo_comentario: string;
    criacao: string;
}

interface Comentarios {
    data: {
        count: number;
        next: string;
        previous: string;
        results: Comentario[];
    }
}

interface Favorito {
    count: number;
    next: string;
    previous: string;
    data: {
        results: [
            {
                id: number;
                post_favorito: number;
                autor_favorito: number;
            }
        ]
    }

}

class Post {
    route() {
        return "http://localhost:8000/api/v1/posts/";
    }

    favorite_route() {
        return "http://localhost:8000/api/v1/favoritos/";
    }

    async ListPost() {
        try {
            const response = await axios.get(this.route())
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async GetPost(post_id: number) {
        try {
            const response = await axios.get(this.route() + post_id + "/")
            return response.data
        } catch (error) {
            throw error
        }
    }

    async CreatePost(title: string, conteudo: string, img: any) {
        try {
            const token = localStorage.getItem('access')
            const response = await axios.post(this.route(), {
                "titulo_post": title,
                "conteudo_post": conteudo,
                "imagem_post": img,
            },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + token
                    }
                })
            return response.data
        } catch (error) {
            throw error
        }
    }

    async ListComments(post_id: number) {
        try {
            const response: Comentarios = await axios.get(this.route() + post_id + "/comentarios/")
            console.log(response)
            return response.data.results
        } catch (error) {
            throw error
        }
    }

    async CreateComment(post_id: number, comment: string, autor_comentario_id: number) {
        try {
            const token = localStorage.getItem('access')

            const response = await axios.post(
                this.route() + post_id + "/comentarios/",
                {
                    "post_comentario": post_id,
                    "autor_comentario": autor_comentario_id,
                    "conteudo_comentario": comment,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                }
            );
            return response.data.comentario;
        } catch (error) {
            throw error
        }
    }


    async ListFavoritePosts() {
        try {
            const token = localStorage.getItem('access')
            const response = await axios.get(
                this.favorite_route(),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                }
            );
            return response.data
        } catch (error) {
            throw error
        }
    }

    async CreateFavoritePosts(post_id: number) {
        try {
            const token = localStorage.getItem('access')
            const response = await axios.post(
                this.favorite_route() + post_id + "/",
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                }
            );
            return response.data
        } catch (error) {
            throw error
        }
    }

    async DeleteFavoritePosts(post_id: number) {
        try {
            const token = localStorage.getItem('access')
            const response = await axios.delete(
                this.favorite_route() + "delete/" + post_id + "/",
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                }
            );
            return response.data
        } catch (error) {
            throw error
        }
    }
}

const PostApi = new Post();

export default PostApi;
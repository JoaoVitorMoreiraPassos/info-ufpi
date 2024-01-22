import axios from 'axios'
import host from './host'
interface Profile {
    id: number,
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    foto_perfil: string,
    post_permissoes: boolean,
    refeicao_permissoes: boolean
}



class User {

    route() {
        return host + "api/v1/";
    }

    token_route() {
        return host + "api/v1/token/";
    }

    async Login(username: string, password: string) {
        try {
            const route = await this.route()
            const response = await axios.post(route + "token/", {
                "username": username,
                "password": password
            })
            return response.data
        } catch (error) {
            throw error;
        }
    }

    async Register(first_name: string, last_name: string, username: string, email: string, password: string,) {
        try {
            const response = await axios.post(this.route() + 'cadastrar/', {
                "first_name": first_name,
                "last_name": last_name,
                "username": username,
                "email": email,
                "password": password,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return response
        }
        catch (error) {
            throw error;
        }
    }

    async SearchUser(username: string) {
        try {
            const response = await axios.get(this.route() + 'user-detail/' + username + "/", {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return response.data
        }
        catch (error) {
            throw error;
        }
    }

    async SearchUsers(username: string) {
        try {
            const response = await axios.get(this.route() + 'user-detail/search/' + username + "/", {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return response.data
        }
        catch (error) {
            throw error;
        }
    }

    async recuperarSenha(email: string) {
        try {
            const response = await axios.post(this.route() + 'users/reset_password/', {
                "email": email,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return response
        }
        catch (error) {
            throw error;
        }
    }

    async resetarSenha(password1: string, password2: string, uid: string, token: string) {
        try {
            const response = await axios.post(this.route() + 'users/reset_password_confirm/', {
                "uid": uid,
                "token": token,
                "new_password": password1,
                "re_new_password": password2
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return response
        }
        catch (error) {
            throw error;
        }
    }

    async UpdateUser(first_name: string, last_name: string, username: string, email: string, image: any) {
        try {
            const token = localStorage.getItem('access')
            const response = await axios.put(this.route() + "user-update/", {
                "first_name": first_name,
                "last_name": last_name,
                "username": username,
                "email": email,
                "foto_perfil": image
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            })
            return response;
        } catch (error) {
            throw error;
        }
    }

    async RefreshToken() {
        try {
            const refresh = localStorage.getItem('refresh')
            if (!refresh) {
                throw new Error("Refresh Token não encontrado")
            }
            const response = await axios.post(this.token_route() + "refresh/", {
                "refresh": refresh
            })
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async AcessVerify() {
        try {
            const token = localStorage.getItem('access')
            if (!token) {
                // Retornar o status do erro
                throw new Error("Token não encontrado")
            }
            const response = await axios.post(this.token_route() + "verify/", {
                token: token
            })
            return response;
        } catch (error) {
            throw error;
        }
    }

    async GetLoggedUser() {
        try {
            const response = await this.AcessVerify();
            if (response.status === 200) {
                const user: Profile = await this.GetUser();
                return user;
            }
        } catch (error: any) {
            if (error.toString() == "Error: Token not found") {
                localStorage.clear();
                throw error;
            }
            try {
                const refresh = await this.RefreshToken();
                localStorage.setItem('access', refresh.access)
                const user: Profile = await this.GetUser();
                return user
            } catch (error: any) {
                if (error.toString() == "Error: Token not found") {
                    localStorage.clear();
                    throw error;
                }
                else if (error.response.status === 401) {
                    localStorage.clear();
                    throw error;
                }
            }

        }
    }

    async UpdateUserPhoto(photo: any) {
        try {
            const token = localStorage.getItem('access')
            const response = await axios.put(this.route() + "user-photo-update/", {
                "photo": photo
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            })
            return response;
        } catch (error) {
            throw error;
        }
    }

    async GetUser() {
        try {
            const token = localStorage.getItem('access');
            const config = { headers: { Authorization: `Bearer ${token}` } };


            const response = await axios.get(this.route() + "user-detail/", config);
            const user: Profile = response.data;
            return user;
        }
        catch (error) {
            throw error;
        }
    }

}


const UserApi = new User();

export default UserApi;
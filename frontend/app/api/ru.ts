import axios from 'axios';
import dotenv from 'dotenv';
import host from './host';


interface Alimento {
    id: number;
    tipo_refeicao: string;
    nome_refeicao: string;
}

interface Cardapio {
    id: number;
    tipo: string;
    data: string;
    alimentos: Alimento[];
}

interface Alimentos {
    data: {
        count: number;
        next: string;
        previous: string;
        results: Alimento[];
    }

}


class RUAPI {
    alimento_route = () => {
        return host + "api/v1/alimentos/"
    }
    cardapio_route = () => {
        return host + "api/v1/cardapios/"
    }

    async getAlimento(id: Number) {
        try {
            const response = await axios.get(this.alimento_route() + id + "/")

            return response.data
        } catch (error) {
            throw error;
        }
    }

    async getAlimentos() {
        try {
            const response = await axios.get(this.alimento_route())

            return response.data
        } catch (error) {
            throw error;
        }
    }

    async postAlimento(data: any) {
        try {
            const token = localStorage.getItem('access')
            const response = await axios.post(this.alimento_route(), data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            return response
        } catch (error) {
            throw error;
        }
    }

    async deleteAlimento(id: Number) {
        try {
            const token = localStorage.getItem('access')
            const response = await axios.delete(this.alimento_route() + id + "/", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            return response
        } catch (error) {
            throw error;
        }
    }

    async getCardapio() {
        try {
            const response = await axios.get(this.cardapio_route())
            return response.data
        } catch (error) {
            throw error;
        }
    }

    async getCardapioByDate(date: string) {
        try {
            const token = localStorage.getItem('access')
            const response = await axios.get(this.cardapio_route(),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
            console.log(response)
            return response.data
        } catch (error) {
            throw error;
        }
    }

    async postCardapio(data: any) {
        try {
            const token = localStorage.getItem('access')
            const response = await axios.post(this.cardapio_route(), data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            return response
        } catch (error) {
            throw error;
        }
    }

    async updateCardapio(id: Number | undefined, data: any) {
        try {
            const token = localStorage.getItem('access')
            const response = await axios.put(this.cardapio_route() + id + "/", data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            return response
        } catch (error) {
            throw error;
        }
    }
}

const api = new RUAPI()
export default api;
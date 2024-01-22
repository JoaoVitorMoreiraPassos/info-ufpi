import axios from 'axios';

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
        return "http://192.168.1.3:8000/api/v1/alimentos/"
    }
    cardapio_route = () => {
        return "http://192.168.1.3:8000/api/v1/cardapios/"
    }

    async getAlimento(id: number) {
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

    async deleteAlimento(id: number) {
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

    async updateCardapio(id: number, data: any) {
        try {
            const token = localStorage.getItem('access')
            const response = await axios.put(this.cardapio_route() + id + "/", data)
            return response
        } catch (error) {
            throw error;
        }
    }
}

const api = new RUAPI()
export default api;
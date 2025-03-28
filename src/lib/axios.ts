import axios from "axios";

const api = {
    getAllDevices: async () => {
        const { data } = await axios.get('/api/get-all-devices');
        return data;
    }
};

export default api;
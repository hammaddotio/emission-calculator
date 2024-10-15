export const headers: { headers: { Authorization: string | null } } = {
    headers: {
        Authorization: localStorage.getItem('token')
    }
};

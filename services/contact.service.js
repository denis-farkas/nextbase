import getConfig from 'next/config';

import { fetchWrapper } from 'helpers';

// contact.service declare les routes qu on va utiliser dans l 'api
// methode fetch pour le crud  des contact
const { publicRuntimeConfig } = getConfig();
// routes pour acceder a l api
const baseUrl = `${publicRuntimeConfig.apiUrl}/contacts`;


export const contactService = {
    register,
    getAll,
    getById,
    update,
    delete: _delete,
};
// quand tu veux enreigistrer un article il faut faire un fetch avec la methode post sur l adresse baseurlregister avec comme parametre article
async function register(contact) {
    await fetchWrapper.post(`${baseUrl}/register`, contact);
}

async function getAll() {
    return await fetchWrapper.get(baseUrl);
}

async function getById(id) {
    return await fetchWrapper.get(`${baseUrl}/${id}`);
}

async function update(id, params) {
    await fetchWrapper.put(`${baseUrl}/${id}`, params);

    
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(id) {
    await fetchWrapper.delete(`${baseUrl}/${id}`);
 
}
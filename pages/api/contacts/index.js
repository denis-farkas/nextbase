import { apiHandler, contactsRepo } from "helpers/api"; 
 
// utilise la methode getAll() pour recuperer les contacts
export default apiHandler({ 
  get: getAll, 
}); 

async function getAll(req, res) { 
  const contacts = await contactsRepo.getAll(); 
  return res.status(200).json(contacts); 
}
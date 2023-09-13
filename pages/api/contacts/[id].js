import { apiHandler, contactsRepo } from "helpers/api";
//  utilise les methodes qui sont dans le repo
export default apiHandler({
  get: getById,
  delete: _delete,
});

async function getById(req, res) {
  const contact = await contactsRepo.getById(req.query.id);

  if (!contact) throw "contact non existant";

  return res.status(200).json(contact);
}

async function _delete(req, res) {
  await contactsRepo.delete(req.query.id);
  return res.status(200).json({});
}
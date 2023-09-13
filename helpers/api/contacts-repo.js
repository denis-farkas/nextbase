import { db } from "helpers/api";

// requete sequelize que l on  fait directement dans la base de données
// methode sequelize qui sont comprise par mysql dans la base de données

export const contactsRepo = {
  getAll,
  getById,
  create,
  delete: _delete,
};

// requete avec des methode sequelize sur le model Contact
async function getAll() {
  return await db.Contact.findAll();
}

async function getById(id) {
  return await db.Contact.findByPk(id);
}

async function create(params) {
  const Contact = new db.Contact(params);
  // save Horaire
  await Contact.save();
}

// verification dans la base de donnée si l contact existe pour ensuite le supprimer
async function _delete(id) {
  const contact = await db.contact.findByPk(id);
  if (!contact) throw "Le contact n&apos;existe pas";

  // supprime l contact
  await contact.destroy();
}
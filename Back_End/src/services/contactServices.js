import db from "../models/index";

const getAllContact = async () => {
  try {
    const data = await db.Contact.findAll();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const createContact = async (user_name, email, phone, content) => {
  try {
    const data = await db.Contact.create({
      user_name,
      email,
      phone,
      content,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllContact, createContact };

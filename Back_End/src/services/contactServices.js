import db from "../models/index.js";

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

export default { getAllContact, createContact };

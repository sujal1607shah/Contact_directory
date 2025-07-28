import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Contact } from "../model/Contact.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createContact = asyncHandler(async (req, res) => {
  const { name, email, number } = req.body;

  if (!name || !email || !number) {
    throw new ApiError(400, "Please provide all fields");
  }

  const contact = await Contact.create({ name, email, number });

  return res
    .status(201)
    .json(new ApiResponse(201, "Contact created successfully", contact));
});

const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({});

  if (contacts.length === 0) {
    throw new ApiError(404, "No contacts found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "All contacts fetched successfully", contacts));
});

const getContact=asyncHandler(async(req,res)=>{
  const contact=await Contact.findById(req.body.id)
  return res
  .status(201)
  .json(201,getContact,"Got the one contact")
})

const updateContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, number } = req.body;

  if (!name || !email || !number) {
    throw new ApiError(400, "All fields are required for update");
  }

  const contact = await Contact.findById(id);

  if (!contact) {
    throw new ApiError(404, "Contact not found");
  }

  
  contact.name = name;
  contact.email = email;
  contact.number = number;

  const updatedContact = await contact.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Contact updated successfully", updatedContact));
});


const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const contact = await Contact.findById(id);

  if (!contact) {
    throw new ApiError(404, "Contact not found");
  }

  await Contact.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, "Contact deleted successfully", contact));
});


export {
  createContact,
  getAllContacts,
  updateContact,
  getContact,
  deleteContact
};

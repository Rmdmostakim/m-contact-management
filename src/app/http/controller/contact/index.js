const Contact = require("../../../models/contact");
const validators = require("../../../validators");
const { decode } = require("../../../helpers");
//scaffolding
const contact = {};

//get all
contact.all = async (req, res) => {
  const headers = req.headers["authorization"];
  const token = headers.slice(7);
  const decodeToken = decode(token);

  try {
    const contacts = await Contact.find({ user_uuid: decodeToken.uuid }).select(
      {
        _id: 0,
        user_uuid: 0,
      }
    );
    res.status(201).json({
      data: contacts,
    });
  } catch (err) {
    validators(err, res);
  }
};
//store new contact
contact.store = async (req, res) => {
  const headers = req.headers["authorization"];
  const token = headers.slice(7);
  const decodeToken = decode(token);

  const data = {
    user_uuid: decodeToken.uuid,
    first_name: req.body.first_name,
    last_name: req.body.last_name || null,
    phone: req.body.phone,
  };

  try {
    const newContact = new Contact(data);
    await newContact.save();
    res.status(201).json({
      success: "new contact created successfully",
    });
  } catch (err) {
    validators(err, res);
  }
};
// update contact
contact.update = async (req, res) => {
  const headers = req.headers["authorization"];
  const token = headers.slice(7);
  const decodeToken = decode(token);
  const filter = {
    user_uuid: decodeToken.uuid,
    uuid: req.body.uuid,
  };
  const update = {
    $set: {
      first_name: req.body.first_name,
      last_name: req.body.last_name || null,
      phone: req.body.phone,
    },
  };

  try {
    const result = await Contact.updateOne(filter, update);
    res.status(202).json({
      success: "contact updated successfully",
    });
  } catch (err) {
    validators(err, res);
  }
};
// delete contact
contact.delete = async (req, res) => {
  const { uuid } = req.params;

  try {
    const result = await Contact.deleteOne({ uuid });
    res.status(200).json({
      success: "contact deleted successfully",
    });
  } catch (err) {
    validators(err, res);
  }
};

module.exports = contact;

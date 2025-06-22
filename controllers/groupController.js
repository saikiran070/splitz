import db from "../models/index.js";

export const createGroup = async (req, res) => {
  try {
    const { name, userIds } = req.body;
    const group = await db.Group.create({ name });

    const groupUsers = userIds.map(userId => ({ groupId: group.id, userId }));
    await db.GroupUser.bulkCreate(groupUsers);

    res.status(201).json({ message: "Group created", group });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getGroup = async (req, res) => {
  try {
    const group = await db.Group.findByPk(req.params.id, {
      include: [db.User, db.Expense],
    });
    if (!group) return res.status(404).json({ error: "Group not found" });
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

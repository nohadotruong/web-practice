import db from "../config/db.js";

export async function addRole(roleData) {
  try {
    const result = await db.query(
      "INSERT INTO roles (name_vi, name_en) VALUES ($1, $2) RETURNING *",
      [roleData.name_vi, roleData.name_en]
    );

    return result.rows[0];
  } catch (error) {
    if (error.code === "23505") {
      return { errors: "ROLE_EXISTS" };
    }

    return { errors: "Error: " + error };
  }
}

export async function getAllRoles() {
  const result = await db.query("SELECT * FROM roles");
  return { roleList: result.rows };
}

export async function getRoleById(roleId) {
  console.log("roleId");

  console.log(roleId);

  const result = await db.query(
    "SELECT * FROM roles WHERE id = $1",
    [roleId]
  );

  if (result.rowCount === 0) {
    return { error: "Role not found!" };
  }

  return { roleInfo: result.rows[0] };
}

export async function updateRoleById(roleData) {
  try {
    const result = await db.query(
      "UPDATE roles SET name_en = $1, name_vi = $2 WHERE id = $3",
      [roleData.name_vi, roleData.name_en, roleData.id]
    );

    return result.rows[0];
  } catch (error) {
    if (error.code === "23505")
      return { errors: "ROLE_EXISTS" };

    return { errors: "Error: " + error };
  }
}

export async function deleteRoleById(roleData) {
  await db.query("DELETE FROM roles WHERE id = $1", [
    roleData.id,
  ]);
}

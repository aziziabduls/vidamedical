const prisma = require('../config/prisma');
const { NotFoundError } = require('../utils/errors');

async function listDoctors({ activeOnly = false, poliCode } = {}) {
  return prisma.doctor.findMany({
    where: {
      ...(activeOnly ? { isActive: true } : {}),
      ...(poliCode ? { poliCode } : {}),
    },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
  });
}

async function createDoctor(data) {
  return prisma.doctor.create({
    data: {
      name: data.name,
      poliCode: data.poliCode,
      poliName: data.poliName,
      specialistTag: data.specialistTag,
      schedule: data.schedule,
      location: data.location,
      description: data.description,
      focusAreas: data.focusAreas,
      isActive: data.isActive ?? true,
      sortOrder: data.sortOrder ?? 0,
    },
  });
}

async function updateDoctor(id, data) {
  const existing = await prisma.doctor.findUnique({ where: { id } });
  if (!existing) {
    throw new NotFoundError('Doctor/Poli record not found');
  }

  return prisma.doctor.update({
    where: { id },
    data,
  });
}

async function deleteDoctor(id) {
  const existing = await prisma.doctor.findUnique({ where: { id } });
  if (!existing) {
    throw new NotFoundError('Doctor/Poli record not found');
  }

  await prisma.doctor.delete({ where: { id } });
  return { id };
}

module.exports = {
  listDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};

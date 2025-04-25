//import express from 'express';
import express from 'express';
import { MedicineControllers } from './medicine.controller';

import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import Medicine from './medicine.model';
//import { updateMedicineSchema  } from './updateProduct.validation';

const router = express.Router();

router.post('/', auth(USER_ROLE.admin), async (req, res) => {
  try {
    const medicineData = req.body;
    const result = await Medicine.create(medicineData);

    res.status(201).json({
      success: true,
      message: 'Medicine created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong!',
    });
  }
});

router.get(
  '/',
  //auth( USER_ROLE.admin,USER_ROLE.customer),
  MedicineControllers.getAllMedicines
);

router.get('/:id', MedicineControllers.getASpecificMedicine);

router.put('/:id', auth(USER_ROLE.admin), MedicineControllers.updateAMedicine);

router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  MedicineControllers.deleteAMedicine
);

export const MedicineRoutes = router;

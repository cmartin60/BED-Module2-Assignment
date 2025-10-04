
import Joi, { ObjectSchema }  from 'joi';

/**
 * Employee schema
 */
export const employeeSchemas: {
	create: { body: ObjectSchema };
	update: { params: ObjectSchema; body: ObjectSchema };
} = {
	// POST /api/v1/employees - Create new Employee
	create: {
		body: Joi.object({
			name: Joi.string().required().messages({
				'any.required': 'Name is required',
				'string.empty': 'Name cannot be empty',
			}),
			position: Joi.string().required().messages({
				'any.required': 'Position is required',
				'string.empty': 'Position cannot be empty',
			}),
            department: Joi.string().optional().messages({
                'string.empty': 'Department cannot be empty',
            }),
            phone: Joi.string().optional().messages({
                'string.empty': 'Phone cannot be empty',
            }),
			email: Joi.string().email().required().messages({
				'any.required': 'Email is required',
				'string.empty': 'Email cannot be empty',
				'string.email': 'Email must be a valid email address',
			}),
			branchId: Joi.string().required().messages({
				'any.required': 'Branch ID is required',
				'string.empty': 'Branch ID cannot be empty',
			}),
		}),
	},

	// PUT /api/v1/employees/:id - Update Employee
	update: {
		params: Joi.object({
			id: Joi.string().required().messages({
				'any.required': 'Employee ID is required',
				'string.empty': 'Employee ID cannot be empty',
			}),
		}),
		body: Joi.object({
			id: Joi.string().optional().messages({
                'string.empty': 'Id cannot be empty',
            }),
			name: Joi.string().optional().messages({
				'string.empty': 'Name cannot be empty',
			}),
			position: Joi.string().optional().messages({
				'string.empty': 'Position cannot be empty',
			}),
			department: Joi.string().optional().messages({
                'string.empty': 'Department cannot be empty',
            }),
			email: Joi.string().email().optional().messages({
				'string.empty': 'Email cannot be empty',
				'string.email': 'Email must be a valid email address',
			}),
			branchId: Joi.string().optional().messages({
				'string.empty': 'Branch ID cannot be empty',
			}),
		}),
	},
};

/**
 * Branch schema
 */
export const branchSchemas: {
	create: { body: ObjectSchema };
	update: { params: ObjectSchema; body: ObjectSchema };
} = {
	// POST /api/v1/branches - Create new Branch
	create: {
		body: Joi.object({
			id: Joi.string().optional().messages({
                'string.empty': 'Id cannot be empty',
            }),
			name: Joi.string().required().messages({
				'any.required': 'Name is required',
				'string.empty': 'Name cannot be empty',
			}),
			address: Joi.string().required().messages({
				'any.required': 'Address is required',
				'string.empty': 'Address cannot be empty',
			}),
			phone: Joi.string().required().messages({
				'any.required': 'Phone is required',
				'string.empty': 'Phone cannot be empty',
				'string.pattern.base': 'Phone must be a valid phone number',
			}),
		}),
	},

	// PUT /api/v1/branches/:id - Update Branch
	update: {
		params: Joi.object({
			id: Joi.string().required().messages({
				'any.required': 'Branch ID is required',
				'string.empty': 'Branch ID cannot be empty',
			}),
		}),
		body: Joi.object({
			id: Joi.string().optional().messages({
                'string.empty': 'Id cannot be empty',
            }),
			name: Joi.string().optional().messages({
				'string.empty': 'Name cannot be empty',
			}),
			address: Joi.string().optional().messages({
				'string.empty': 'Address cannot be empty',
			}),
			phone: Joi.string().optional().messages({
				'string.empty': 'Phone cannot be empty',
				'string.pattern.base': 'Phone must be a valid phone number',
			}),
		}),
	},
};

/**
 * @openapi
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - name
 *         - position
 *         - email
 *         - branchId
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for an Employee
 *           example: "E12345"
 *         name:
 *           type: string
 *           description: Employee full name
 *           example: "Jane Doe"
 *         position:
 *           type: string
 *           description: Employee position or job title
 *           example: "Software Engineer"
 *         department:
 *           type: string
 *           description: Department name
 *           example: "Engineering"
 *         phone:
 *           type: string
 *           description: Contact phone number
 *           example: "+1-555-555-5555"
 *         email:
 *           type: string
 *           format: email
 *           description: Employee email address
 *           example: "jane.doe@example.com"
 *         branchId:
 *           type: string
 *           description: Associated branch identifier
 *           example: "branch_123"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *           example: "2025-01-01T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *           example: "2025-01-02T12:00:00Z"
 */

import Joi, { ObjectSchema }  from 'joi';

/**
 * @openapi
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       required:
 *         - name
 *         - address
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for a Branch
 *           example: "branch_123"
 *         name:
 *           type: string
 *           description: The name of the Branch
 *           example: "Main Branch"
 *         address:
 *           type: string
 *           description: The branch address
 *           example: "123 Main St, City"
 *         phone:
 *           type: string
 *           description: Contact phone number for the branch
 *           example: "+1-555-555-5555"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *           example: "2025-01-01T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *           example: "2025-01-02T12:00:00Z"
 */

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
			phone: Joi.string().optional().messages({
				'string.empty': 'Phone cannot be empty',
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

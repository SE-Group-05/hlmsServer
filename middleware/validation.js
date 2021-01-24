var validationRules = {
    id: {
        in: ['params', 'query'],
        errorMessage: 'ID is wrong',
        isInt: true,
        toInt: true,
    },
    name: {
        errorMessage: 'Name should be at least 2 chars long and maximum of 50 chars',
        isLength: {
            options: { min: 2, max: 50 }
        },
        trim: true
    },
    description: {
        errorMessage: 'Description should be at least 2 chars long and maximum of 200 chars',
        isLength: {
            options: { min: 2, max: 200 }
        },
        trim: true
    },
    distance: {
        errorMessage: 'Distance should be at least 1 chars long and maximum of 200 chars',
        isLength: {
            options: { min: 1, max: 200 }
        },
        trim: true
    },
    timeToReach: {
        errorMessage: 'Time To Reach should be at least 2 chars long and maximum of 200 chars',
        isLength: {
            options: { min: 2, max: 200 }
        },
        trim: true
    },
    firstname: {
        errorMessage: 'First Name should be at least 3 chars long and maximum of 50 chars',
        isLength: {
            options: { min: 3, max: 50 }
        },
        trim: true
    },
    lastname: {
        errorMessage: 'Last Name should be at least 3 chars long and maximum of 50 chars',
        isLength: {
            options: { min: 3, max: 50 }
        },
        trim: true
    },
    email: {
        errorMessage: 'Please enter a valid email address',
        isEmail: true,
        trim: true,
    },
    mobile: {
        errorMessage: 'Please enter Phone Number in 10 digits',
        isLength: {
            options: { min: 10, max: 10 }
        },
        matches: {
            options: [/^\d{10}$/],
            errorMessage: "Please enter digits"
        },
        trim: true
    },
    password: {
        isLength: {
            errorMessage: 'Password should be at least 6 chars long',
            options: { min: 6 }
        }
    },
    confirm_password: {
        errorMessage: 'Must have the same value as the password field',
        custom: {
            options: (value, { req }) => value === req.body.password
        }
    },
    suite: {
        errorMessage: 'Please select suite type',
        isIn: {
            options: [['gold', 'luxury', 'platinum']],
        }
    },
    roomnumber: {
        errorMessage: 'Room Number should be at least 3 chars long and maximum of 50 chars',
        isLength: {
            options: { min: 3, max: 50 }
        },
        trim: true
    },
    state: {
        errorMessage: 'Please select correct state',
        isIn: {
            options: [["new", "not-completed", "canceled", "completed"]],
        }
    },
    method: {
        errorMessage: 'Please select correct travelling method',
        isIn: {
            options: [['Bus', 'Car', 'Train', 'Threewheeler', 'Foot']],
        }
    },
}

exports.validationRules = validationRules;